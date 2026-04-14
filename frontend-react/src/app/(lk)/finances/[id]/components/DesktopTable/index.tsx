import { Typo } from '@/components/shared/Typo/Typo';
import { Table } from '@chakra-ui/react';
import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';

// components/DesktopTable.tsx
export const DesktopTable = () => (
	<Table.Root className={styles.table} >
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan={2} rowSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						ПАО Сбербанк г. Москва
					</Typo>
					<Typo color={COLORS.GRAY_800}>Банк получателя</Typo>
				</Table.Cell>
				<Table.Cell>БИК</Table.Cell>
				<Table.Cell rowSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						044525225
					</Typo>
					<Typo color={COLORS.GRAY_800}>30101810400000000225</Typo>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Сч. №</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>ИНН 5009132924</Typo>
				</Table.Cell>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>КПП 500901001</Typo>
				</Table.Cell>
				<Table.Cell rowSpan={2}>
					<Typo color={COLORS.GRAY_800}>Сч. №</Typo>
				</Table.Cell>
				<Table.Cell rowSpan={2}>
					<Typo color={COLORS.GRAY_800}>40702810540000408017</Typo>
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell colSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						ООО "НДК"
					</Typo>
					<Typo color={COLORS.GRAY_800}>Получатель</Typo>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
);
