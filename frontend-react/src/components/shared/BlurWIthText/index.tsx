import { Box } from '@chakra-ui/react/';
import styles from './styles.module.scss';
import { Typo } from '../Typo/Typo';

interface Props {
	text: string;
}

export function BlurWithText({ text }: Props) {
	return (
		<Box className={styles.blurBox}>
			<Typo size="20px" weight="semibold">
				{text}
			</Typo>
		</Box>
	);
}
