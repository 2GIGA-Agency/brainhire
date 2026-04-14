/**
 * Enhanced device logging utility for collecting comprehensive statistics
 * across different devices and browsers
 */

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Create or retrieve a persistent session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('bh_session_id');
  if (!sessionId) {
    sessionId = `session_${uuidv4()}`;
    localStorage.setItem('bh_session_id', sessionId);
  }
  return sessionId;
};

// Reset the session ID and generate a new one
// This helps avoid issues with duplicate DeviceLog entries in the backend
export const resetSessionId = () => {
  const newSessionId = `session_${uuidv4()}`;
  localStorage.setItem('bh_session_id', newSessionId);
  console.log('[BH_DEVICE_LOG] Session ID reset to:', newSessionId);

  // Make the function available globally for the debug button
  if (typeof window !== 'undefined') {
    window.resetSessionId = resetSessionId;
  }

  return newSessionId;
};

// Always use a unique session ID for device logging to prevent duplicate entries
// This is different from the user's persistent session ID
const getUniqueDeviceSessionId = () => {
  return `device_${uuidv4()}`;
};

/**
 * Get detailed device and browser information
 * @returns {Object} Device and browser information
 */
export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const vendor = navigator.vendor || '';

  // Browser detection
  const isChromeIOS = /CriOS/.test(userAgent);
  const isFirefoxIOS = /FxiOS/.test(userAgent);
  const isChrome = (/Chrome/.test(userAgent) && /Google Inc/.test(vendor)) || isChromeIOS;
  const isFirefox = /Firefox/.test(userAgent) || isFirefoxIOS;
  const isSafari = /Safari/.test(userAgent) && !isChrome && !isFirefox;
  const isEdge = /Edg/.test(userAgent);
  const isIE = /Trident/.test(userAgent);
  const isOpera = /OPR/.test(userAgent);

  // OS detection
  const isWindows = /Win/.test(platform);
  const isMac = /Mac/.test(platform);
  const isIOS = (/iPhone/.test(userAgent) || /iPad/.test(userAgent) || /iPod/.test(userAgent));
  const isAndroid = /Android/.test(userAgent);
  const isLinux = /Linux/.test(platform) && !isAndroid;

  // Device type detection
  const isMobile = /Mobi/.test(userAgent) || isIOS;
  const isTablet = /Tablet/.test(userAgent) || /iPad/.test(userAgent) || (isAndroid && !/Mobi/.test(userAgent));
  const isDesktop = !isMobile && !isTablet;

  // Extract versions
  let browserVersion = '';
  let osVersion = '';

  if (isChromeIOS) {
    browserVersion = userAgent.match(/CriOS\/(\d+\.\d+)/)?.[1] || '';
  } else if (isFirefoxIOS) {
    browserVersion = userAgent.match(/FxiOS\/(\d+\.\d+)/)?.[1] || '';
  } else if (isChrome) {
    browserVersion = userAgent.match(/Chrome\/(\d+\.\d+)/)?.[1] || '';
  } else if (isFirefox) {
    browserVersion = userAgent.match(/Firefox\/(\d+\.\d+)/)?.[1] || '';
  } else if (isSafari) {
    browserVersion = userAgent.match(/Version\/(\d+\.\d+)/)?.[1] || '';
  } else if (isEdge) {
    browserVersion = userAgent.match(/Edg\/(\d+\.\d+)/)?.[1] || '';
  } else if (isIE) {
    browserVersion = userAgent.match(/rv:(\d+\.\d+)/)?.[1] || '';
  } else if (isOpera) {
    browserVersion = userAgent.match(/OPR\/(\d+\.\d+)/)?.[1] || '';
  }

  if (isWindows) {
    osVersion = userAgent.match(/Windows NT (\d+\.\d+)/)?.[1] || '';
  } else if (isMac) {
    osVersion = userAgent.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
  } else if (isIOS) {
    osVersion = userAgent.match(/OS (\d+[._]\d+)/)?.[1]?.replace('_', '.') || '';
  } else if (isAndroid) {
    osVersion = userAgent.match(/Android (\d+\.\d+)/)?.[1] || '';
  }

  // Get browser name
  let browserName = '';
  if (isChrome) browserName = 'Chrome';
  else if (isFirefox) browserName = 'Firefox';
  else if (isSafari) browserName = 'Safari';
  else if (isEdge) browserName = 'Edge';
  else if (isIE) browserName = 'Internet Explorer';
  else if (isOpera) browserName = 'Opera';
  else browserName = 'Unknown';

  // Get OS name
  let osName = '';
  if (isWindows) osName = 'Windows';
  else if (isMac) osName = 'macOS';
  else if (isIOS) osName = 'iOS';
  else if (isAndroid) osName = 'Android';
  else if (isLinux) osName = 'Linux';
  else osName = 'Unknown';

  // Get device type
  let deviceType = '';
  if (isMobile) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';
  else if (isDesktop) deviceType = 'desktop';
  else deviceType = 'unknown';

  return {
    session_id: getSessionId(),
    user_agent: userAgent,
    browser: browserName,
    browser_version: browserVersion,
    is_mobile: isMobile,
    is_tablet: isTablet,
    is_desktop: isDesktop,
    os: osName,
    os_version: osVersion,
    device_type: deviceType,
    device_model: '', // Not reliably detectable from JS
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    pixel_ratio: window.devicePixelRatio || 1,
    is_secure_context: window.isSecureContext,
    page_url: window.location.href,
    referrer: document.referrer,
  };
};

