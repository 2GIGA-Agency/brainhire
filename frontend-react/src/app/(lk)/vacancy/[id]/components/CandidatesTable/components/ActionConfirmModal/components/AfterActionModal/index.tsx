import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { Candidate } from '@/store/types';
import { LkButton } from '@/components/shared/LkButton';
import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';
import { CandidateActionWithoutNone } from '../../../CandidatesTabs/types';
import { ACTIONS_LABELS } from '../../../../lib/consts';
import { ActionCandidatesList } from '../ActionCandidatesList';

interface Props {
	isOpen: boolean;
	action: CandidateActionWithoutNone;
	candidates: Candidate[];

	setIsOpen: (isOpen: boolean) => void;
}

export function AfterActionModal({ isOpen, action, candidates, setIsOpen }: Props) {
	const currentActionLabels = ACTIONS_LABELS[action];

	const { afterActionModalTitle } = currentActionLabels;

	return (
		<Dialog.Root lazyMount open={isOpen} onOpenChange={() => setIsOpen(false)}>
			<Portal>
				<Dialog.Backdrop zIndex={'modal'} />
				<Dialog.Positioner zIndex={'popover'}>
					<Dialog.Content>
						<Dialog.Header>
							<div className={styles.headerContainer}>
								<Dialog.Title fontSize="lg" fontWeight="bold">
									{afterActionModalTitle}
								</Dialog.Title>
								<CloseButton size="sm" onClick={() => setIsOpen(false)} />
							</div>
						</Dialog.Header>
						<Dialog.Body>
							<ActionCandidatesList candidates={candidates} action={action}/>
						</Dialog.Body>
						<Dialog.Footer>
							<LkButton bg={COLORS.GRAY_500} onClick={() => setIsOpen(false)}>
								Закрыть
							</LkButton>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
