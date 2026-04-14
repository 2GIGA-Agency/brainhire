/**
 * Safari Camera Debug Utility
 *
 * This utility provides specialized functions for debugging camera access issues
 * in Safari browsers, particularly on macOS and iOS devices.
 */

import { serverLog } from './cameraLogger';
import { logMediaAccess } from './deviceLogger';

/**
 * Detects if the current browser is Safari
 * @returns {boolean} True if Safari browser is detected
 */
export const isSafari = () => {
  const userAgent = navigator.userAgent;
  const isChromeIOS = /CriOS/.test(userAgent);
  const isFirefoxIOS = /FxiOS/.test(userAgent);

  // Only return true for actual Safari, not Chrome or Firefox on iOS
  return /safari/i.test(userAgent) && !isChromeIOS && !isFirefoxIOS;
};

/**
 * Detects if the current device is iOS
 * @returns {boolean} True if iOS device is detected
 */
export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Detects if the current device is macOS
 * @returns {boolean} True if macOS device is detected
 */
export const isMacOS = () => {
  return /Mac/.test(navigator.userAgent) && !isIOS();
};

/**
 * Tests camera access specifically for Safari
 * @returns {Promise<Object>} Result of the camera test
 */
export const testSafariCamera = async () => {
  const result = {
    success: false,
    audio: false,
    video: false,
    error: null,
    deviceInfo: {
      isSafari: isSafari(),
      isIOS: isIOS(),
      isMacOS: isMacOS(),
      userAgent: navigator.userAgent,
      secure: window.location.protocol === 'https:',
      hostname: window.location.hostname
    }
  };

  serverLog('Starting Safari camera test', result.deviceInfo);

  // Check if we're in a secure context
  if (window.location.protocol !== 'https:' &&
      !['localhost', '127.0.0.1', 'bh2.local'].includes(window.location.hostname)) {
    result.error = 'Not in secure context. Camera requires HTTPS.';
    serverLog('Safari camera test failed: Not in secure context', result);
    return result;
  }

  // Test audio only
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    result.audio = true;
    serverLog('Safari audio test successful');

    // Always stop the stream
    audioStream.getTracks().forEach(track => track.stop());
  } catch (audioError) {
    result.error = `Audio error: ${audioError.name} - ${audioError.message}`;
    serverLog('Safari audio test failed', { error: audioError });
  }

  // Test video only
  try {
    const videoStream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    result.video = true;
    serverLog('Safari video test successful');

    // Always stop the stream
    videoStream.getTracks().forEach(track => track.stop());
  } catch (videoError) {
    result.error = `Video error: ${videoError.name} - ${videoError.message}`;
    serverLog('Safari video test failed', { error: videoError });
  }

  // Test both together
  try {
    const combinedStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    });

    result.success = true;
    serverLog('Safari combined audio/video test successful');

    // Always stop the stream
    combinedStream.getTracks().forEach(track => track.stop());
  } catch (combinedError) {
    if (!result.error) {
      result.error = `Combined error: ${combinedError.name} - ${combinedError.message}`;
    }
    serverLog('Safari combined audio/video test failed', { error: combinedError });
  }

  return result;
};

/**
 * Checks if the browser supports the Permissions API
 * @returns {Promise<Object>} Result of the permissions API check
 */
export const checkPermissionsAPI = async () => {
  const result = {
    supported: false,
    camera: 'unknown',
    microphone: 'unknown'
  };

  if (!navigator.permissions || !navigator.permissions.query) {
    serverLog('Permissions API not supported');
    return result;
  }

  result.supported = true;

  try {
    const cameraPermission = await navigator.permissions.query({ name: 'camera' });
    result.camera = cameraPermission.state;
    serverLog(`Camera permission state: ${cameraPermission.state}`);
  } catch (error) {
    serverLog('Error querying camera permission', error);
  }

  try {
    const micPermission = await navigator.permissions.query({ name: 'microphone' });
    result.microphone = micPermission.state;
    serverLog(`Microphone permission state: ${micPermission.state}`);
  } catch (error) {
    serverLog('Error querying microphone permission', error);
  }

  return result;
};

/**
 * Attempts to get the Safari version from user agent
 * @returns {string} Safari version or 'unknown'
 */
export const getSafariVersion = () => {
  if (!isSafari()) return 'not Safari';

  const match = navigator.userAgent.match(/Version\/(\d+\.\d+)/);
  return match ? match[1] : 'unknown';
};