/**
 * Log device information to the server
 * @returns {Promise} Promise that resolves when logging is complete
 */
export const logDeviceInfo = async () => {
  try {
    const deviceInfo = getDeviceInfo();
    console.log('[BH_DEVICE_LOG] Logging device info:', deviceInfo);

    // Create a simplified version of the device info with all required fields
    // and convert booleans to integers (0/1) for backend compatibility
    const simplifiedDeviceInfo = {
      // Use a unique session ID for each request to prevent duplicate entries in the backend
      session_id: getUniqueDeviceSessionId(),
      user_agent: deviceInfo.user_agent || navigator.userAgent || '',
      browser: deviceInfo.browser || 'Unknown',
      browser_version: deviceInfo.browser_version || '0.0',
      os: deviceInfo.os || 'Unknown',
      os_version: deviceInfo.os_version || '0.0',
      device_type: deviceInfo.device_type || 'unknown',
      is_mobile: deviceInfo.is_mobile ? 1 : 0,
      is_tablet: deviceInfo.is_tablet ? 1 : 0,
      is_desktop: deviceInfo.is_desktop ? 1 : 0,
      screen_width: deviceInfo.screen_width || window.innerWidth || 1024,
      screen_height: deviceInfo.screen_height || window.innerHeight || 768,
      pixel_ratio: parseFloat(deviceInfo.pixel_ratio || window.devicePixelRatio || 1.0).toFixed(2),
      device_model: deviceInfo.device_model || '',
      ip_address: '', // Backend will handle this
      country: '',    // Backend will handle this
      region: '',     // Backend will handle this
      // Remove timestamp as backend uses created_at automatically
    };

    // Log the explicit device info being sent to help debug
    console.log('[DEVICE_LOG_DEBUG] Explicit device log sent:', simplifiedDeviceInfo);

    try {
      // Try POST request first
      const response = await axios.post('/api/interviews/log/device/', simplifiedDeviceInfo);
      return response.data;
    } catch (axiosError) {
      console.error('[BH_DEVICE_LOG] Failed to log device info:', axiosError);

      // Check if the error is due to duplicate DeviceLog entries
      const errorMessage = axiosError?.response?.data?.error || '';
      if (errorMessage.includes('more than one DeviceLog')) {
        console.warn('[BH_DEVICE_LOG] Detected duplicate DeviceLog issue. Resetting session ID...');
        // Reset the session ID and try again with the new session ID
        const newSessionId = resetSessionId();
        simplifiedDeviceInfo.session_id = newSessionId;

        try {
          const retryResponse = await axios.post('/api/interviews/log/device/', simplifiedDeviceInfo);
          console.log('[BH_DEVICE_LOG] Successfully logged device info after session reset');
          return retryResponse.data;
        } catch (retryError) {
          console.error('[BH_DEVICE_LOG] Still failed after session reset:', retryError);
        }
      }

      console.log('[BH_DEVICE_LOG] Fallback logging attempted with simplified data');

      // Fallback to GET request with query parameters for browsers with stricter privacy settings
      try {
        const params = new URLSearchParams();
        params.append('session_id', getUniqueDeviceSessionId());

        // Add essential fields that the backend requires
        Object.entries(simplifiedDeviceInfo).forEach(([key, value]) => {
          if (value !== null && value !== undefined && key !== 'session_id') {
            params.append(key, value);
          }
        });

        // Try axios GET request first
        try {
          const fallbackResponse = await axios.get(`/api/interviews/log/device/?${params.toString()}`);
          console.log('[BH_DEVICE_LOG] Fallback GET request successful');
          return fallbackResponse.data;
        } catch (axiosFallbackError) {
          console.error('[BH_DEVICE_LOG] Fallback GET request failed:', axiosFallbackError);

          // Final fallback: use an image request which bypasses CORS and other restrictions
          const img = new Image();
          img.src = `/api/interviews/log/device/?${params.toString()}`;
          console.log('[BH_DEVICE_LOG] Image fallback request sent');
          console.log('[DEVICE_LOG_DEBUG] Explicit device log sent:', null);
        }
      } catch (fallbackError) {
        console.error('[BH_DEVICE_LOG] All fallback attempts failed:', fallbackError);
      }
    }
  } catch (error) {
    console.error('[BH_DEVICE_LOG] Error in logDeviceInfo:', error);
    return null;
  }
};

