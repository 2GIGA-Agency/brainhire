import { Candidate } from '@/store/types';
import { ActionCandidate } from '../ActionCandidate';
import styles from './style.module.scss';
import { CandidateActionWithoutNone } from '../../../CandidatesTabs/types';

interface Props {
	candidates: Candidate[];
	action?: CandidateActionWithoutNone;
}

export function ActionCandidatesList({ candidates, action }: Props) {
	return (
		<ul className={styles.candidatesList}>
			{candidates.map((i) => {
				return (
					<li key={i.id}>
						<ActionCandidate candidate={i} action={action} />
					</li>
				);
			})}
		</ul>
	);
}