/**
 * Attempts to get the iOS version from user agent
 * @returns {string} iOS version or 'unknown'
 */
export const getIOSVersion = () => {
  if (!isIOS()) return 'not iOS';

  const match = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
  return match ? `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}` : 'unknown';
};

/**
 * Attempts to get the macOS version from user agent
 * @returns {string} macOS version or 'unknown'
 */
export const getMacOSVersion = () => {
  if (!isMacOS()) return 'not macOS';

  const match = navigator.userAgent.match(/Mac OS X (\d+)[._](\d+)[._]?(\d+)?/);
  return match ? `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}` : 'unknown';
};

/**
 * Tests MediaRecorder compatibility in Safari with detailed error reporting
 * @returns {Promise<Object>} Result of the MediaRecorder compatibility test
 */
export const testMediaRecorderCompatibility = async () => {
  const result = {
    supported: false,
    supportedMimeTypes: [],
    recommendedMimeType: null,
    error: null,
    detailedTests: [],
    safariSpecificInfo: {
      safariVersion: getSafariVersion(),
      iosVersion: getIOSVersion(),
      macOSVersion: getMacOSVersion()
    }
  };

  // Check if MediaRecorder is available
  if (!window.MediaRecorder) {
    result.error = 'MediaRecorder API not available';
    serverLog('MediaRecorder API not available', result.safariSpecificInfo);
    return result;
  }

  result.supported = true;

  // Test various MIME types - expanded list with more Safari-compatible options
  const mimeTypesToTest = [
    // MP4 options (better for Safari)
    'video/mp4',
    'video/mp4;codecs=h264',
    'video/mp4;codecs=h264,aac',
    'video/mp4;codecs=avc1',
    'video/mp4;codecs=avc1.42E01E,mp4a.40.2',

    // WebM options (better for Chrome/Firefox)
    'video/webm',
    'video/webm;codecs=vp8,opus',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=h264,opus',

    // Other formats
    'video/x-matroska;codecs=avc1',

    // Browser default (empty string)
    ''
  ];

  for (const mimeType of mimeTypesToTest) {
    const testResult = {
      mimeType: mimeType || '(browser default)',
      isTypeSupported: false,
      createRecorderSuccess: false,
      startRecordingSuccess: false,
      error: null
    };

    try {
      // Test if the type is supported
      if (mimeType === '' || MediaRecorder.isTypeSupported(mimeType)) {
        testResult.isTypeSupported = true;
        if (mimeType !== '') {
          result.supportedMimeTypes.push(mimeType);
        }

        // Try to actually create a MediaRecorder with this MIME type
        try {
          // Create a dummy stream
          const canvas = document.createElement('canvas');
          canvas.width = 640;
          canvas.height = 480;
          const stream = canvas.captureStream();

          // Try to create a MediaRecorder
          const options = mimeType ? { mimeType } : {};
          const recorder = new MediaRecorder(stream, options);

          testResult.createRecorderSuccess = true;
          testResult.actualMimeType = recorder.mimeType;

          // Try to start recording (this is where some Safari versions fail)
          try {
            recorder.start();
            testResult.startRecordingSuccess = true;

            // Wait a short time to ensure recording actually starts
            await new Promise(resolve => setTimeout(resolve, 100));

            // Check recorder state
            testResult.recorderState = recorder.state;

            // Test data availability
            let dataAvailable = false;
            recorder.ondataavailable = () => {
              dataAvailable = true;
            };

            // Request data
            recorder.requestData();

            // Wait for data
            await new Promise(resolve => setTimeout(resolve, 100));
            testResult.dataAvailable = dataAvailable;

          } catch (startError) {
            testResult.error = `Start error: ${startError.name}: ${startError.message}`;
          } finally {
            // Clean up
            try {
              if (recorder.state === 'recording') {
                recorder.stop();
              }
            } catch (stopError) {
              // Ignore stop errors
            }
            stream.getTracks().forEach(track => track.stop());
          }
        } catch (recorderError) {
          testResult.error = `Create error: ${recorderError.name}: ${recorderError.message}`;
        }
      }
    } catch (error) {
      testResult.error = `Type check error: ${error.name}: ${error.message}`;
    }

    result.detailedTests.push(testResult);
  }

  // Determine recommended MIME type for Safari based on detailed tests
  // First priority: types that successfully started recording
  const fullyWorkingMimeTypes = result.detailedTests
    .filter(test => test.startRecordingSuccess)
    .map(test => test.mimeType);

  // Second priority: types that at least created a recorder
  const partiallyWorkingMimeTypes = result.detailedTests
    .filter(test => test.createRecorderSuccess && !test.startRecordingSuccess)
    .map(test => test.mimeType);

  // Prioritize fully working types, then fall back to partially working ones
  const workingMimeTypes = [...fullyWorkingMimeTypes, ...partiallyWorkingMimeTypes];

  // Safari-specific recommendation logic
  if (isSafari()) {
    // For Safari, prioritize MP4 formats
    if (workingMimeTypes.includes('video/mp4;codecs=h264,aac')) {
      result.recommendedMimeType = 'video/mp4;codecs=h264,aac';
    } else if (workingMimeTypes.includes('video/mp4;codecs=avc1.42E01E,mp4a.40.2')) {
      result.recommendedMimeType = 'video/mp4;codecs=avc1.42E01E,mp4a.40.2';
    } else if (workingMimeTypes.includes('video/mp4;codecs=h264')) {
      result.recommendedMimeType = 'video/mp4;codecs=h264';
    } else if (workingMimeTypes.includes('video/mp4;codecs=avc1')) {
      result.recommendedMimeType = 'video/mp4;codecs=avc1';
    } else if (workingMimeTypes.includes('video/mp4')) {
      result.recommendedMimeType = 'video/mp4';
    } else if (workingMimeTypes.includes('(browser default)')) {
      result.recommendedMimeType = ''; // Use browser default
    } else if (workingMimeTypes.length > 0) {
      result.recommendedMimeType = workingMimeTypes[0];
    }
  } else {
    // For non-Safari browsers, prioritize WebM formats
    if (workingMimeTypes.includes('video/webm;codecs=vp8,opus')) {
      result.recommendedMimeType = 'video/webm;codecs=vp8,opus';
    } else if (workingMimeTypes.includes('video/webm;codecs=vp9,opus')) {
      result.recommendedMimeType = 'video/webm;codecs=vp9,opus';
    } else if (workingMimeTypes.includes('video/webm')) {
      result.recommendedMimeType = 'video/webm';
    } else if (workingMimeTypes.includes('(browser default)')) {
      result.recommendedMimeType = ''; // Use browser default
    } else if (workingMimeTypes.length > 0) {
      result.recommendedMimeType = workingMimeTypes[0];
    }
  }

  // Store the test results in localStorage for other components to use
  try {
    localStorage.setItem('bh_mediarecorder_test_results', JSON.stringify({
      recommendedMimeType: result.recommendedMimeType,
      supportedMimeTypes: result.supportedMimeTypes,
      timestamp: new Date().toISOString()
    }));
  } catch (e) {
    // Ignore storage errors
  }

  serverLog('MediaRecorder compatibility test results', result);
  return result;
};