/**
 * Log media access information to the server
 * @param {Object} mediaInfo Media access information
 * @returns {Promise} Promise that resolves when logging is complete
 */
export const logMediaAccess = async (mediaInfo) => {
  try {
    const deviceInfo = getDeviceInfo();
    const enhancedMediaInfo = {
      // Add unique session ID to prevent duplicate entries
      session_id: getUniqueDeviceSessionId(),
      // Don't send device as an object - backend expects a primary key
      device_info: JSON.stringify(deviceInfo), // Stringify device info instead of sending as object
      ...mediaInfo,
      page_url: window.location.href
    };

    console.log('[BH_MEDIA_LOG] Logging media access:', enhancedMediaInfo);

    // Send to the enhanced endpoint
    const response = await axios.post('/api/interviews/log/media-access/v2/', enhancedMediaInfo);
    console.log('[BH_MEDIA_LOG] Media access logged successfully:', response.data);
    return response.data;
  } catch (error) {
    console.warn('[BH_MEDIA_LOG] Failed to log media access:', error);

    // Check if the error is due to duplicate entries
    const errorMessage = error?.response?.data?.error || '';
    if (errorMessage.includes('more than one') || errorMessage.includes('duplicate')) {
      console.warn('[BH_MEDIA_LOG] Detected duplicate issue. Resetting session ID...');
      // Reset the session ID for future user tracking, but use a unique ID for this request
      resetSessionId();

      try {
        // Use a completely unique session ID for this retry
        const deviceInfo = getDeviceInfo();
        const enhancedMediaInfo = {
          session_id: getUniqueDeviceSessionId(),
          device_info: JSON.stringify(deviceInfo), // Stringify device info
          ...mediaInfo,
          page_url: window.location.href
        };

        const retryResponse = await axios.post('/api/interviews/log/media-access/v2/', enhancedMediaInfo);
        console.log('[BH_MEDIA_LOG] Successfully logged media access after session reset');
        return retryResponse.data;
      } catch (retryError) {
        console.error('[BH_MEDIA_LOG] Still failed after session reset:', retryError);
      }
    }

    // Try fallback with GET request (for Safari)
    try {
      const params = new URLSearchParams();
      params.append('session_id', getUniqueDeviceSessionId());

      // Add essential fields
      if (mediaInfo.camera_permission) params.append('camera_permission', mediaInfo.camera_permission);
      if (mediaInfo.microphone_permission) params.append('microphone_permission', mediaInfo.microphone_permission);
      if (mediaInfo.stream_active !== undefined) params.append('stream_active', mediaInfo.stream_active ? 1 : 0);

      const fallbackUrl = `/api/interviews/log/media-access/v2/?${params.toString()}`;

      // Use image request as fallback
      const img = new Image();
      img.src = fallbackUrl;
      console.log('[BH_MEDIA_LOG] Fallback logging attempted');
    } catch (fallbackError) {
      console.error('[BH_MEDIA_LOG] Fallback logging failed:', fallbackError);
    }

    // Also try the legacy endpoint for backward compatibility
    try {
      await axios.post('/api/interviews/log/media-access/', {
        ...mediaInfo,
        session_id: getUniqueDeviceSessionId()
      });
    } catch (legacyError) {
      console.warn('[BH_MEDIA_LOG] Legacy logging failed:', legacyError);
    }

    return null;
  }
};

