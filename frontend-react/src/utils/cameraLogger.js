import axios from "axios";
import {
  getDeviceInfo as getEnhancedDeviceInfo,
  logDebug,
  logMediaAccess,
} from "./deviceLogger";

// Generate a consistent session ID for tracking the same user across page loads
const generateSessionId = () => {
  let sessionId = localStorage.getItem("bh_debug_session_id");
  if (!sessionId) {
    sessionId = "session_" + Math.random().toString(36).substring(2, 15);
    localStorage.setItem("bh_debug_session_id", sessionId);
  }
  return sessionId;
};

const sessionId = generateSessionId();

/**
 * Get detailed device information for logging
 * @returns {Object} Device information
 */
const getDeviceInfo = () => {
  // Use the enhanced device info from deviceLogger.js
  const enhancedInfo = getEnhancedDeviceInfo();

  // Add some additional camera-specific information
  const additionalInfo = {
    connection: null,
    mediaDevices: {
      available: !!navigator.mediaDevices,
      getUserMediaAvailable: !!(
        navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ),
      enumerateDevicesAvailable: !!(
        navigator.mediaDevices && navigator.mediaDevices.enumerateDevices
      ),
    },
  };

  // Add connection info if available
  if (navigator.connection) {
    additionalInfo.connection = {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
      saveData: navigator.connection.saveData,
    };
  }

  return { ...enhancedInfo, ...additionalInfo };
};

/**
 * Log a message to the server
 * @param {string} message - The message to log
 * @param {Object} data - Additional data to log
 */
export const serverLog = async (message, data = {}) => {
  console.log(`[BH_IOS_DEBUG] ${message}`, data);

  try {
    // Use the enhanced logging system
    await logDebug(message, data, "info", "camera");

    // Also use the legacy logging for backward compatibility
    const logData = {
      message: `[BH_IOS_DEBUG] ${message}`,
      session_id: sessionId,
      device_info: JSON.stringify(getDeviceInfo()),
      data: JSON.stringify(data),
      timestamp: new Date().toISOString(),
    };

    await axios.post("/api/interviews/log/debug/", logData);
  } catch (error) {
    console.warn("Failed to log to server:", error);

    // Fallback for Safari: use GET request with image
    try {
      const params = new URLSearchParams({
        message: `[BH_IOS_DEBUG] ${message}`,
        session_id: sessionId,
        is_ios:
          /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
      });

      const img = new Image();
      img.src = `/api/interviews/log/debug/?${params.toString()}`;
    } catch (fallbackError) {
      console.error("Fallback logging failed:", fallbackError);
    }
  }
};

/**
 * Log camera permission status and errors
 * @param {string} action - The action being performed (e.g., 'request', 'granted', 'denied')
 * @param {Object} details - Additional details about the permission
 * @param {Error} error - Error object if an error occurred
 */
export const logCameraPermission = async (
  action,
  details = {},
  error = null
) => {
  // Create a log message
  const message = `Camera permission ${action}`;

  // Log to console
  if (error) {
    console.error(`[BH_IOS_DEBUG] ${message}`, details, error);
  } else {
    console.log(`[BH_IOS_DEBUG] ${message}`, details);
  }

  // Prepare log data
  const logData = {
    action,
    ...details,
    camera_permission:
      action === "granted"
        ? "granted"
        : action === "denied"
        ? "denied"
        : action === "prompt"
        ? "prompt"
        : "unknown",
    error_code: error?.name || null,
    error_message: error?.message || null,
    timestamp: new Date().toISOString(),
  };

  try {
    // Use the enhanced logging system
    await logMediaAccess(logData);

    // Also log using serverLog for backward compatibility
    await serverLog(message, {
      ...details,
      error: error ? { name: error.name, message: error.message } : null,
    });
  } catch (logError) {
    console.warn("Failed to log camera permission:", logError);
  }
};

/**
 * Check camera and microphone permissions
 * @returns {Promise<Object>} Permission status object
 */