/**
 * Gets the cached MediaRecorder test results if available
 * @returns {Object|null} Cached test results or null if not available
 */
export const getCachedMediaRecorderTestResults = () => {
  try {
    const cached = localStorage.getItem('bh_mediarecorder_test_results');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    // Ignore storage errors
  }
  return null;
};

/**
 * Tests WebSocket connection security
 * @returns {Object} Result of the WebSocket security test
 */
export const testWebSocketSecurity = () => {
  const result = {
    protocol: window.location.protocol,
    wsProtocol: window.location.protocol === 'https:' ? 'wss:' : 'ws:',
    secure: window.location.protocol === 'https:',
    hostname: window.location.hostname,
    wsUrl: null,
    wsTestResult: null
  };

  // Construct WebSocket URL based on current protocol
  result.wsUrl = `${result.wsProtocol}//${window.location.host}/ws/test`;

  // Check if we're on a known domain
  result.isKnownDomain = ['localhost', '127.0.0.1', 'brainhire.ru', 'adventurepro.ru'].includes(window.location.hostname);

  // Log the test result
  serverLog('WebSocket security test', result);

  return result;
};

/**
 * Creates a comprehensive diagnostic report for Safari camera issues
 * @returns {Promise<Object>} Comprehensive diagnostic report
 */