/**
 * Log debug information to the server
 * @param {string} message Debug message
 * @param {Object} data Additional data
 * @param {string} level Log level (debug, info, warning, error)
 * @param {string} component Component name
 * @returns {Promise} Promise that resolves when logging is complete
 */
export const logDebug = async (message, data = {}, level = 'info', component = null) => {
  try {
    const deviceInfo = getDeviceInfo();
    const logData = {
      // Add unique session ID to prevent duplicate entries
      session_id: getUniqueDeviceSessionId(),
      // Don't send device as an object - backend expects a primary key
      device_info: JSON.stringify(deviceInfo), // Stringify device info instead of sending as object
      level,
      message,
      component: component || 'general',
      data: typeof data === 'object' ? data : { value: data },
      page_url: window.location.href,
      timestamp: new Date().toISOString()
    };

    console.log(`[BH_DEBUG_LOG] [${level.toUpperCase()}] ${message}`, data);

    // Send to the enhanced endpoint
    const response = await axios.post('/api/interviews/log/debug/v2/', logData);
    return response.data;
  } catch (error) {
    console.warn('[BH_DEBUG_LOG] Failed to log debug info:', error);

    // Check if the error is due to duplicate entries or bad request
    const errorMessage = error?.response?.data?.error || '';
    const statusCode = error?.response?.status;

    if (errorMessage.includes('more than one') || errorMessage.includes('duplicate')) {
      console.warn('[BH_DEBUG_LOG] Detected duplicate issue. Resetting session ID...');
      // Reset the session ID for future user tracking
      resetSessionId();

      try {
        // Use a completely unique session ID for this retry
        const logData = {
          session_id: getUniqueDeviceSessionId(),
          device_info: JSON.stringify(getDeviceInfo()), // Stringify device info
          level,
          message,
          component: component || 'general',
          data: typeof data === 'object' ? data : { value: data },
          page_url: window.location.href,
          timestamp: new Date().toISOString()
        };

        const retryResponse = await axios.post('/api/interviews/log/debug/v2/', logData);
        console.log('[BH_DEBUG_LOG] Successfully logged debug info after session reset');
        return retryResponse.data;
      } catch (retryError) {
        console.error('[BH_DEBUG_LOG] Still failed after session reset:', retryError);
      }
    } else if (statusCode === 400) {
      // If it's a 400 Bad Request, try with a simplified payload
      try {
        const simplifiedData = {
          session_id: getUniqueDeviceSessionId(),
          message: String(message).substring(0, 255), // Ensure message is a string and not too long
          level,
          component: component || 'general',
          // Convert data to a simple string to avoid complex object issues
          data: JSON.stringify(data).substring(0, 1000)
        };

        const retryResponse = await axios.post('/api/interviews/log/debug/v2/', simplifiedData);
        console.log('[BH_DEBUG_LOG] Successfully logged debug info with simplified payload');
        return retryResponse.data;
      } catch (simplifiedError) {
        console.error('[BH_DEBUG_LOG] Still failed with simplified payload:', simplifiedError);
      }
    }

    // Try fallback with GET request (for Safari)
    try {
      const params = new URLSearchParams();
      params.append('session_id', getUniqueDeviceSessionId());
      params.append('message', String(message).substring(0, 255));
      params.append('level', level);
      params.append('component', component || 'general');
      // Keep data simple for URL parameters
      params.append('data', JSON.stringify(typeof data === 'object' ? data : { value: data }).substring(0, 500));

      const fallbackUrl = `/api/interviews/log/debug/v2/?${params.toString()}`;

      // Use image request as fallback
      const img = new Image();
      img.src = fallbackUrl;
      console.log('[BH_DEBUG_LOG] Fallback logging attempted');
    } catch (fallbackError) {
      console.error('[BH_DEBUG_LOG] Fallback logging failed:', fallbackError);
    }

    // Also try the legacy endpoint for backward compatibility
    try {
      await axios.post('/api/interviews/log/debug/', {
        message: String(message).substring(0, 255),
        data: typeof data === 'object' ? data : { value: data },
        session_id: getUniqueDeviceSessionId()
      });
    } catch (legacyError) {
      console.warn('[BH_DEBUG_LOG] Legacy logging failed:', legacyError);
    }

    return null;
  }
};

