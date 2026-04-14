
import { AiQuestionsSettings } from '../AiQuestionsSettings';
import { AnswerTimeSettings } from '../AnswerTimeSettings';
import { AddButtonsGroup } from '../AddButtonsGroup';
import { Box } from '@chakra-ui/react';
import styles from "./styles.module.scss"


export function GenerationSettings() {


	return (
		<>
			<Box className={styles.settings}>
				<AiQuestionsSettings />
				<AnswerTimeSettings />
				<AddButtonsGroup />
			</Box>
		</>
	);
}
