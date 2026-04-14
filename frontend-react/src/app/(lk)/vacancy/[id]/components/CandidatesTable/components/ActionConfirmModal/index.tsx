import { CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { CandidateAction } from '../CandidatesTabs/types';
import { ACTIONS_LABELS } from '../../lib/consts';
import { ActionCandidatesList } from './components/ActionCandidatesList';
import { Candidate } from '@/store/types';
import { LkButton } from '@/components/shared/LkButton';
import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';
import { useState } from 'react';
import { BaseSpinner } from '@/components/shared/BaseSpinner/BaseSpinner';

interface Props {
	isOpen: boolean;
	action: CandidateAction;
	candidates: Candidate[];

	setIsOpen: (isOpen: boolean) => void;
	onConfirm: (action: CandidateAction, candidates: Candidate[]) => Promise<void>;
}

export function ActionConfirmModal({ isOpen, action, candidates, setIsOpen, onConfirm }: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const [showAfterAction, setShowAfterAction] = useState(false);
	
	const [processedCandidates, setProcessedCandidates] = useState<Candidate[]>([]);

	if (action === 'none') {
		return null;
	}

	const handleConfirm = async () => {
		setProcessedCandidates(candidates);
		
		setIsLoading(true);
		try {
			await onConfirm(action, candidates);
			setShowAfterAction(true);
		} catch (error) {
			console.error('Ошибка при выполнении действия:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
		setTimeout(() => {
			setShowAfterAction(false);
			setProcessedCandidates([]);
		}, 300);
	};

	const currentActionLabels = ACTIONS_LABELS[action];

	if (!currentActionLabels) return null;

	const { title, subtitle, warning, buttonText, afterActionModalTitle } = currentActionLabels;

	const renderContent = () => {
		// 1. Стадия загрузки
		if (isLoading) {
			return (
				<div className={styles.loadingContainer}>
					<p>Выполняется обработка</p>
					<BaseSpinner />
				</div>
			);
		}

		// 2. Стадия после выполнения действия
		if (showAfterAction) {
			return (
				<>
					<Dialog.Header>
						<div className={styles.headerContainer}>
							<Dialog.Title fontSize="lg" fontWeight="bold">
								{afterActionModalTitle}
							</Dialog.Title>
							<CloseButton size="sm" onClick={handleClose} />
						</div>
					</Dialog.Header>
					<Dialog.Body>
						<ActionCandidatesList candidates={processedCandidates} action={action} />
					</Dialog.Body>
					<Dialog.Footer>
						<LkButton onClick={handleClose}>Закрыть</LkButton>
					</Dialog.Footer>
				</>
			);
		}

		// 3. Начальная стадия (подтверждение действия)
		return (
			<>
				<Dialog.Header>
					<div className={styles.headerContainer}>
						<Dialog.Title fontSize="lg" fontWeight="bold">
							{title}
						</Dialog.Title>
						<CloseButton size="sm" onClick={handleClose} />
					</div>
				</Dialog.Header>
				<Dialog.Body>
					<p>{subtitle}</p>
					<ActionCandidatesList candidates={candidates} />
					<div className={styles.warning}>
						<span className={styles.warningText}>Внимание!</span> {warning}
					</div>
				</Dialog.Body>
				<Dialog.Footer>
					<LkButton bg={COLORS.GRAY_500} onClick={handleClose}>
						Отменить
					</LkButton>
					<LkButton onClick={handleConfirm} disabled={isLoading}>
						{buttonText}
					</LkButton>
				</Dialog.Footer>
			</>
		);
	};

	return (
		<Dialog.Root lazyMount open={isOpen} onOpenChange={handleClose}>
			<Portal>
				<Dialog.Backdrop zIndex={'modal'} />
				<Dialog.Positioner zIndex={'popover'}>
					<Dialog.Content>{renderContent()}</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}