/**
 * Initialize device logging
 * @returns {Promise} Promise that resolves when logging is complete
 */
export const initDeviceLogging = async () => {
  try {
    console.log('[DEVICE_LOG_DEBUG] About to initialize device logging');

    // First, check if we need to reset the session ID to avoid duplicate entries
    // This helps when there are already multiple DeviceLogs for the same session_id
    if (Math.random() < 0.1) { // 10% chance to reset on each page load
      resetSessionId();
    }

    // Log device info on page load
    await logDeviceInfo();
    console.log('[BH_DEVICE_LOG] Device logging initialized');

    // Log device info on visibility change (tab focus/blur)
    document.addEventListener('visibilitychange', () => {
      console.log(`${document.visibilityState === 'visible' ? 'Окно снова активно.' : 'Окно потеряло фокус.'}`);
      if (document.visibilityState === 'visible') {
        logDeviceInfo();
      }
    });

    // Log unhandled errors
    window.addEventListener('error', (event) => {
      logDebug(
        `Unhandled error: ${event.message}`,
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack
        },
        'error',
        'window'
      );
    });

    // Log unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      logDebug(
        `Unhandled promise rejection: ${event.reason}`,
        {
          reason: event.reason?.toString(),
          stack: event.reason?.stack
        },
        'error',
        'promise'
      );
    });

    // Schedule periodic updates
    setInterval(async () => {
      try {
        await logDeviceInfo();
      } catch (error) {
        console.error('[BH_DEVICE_LOG] Error in periodic device logging:', error);
      }
    }, 30 * 60 * 1000); // Every 30 minutes

    return true;
  } catch (error) {
    console.error('[BH_DEVICE_LOG] Failed to initialize device logging:', error);
    return false;
  }
};

export default {
  getDeviceInfo,
  logDeviceInfo,
  logMediaAccess,
  logDebug,
  initDeviceLogging,
  resetSessionId
};