export const createSafariDiagnosticReport = async () => {
  serverLog('Creating Safari diagnostic report');

  const report = {
    timestamp: new Date().toISOString(),
    browser: {
      userAgent: navigator.userAgent,
      isSafari: isSafari(),
      isIOS: isIOS(),
      isMacOS: isMacOS(),
      safariVersion: getSafariVersion(),
      iosVersion: getIOSVersion(),
      macOSVersion: getMacOSVersion()
    },
    environment: {
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      secure: window.location.protocol === 'https:',
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      devicePixelRatio: window.devicePixelRatio,
      language: navigator.language,
      url: window.location.href,
      referrer: document.referrer,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  };

  // Run all tests
  try {
    report.cameraTest = await testSafariCamera();
  } catch (error) {
    report.cameraTest = { error: `${error.name}: ${error.message}` };
  }
  
  try {
    report.permissionsAPI = await checkPermissionsAPI();
  } catch (error) {
    report.permissionsAPI = { error: `${error.name}: ${error.message}` };
  }

  try {
    report.mediaRecorder = await testMediaRecorderCompatibility();
  } catch (error) {
    report.mediaRecorder = { error: `${error.name}: ${error.message}` };
  }

  try {
    report.webSocketSecurity = testWebSocketSecurity();
  } catch (error) {
    report.webSocketSecurity = { error: `${error.name}: ${error.message}` };
  }

  // Add network information if available
  if (navigator.connection) {
    report.network = {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
      saveData: navigator.connection.saveData
    };
  }

  // Send the complete report to the server
  serverLog('Safari diagnostic report complete', report);

  return report;
};

/**
 * Adds a debug button to the page for camera testing on all browsers
 * @param {Function} callback Function to call when the button is clicked
 */
export const addSafariDebugButton = (callback = createSafariDiagnosticReport) => {

  const deviceInfo = {
    isSafari: isSafari(),
    isIOS: isIOS(),
    isMacOS: isMacOS(),
    userAgent: navigator.userAgent
  };

  serverLog('Safari debug button added for diagnostics', deviceInfo);


  const safariClick = async () => {
    // First try to request camera permissions directly
    try {
      const permissionResult = await requestCameraPermissions();

      // Always run the diagnostic report to get detailed information
      const report = await callback();
      console.log('Safari Camera Debug Report:', report);

      // Stop tracks after report is shown
      if (permissionResult.tracks) {
        permissionResult.tracks.forEach(track => track.stop());
      }

      window.dispatchEvent(new CustomEvent('safari-permission-result', {
        detail: permissionResult
      }));
    } catch (error) {
      console.error('Error requesting permissions:', error);
      // Run the diagnostic if there's an error
      await callback();
    }
  };

  safariClick()
};

/**
 * Proactively requests camera and microphone permissions on all browsers
 * This can be called early in the application to ensure permissions are requested
 * before they're needed for recording
 *
 * @returns {Promise<Object>} Result of the permission request
 */
export const requestCameraPermissions = async () => {
  const result = {
    success: false,
    camera: false,
    microphone: false,
    error: null,
    constraints: { video: true, audio: true },
    tracks: []
  };

  serverLog('Requesting media with constraints', result.constraints);

  try {
    // Request both camera and microphone permissions
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    // Check which permissions were granted
    const videoTracks = stream.getVideoTracks();
    const audioTracks = stream.getAudioTracks();

    result.camera = videoTracks.length > 0;
    result.microphone = audioTracks.length > 0;
    result.success = result.camera && result.microphone;
    result.tracks = stream.getTracks();

    // Log the successful permission grant
    serverLog('Camera permission granted', {
      constraints: result.constraints,
      tracks: result.tracks
    });

    // Log to the backend that media access was granted
    logMediaAccess({
      camera_permission: 'granted',
      microphone_permission: 'granted',
      stream_active: true,
      video_tracks: videoTracks.length,
      audio_tracks: audioTracks.length
    }).catch(error => {
      console.warn('Failed to log media access:', error);
    });

    return result;
  } catch (error) {
    result.error = error;
    serverLog('Camera permission check failed', error);

    // Try to determine which permission failed
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      // User denied permission
      result.camera = false;
      result.microphone = false;

      // Log the denied permission
      logMediaAccess({
        camera_permission: 'denied',
        microphone_permission: 'denied',
        stream_active: false,
        error: error.name
      }).catch(logError => {
        console.warn('Failed to log media access denial:', logError);
      });
    }

    return result;
  }
};
