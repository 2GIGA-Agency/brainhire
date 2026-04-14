import styles from './style.module.scss';
import { Table } from '@chakra-ui/react';
import { useMobileCheck } from '../../hooks/useMobileCheck';
import { formatNumber, formatPrice } from '../../utils';
import { ChangeEvent } from 'react';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { LkInput } from '@/components/shared/LkInput';

// Обновленный интерфейс с опциональным invoice
interface Props {
	amount: number;
	price: number;
	summary: number;
	isEdit?: boolean;
	handleInput?: (e: ChangeEvent<HTMLInputElement>) => void;
	vatRate?: number; // Добавляем опциональную ставку НДС
}

const InvoiceTable = (props: Props) => {
	const isMobile = useMobileCheck();

	return isMobile ? <MobileInvoiceTable {...props} /> : <DesktopInvoiceTable {...props} />;
};

const DesktopInvoiceTable = ({
	amount,
	price,
	summary,
	isEdit = false,
	handleInput,
	vatRate = 22, // Значение по умолчанию 22%
}: Props) => (
	<Table.Root className={styles.table}>
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						№
					</Typo>
				</Table.ColumnHeader>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Наименование услуги
					</Typo>
				</Table.ColumnHeader>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Ед. изм.
					</Typo>
				</Table.ColumnHeader>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Кол-во
					</Typo>
				</Table.ColumnHeader>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Цена, руб.
					</Typo>
				</Table.ColumnHeader>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						НДС %
					</Typo>
				</Table.ColumnHeader>
				<Table.ColumnHeader>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Сумма, руб.
					</Typo>
				</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			<Table.Row>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>1</Typo>
				</Table.Cell>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>
						Право использования (лицензия) программного обеспечения &quot;BRaiN HR&quot;, тарифный
						план Бизнес
					</Typo>
				</Table.Cell>
				<Table.Cell>
					<Typo color={COLORS.GRAY_800}>Токены</Typo>
				</Table.Cell>
				<Table.Cell textAlign="right">
					<Typo color={COLORS.GRAY_800}>
						{isEdit ? (
							<LkInput
								value={formatNumber(amount)}
								onChange={handleInput}
								padding="11px 0px 11px 16px"
							/>
						) : (
							formatNumber(amount)
						)}
					</Typo>
				</Table.Cell>
				<Table.Cell textAlign="right">
					<Typo color={COLORS.GRAY_800}>{formatPrice(price)}</Typo>
				</Table.Cell>
				<Table.Cell textAlign="right">
					<Typo color={COLORS.GRAY_800}>{vatRate}</Typo> {/* Динамическое значение */}
				</Table.Cell>
				<Table.Cell textAlign="right">
					<Typo color={COLORS.GRAY_800}>{formatPrice(summary)}</Typo>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
);

const MobileInvoiceTable = ({
	amount,
	price,
	summary,
	isEdit = false,
	handleInput,
	vatRate = 22, // Значение по умолчанию 22%
}: Props) => (
	<Table.Root className={styles.table}>
		<Table.Body>
			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						№
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800}>1</Typo>
				</Table.Cell>
			</Table.Row>

			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Наименование услуги
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800}>
						Право использования (лицензия) программного обеспечения &quot;BRaiN HR&quot;, тарифный
						план Бизнес
					</Typo>
				</Table.Cell>
			</Table.Row>

			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Ед. изм.
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800}>Токены</Typo>
				</Table.Cell>
			</Table.Row>

			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Кол-во
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					{isEdit ? (
						<LkInput
							value={formatNumber(amount)}
							onChange={handleInput}
							padding="11px 0px 11px 16px"
						/>
					) : (
						<Typo color={COLORS.GRAY_800}>{formatNumber(amount)}</Typo>
					)}
				</Table.Cell>
			</Table.Row>

			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Цена, руб.
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800}>{formatPrice(Number(price))}</Typo>
				</Table.Cell>
			</Table.Row>

			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						НДС %
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800}>{vatRate}</Typo> {/* Динамическое значение */}
				</Table.Cell>
			</Table.Row>

			<Table.Row className={styles.mobileRow}>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800} weight="medium">
						Сумма, руб.
					</Typo>
				</Table.Cell>
				<Table.Cell className={styles.mobileCell}>
					<Typo color={COLORS.GRAY_800}>{formatPrice(Number(summary))}</Typo>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
);

export default InvoiceTable;