export const checkMediaPermissions = async () => {
  const result = {
    camera: "unknown",
    microphone: "unknown",
    error: null,
    browser: navigator.userAgent,
    isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
  };

  try {
    // Safari-specific handling
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      serverLog("Safari detected, using Safari-specific permission checks");
    }

    // Check if permissions API is available
    if (navigator.permissions && navigator.permissions.query) {
      serverLog("Checking permissions using Permissions API");

      // Check camera permission
      try {
        const cameraPermission = await navigator.permissions.query({
          name: "camera",
        });
        result.camera = cameraPermission.state;
        serverLog(
          `Camera permission state from API: ${cameraPermission.state}`
        );

        // Listen for permission changes
        cameraPermission.onchange = () => {
          serverLog(`Camera permission changed to: ${cameraPermission.state}`);
          logCameraPermission("changed", { state: cameraPermission.state });
        };
      } catch (cameraError) {
        serverLog(
          "Error checking camera permission with Permissions API",
          cameraError
        );
      }

      // Check microphone permission
      try {
        const micPermission = await navigator.permissions.query({
          name: "microphone",
        });
        result.microphone = micPermission.state;
        serverLog(
          `Microphone permission state from API: ${micPermission.state}`
        );
      } catch (micError) {
        serverLog(
          "Error checking microphone permission with Permissions API",
          micError
        );
      }
    } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      serverLog("Permissions API not available, trying getUserMedia test");

      // Safari-specific approach - try audio and video separately first
      if (isSafari) {
        try {
          // Try audio first
          try {
            const audioStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: false,
            });
            result.microphone = "granted";
            serverLog("Safari: Audio permission granted");
            // Always stop the stream after testing
            audioStream.getTracks().forEach((track) => track.stop());
          } catch (audioError) {
            result.microphone = "denied";
            result.error = audioError.message;
            serverLog("Safari: Audio permission denied", audioError);
          }

          // Then try video
          try {
            const videoStream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: true,
            });
            result.camera = "granted";
            serverLog("Safari: Video permission granted");
            // Always stop the stream after testing
            videoStream.getTracks().forEach((track) => track.stop());
          } catch (videoError) {
            result.camera = "denied";
            result.error = videoError.message;
            serverLog("Safari: Video permission denied", videoError);
          }

          return result;
        } catch (safariError) {
          serverLog("Safari-specific permission check failed", safariError);
          // Continue with standard approach
        }
      }

      // Fallback to getUserMedia test
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        result.camera = "granted";
        result.microphone = "granted";
        serverLog("getUserMedia test successful, permissions granted");

        // Always stop the stream after testing
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        // Determine which permission was denied
        if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          result.camera = "denied";
          result.microphone = "denied";
          result.error = error.message;
          serverLog("Permission denied in getUserMedia test", error);
        } else if (
          error.name === "NotFoundError" ||
          error.name === "DevicesNotFoundError"
        ) {
          result.camera = "unavailable";
          result.microphone = "unavailable";
          result.error = "Devices not found";
          serverLog("Devices not found in getUserMedia test", error);
        } else {
          result.error = error.message;
          serverLog("Unknown error in getUserMedia test", error);
        }
      }
    } else {
      // Handle case where mediaDevices is not available
      serverLog(
        "navigator.mediaDevices is not available in this browser or context",
        {
          userAgent: navigator.userAgent,
          hostname: window.location.hostname,
          protocol: window.location.protocol,
        }
      );

      result.camera = "unavailable";
      result.microphone = "unavailable";
      result.error = "MediaDevices API not available";

      // Check if we're on a non-secure context
      if (
        window.location.protocol !== "https:" &&
        !window.location.hostname.includes("localhost")
      ) {
        result.error = "MediaDevices requires HTTPS or localhost";
        serverLog("Non-secure context detected, MediaDevices requires HTTPS", {
          protocol: window.location.protocol,
          hostname: window.location.hostname,
        });
      }
    }
  } catch (error) {
    result.error = error.message;
    serverLog("Error checking media permissions", error);
  }

  return result;
};

/**
 * Enhanced getUserMedia with logging
 * @param {Object} constraints - Media constraints
 * @returns {Promise<MediaStream>} Media stream
 */
export const getMediaWithLogging = async (constraints) => {
  try {
    // Log the constraints being used
    await serverLog("Requesting media with constraints", constraints);

    // Check if mediaDevices is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const error = new Error("MediaDevices API not available");
      await logCameraPermission("error", { constraints }, error);
      throw error;
    }

    // Request the media stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    // Log success
    await logCameraPermission("granted", {
      constraints,
      tracks: stream.getTracks().map((track) => ({
        kind: track.kind,
        label: track.label,
        enabled: track.enabled,
        readyState: track.readyState,
      })),
    });

    // Log media access success with enhanced logging
    await logMediaAccess({
      camera_permission: "granted",
      microphone_permission: "granted",
      stream_active: stream.active,
      video_track_found: stream.getVideoTracks().length > 0,
      audio_track_found: stream.getAudioTracks().length > 0,
      video_track_enabled:
        stream.getVideoTracks().length > 0
          ? stream.getVideoTracks()[0].enabled
          : false,
      audio_track_enabled:
        stream.getAudioTracks().length > 0
          ? stream.getAudioTracks()[0].enabled
          : false,
      video_track_ready_state:
        stream.getVideoTracks().length > 0
          ? stream.getVideoTracks()[0].readyState
          : null,
      audio_track_ready_state:
        stream.getAudioTracks().length > 0
          ? stream.getAudioTracks()[0].readyState
          : null,
    });

    return stream;
  } catch (error) {
    // Log the error
    if (
      error.name === "NotAllowedError" ||
      error.name === "PermissionDeniedError"
    ) {
      await logCameraPermission("denied", { constraints }, error);
    } else {
      await logCameraPermission("error", { constraints }, error);
    }

    // Log media access failure with enhanced logging
    await logMediaAccess({
      camera_permission: "denied",
      microphone_permission: "denied",
      stream_active: false,
      video_track_found: false,
      audio_track_found: false,
      error_code: error.name,
      error_message: error.message,
      error_name: error.name,
    });

    throw error;
  }
};

// Export a function to initialize permission monitoring
export const initPermissionMonitoring = async () => {
  const permissions = await checkMediaPermissions();
  serverLog("Initial permission status", permissions);

  // Set up periodic permission checks (every 30 seconds)
  setInterval(async () => {
    const currentPermissions = await checkMediaPermissions();
    serverLog("Periodic permission check", currentPermissions);
  }, 30000);

  return permissions;
};

// Export serverLog for direct use in other components
export { getDeviceInfo };
