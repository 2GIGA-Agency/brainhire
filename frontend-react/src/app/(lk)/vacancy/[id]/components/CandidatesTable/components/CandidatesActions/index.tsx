import { LkButton } from '@/components/shared/LkButton';
import styles from './style.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { CandidateAction, TableTab } from '../CandidatesTabs/types';
import { getAvailableActions } from '../CandidatesTabs/lib/getAvailiableActions';
import { toaster } from '@/components/ui/toaster';

interface Props {
	activeTab: TableTab;
	isActive: boolean;
	selectedCandidatesLength: number;

	setIsActive: (isActive: boolean) => void;
	selectAction: (param: CandidateAction) => void;
}

export function CandidatesActions({
	activeTab,
	isActive,
	selectedCandidatesLength,
	setIsActive,
	selectAction,
}: Props) {
	const availableActions = getAvailableActions(activeTab);

	// Если для текущей вкладки нет доступных действий
	if (availableActions.length === 0) {
		return (
			<div className={styles.actionsWrapper}>
				<LkButton bg={COLORS.GRAY_400} disabled onClick={() => setIsActive(!isActive)}>
					<Typo weight="medium" color={COLORS.WHITE}>
						Действия
					</Typo>
				</LkButton>
			</div>
		);
	}

	const handleClick = (action: CandidateAction) => {
		if (selectedCandidatesLength === 0) {
			toaster.error({ title: 'Для выполнения действия необходимо выбрать хотя бы 1 кандидата' });
			return;
		}

		selectAction(action);
	};

	return (
		<div className={styles.actionsWrapper}>
			<LkButton bg={isActive ? COLORS.RED_400 : COLORS.TEAL_400} onClick={() => setIsActive(!isActive)}>
				<Typo weight="medium" color={COLORS.WHITE}>
					{isActive ? 'Отменить' : 'Действия'}
				</Typo>
			</LkButton>
			{isActive && (
				<div className={styles.actionsButtons}>
					{/* {availableActions.includes('invite') && (
						<LkButton onClick={() => handleClick('invite')}>
							<Typo weight="medium" color={COLORS.WHITE}>
								Пригласить
							</Typo>
						</LkButton>
					)}
					{availableActions.includes('reject') && (
						<LkButton onClick={() => handleClick('reject')}>
							<Typo weight="medium" color={COLORS.WHITE}>
								Отказать
							</Typo>
						</LkButton>
					)} */}
					{availableActions.includes('delete') && (
						<LkButton bg={COLORS.RED_400} onClick={() => handleClick('delete')}>
							<Typo weight="medium" color={COLORS.WHITE}>
								Удалить
							</Typo>
						</LkButton>
					)}
				</div>
			)}
		</div>
	);
}
