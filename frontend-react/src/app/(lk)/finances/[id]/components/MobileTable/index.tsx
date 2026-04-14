import { Typo } from '@/components/shared/Typo/Typo';
import { Table } from '@chakra-ui/react';
import styles from './style.module.scss';
import { COLORS } from '@/constants/colors';

// components/MobileTable.tsx
export const MobileTable = () => (
	<Table.Root className={styles.table} borderRadius={16}>
		<Table.Body>
			{/* Группа 1 */}
			<Table.Row>
				<Table.Cell colSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						ПАО Сбербанк г. Москва
					</Typo>
					<Typo color={COLORS.GRAY_800}>Банк получателя</Typo>
				</Table.Cell>
			</Table.Row>

			{/* Группа 2 */}
			<Table.Row>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>БИК</Typo>
				</Table.Cell>
				<Table.Cell rowSpan={2}>
					<Typo color={COLORS.GRAY_800} mb="0.5rem">
						044525225
					</Typo>
					<Typo color={COLORS.GRAY_800}>30101810400000000225</Typo>
				</Table.Cell>
			</Table.Row>

			{/* Группа 3 */}
			<Table.Row>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>Сч. №</Typo>
				</Table.Cell>
			</Table.Row>

			{/* Группа 4 */}
			<Table.Row>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>ИНН</Typo> 5009132924
				</Table.Cell>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>КПП</Typo> 500901001
				</Table.Cell>
			</Table.Row>

			{/* Группа 5 */}
			<Table.Row>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>Сч. №</Typo>
				</Table.Cell>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>40702810540000408017</Typo>
				</Table.Cell>
			</Table.Row>

			{/* Группа 6 */}
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
