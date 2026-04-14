'use client';

import {
	CheckInternet,
	CheckMicrophone,
	CheckVideo,
	Requirements,
	StartInterview,
	Testing,
	VideoInterview,
} from '@/components/interview';

import { EndOfInterview } from '@/components/interview/EndOfInterview';
import { PreInterview } from '@/components/interview/PreInterview';
import { Scoring } from '@/components/interview/Scoring/Scoring';
import { InterviewWrapper } from '@/components/shared/InterviewWrapper';
import { useUIEvents } from '@/hooks/useUIEvents';
import { clearInterviewFlow, setCandidateId } from '@/store/slices/interviewFlow';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { startInterview } from '@/store/thunks';
import { getAntiFrod } from '@/store/thunks/interviewFlow/antiFrodThunk';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { initDeviceLogging, logDeviceInfo } from '@/utils/deviceLogger';
import {
	isSafari,
	getCachedMediaRecorderTestResults,
	testMediaRecorderCompatibility,
} from '@/utils/safariCameraDebug';
import { serverLog } from '@/utils/cameraLogger';
import { InterviewSteps } from '@/store/types';
import { PreTest } from '@/components/interview/Testing/components/PreTest';
import { AfterTest } from '@/components/interview/Testing/components/AfterTest';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';

const pagesMap: Record<InterviewSteps, React.FC> = {
	[InterviewSteps.START]: StartInterview,
	[InterviewSteps.REQUIREMENTS]: Requirements,
	[InterviewSteps.CHECK_INTERNET_CONNECTION]: CheckInternet,
	[InterviewSteps.CHECK_VIDEO]: CheckVideo,
	[InterviewSteps.CHECK_MICROPHONE]: CheckMicrophone,
	[InterviewSteps.PRE_TEST]: PreTest,
	[InterviewSteps.TESTING]: Testing,
	[InterviewSteps.AFTER_TEST]: AfterTest,
	[InterviewSteps.PRE_INTERVIEW]: PreInterview,
	[InterviewSteps.VIDEO_INTERVIEW]: VideoInterview,
	[InterviewSteps.SCORING]: Scoring,
	[InterviewSteps.END_OF_INTERVIEW]: EndOfInterview,
};

export default function PersonalInterviewPage() {
	const dispatch = useAppDispatch();
	const { currentStep, sendCodeError, error } = useAppSelector((state) => state.interviewFlow);
	const params = useParams();
	const id = params?.id.toString();
	const { initUIEvents } = useUIEvents();

	const PageComponent = pagesMap[currentStep] ?? (() => <div>Not found</div>);

	useEffect(() => {
		// Initialize device logging with explicit call and debug output
		initDeviceLogging();

		// Force an immediate explicit device log
		logDeviceInfo()
			.then((response) => {})
			.catch((error) => {
				console.error('[DEVICE_LOG_DEBUG] Failed to send explicit device log:', error);
			});

		serverLog('Safari debug button added for diagnostics');
		// Add Safari debug button for iOS/macOS testing
		if (isSafari()) {
			// Pre-test MediaRecorder compatibility to cache results
			try {
				const cachedResults = getCachedMediaRecorderTestResults();
				if (!cachedResults) {
					serverLog('No cached MediaRecorder test results found, running test now');
					// Run the test in the background to cache results for later use
					setTimeout(async () => {
						try {
							const testResults = await testMediaRecorderCompatibility();
							serverLog('MediaRecorder compatibility test completed', {
								recommendedMimeType: testResults.recommendedMimeType,
								supportedMimeTypes: testResults.supportedMimeTypes,
							});
						} catch (e) {
							serverLog('Error running MediaRecorder compatibility test', e);
						}
					}, 1000);
				} else {
					serverLog('Found cached MediaRecorder test results', cachedResults);
				}
			} catch (e) {
				serverLog('Error checking cached MediaRecorder test results', e);
			}
		}
	}, []);

	useEffect(() => {
		dispatch(startInterview(id));
		dispatch(setCandidateId(id));
		dispatch(getAntiFrod());

		const cleanUpUiEvents = initUIEvents();

		return () => {
			cleanUpUiEvents();
			dispatch(clearInterviewFlow());
		};
	}, [dispatch, id]);

	return (
		<InterviewWrapper>
			{sendCodeError ? (
				<Typo textStyle="lg" mb={24} color={COLORS.GRAY_800} mt={36} textAlign={'center'}>
					{error}
				</Typo>
			) : (
				<PageComponent />
			)}
		</InterviewWrapper>
	);
}
