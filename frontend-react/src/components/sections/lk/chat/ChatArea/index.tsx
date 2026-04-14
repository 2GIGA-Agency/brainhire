import { useCallback } from 'react';
import styles from './style.module.scss';
import { IChatListItem, MessageOut, SendMessageRequest } from '@/types/Chat';
import { useGetVacancyDataByIdQuery } from '@/store/rtkQuery/api';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatComposer } from './components/ChatComposer';

interface ChatAreaProps {
	chat: IChatListItem;
	messages: MessageOut[];
	isLoading: boolean;
	error: string | null;
	onSendMessage: (payload: SendMessageRequest) => Promise<void>;
	isSending: boolean;
	sendError: string | null;
	onReload: () => void;
	vacancyId: string;
	onDeleteMessage: (messageId: number) => Promise<void>;
	reduced?: boolean;
	// isArrowShow нужен для того случая, когда мы используем виджет, эта Arrow в виджете нахер не всралась, т.к. есть кнопка назад в шапке
	// Сразу складывается вопрос, а нахера тогда isMobile? Разве нелья его использовать, но тут вся соль в том, что isMobile также формирует стили для ChatArea
	// а в виджете они должны быть мобильные (вырезана часть элементов отображения и стили другие немного)
	// Поэтому нам нужно разделить логику отображения кнопки и стилей раздельно, для этого нужен этот флаг
	withBackButton?: boolean;
	isMobile?: boolean;
	handleBack?: () => void;
}

export function ChatArea({
	chat,
	messages,
	isLoading,
	error,
	onSendMessage,
	isSending,
	sendError,
	onReload,
	vacancyId,
	onDeleteMessage,
	isMobile = false,
	withBackButton = false,
	handleBack,
}: ChatAreaProps) {
	const { data: vacancy, isLoading: isVacancyLoading } = useGetVacancyDataByIdQuery(
		{ vacancyId: vacancyId },
		{ skip: !vacancyId }
	);

	const combinedIsLoading = isLoading || isVacancyLoading;

	const handleSend = useCallback(
		async (text: string) => {
			await onSendMessage({ topic_id: chat.topic_id, text });
		},
		[onSendMessage, chat.topic_id]
	);

	return (
		<div className={styles.chatArea}>
			<ChatHeader
				chat={chat}
				vacancy={vacancy}
				isLoading={combinedIsLoading}
				isMobile={isMobile}
				withBackButton={withBackButton}
				onBack={handleBack}
			/>

			<MessageList
				messages={messages}
				isLoading={isLoading}
				error={error}
				onReload={onReload}
				onDeleteMessage={onDeleteMessage}
			/>

			<ChatComposer
				onSend={handleSend}
				isSending={isSending}
				isDisabled={combinedIsLoading}
				error={sendError}
			/>
		</div>
	);
}
