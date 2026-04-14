import { Candidate } from '@/store/types';
import styles from './style.module.scss';
import { getCandidateStatusData } from '../../../../lib/helpers';
import { CandidateActionWithoutNone } from '../../../CandidatesTabs/types';
import { GrayRightArrowIcon } from '@icons/TSXIcons/ArrowRightIcon';
import { ACTIONS_LABELS } from '../../../../lib/consts';

interface Props {
	candidate: Candidate;
	action?: CandidateActionWithoutNone;
}

export function ActionCandidate({ candidate, action }: Props) {
	let status;
	if (action) {
		status = ACTIONS_LABELS[action].afterActionText;
	}
	const candidateStatus = getCandidateStatusData(candidate);

	return (
		<div className={styles.candidate}>
			<p>
				{candidate.first_name} {candidate.last_name}
			</p>
			<div>
				{action ? (
					<div className={styles.actionsHistory}>
						<span className={styles.candidateStatus}>{candidateStatus.title}</span>
						<GrayRightArrowIcon />
						<span className={styles.candidateStatus}>{status}</span>
					</div>
				) : (
					<span className={styles.candidateStatus}>{candidateStatus.title}</span>
				)}
			</div>
		</div>
	);
}
