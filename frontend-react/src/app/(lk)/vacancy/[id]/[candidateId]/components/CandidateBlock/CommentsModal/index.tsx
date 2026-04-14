import { CloseButton, Dialog, Portal, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
	useGetCommentsByCandidateQuery,
	useSendCommentByCandidateMutation,
} from '@/store/rtkQuery/api';
import { Comment } from '../Comment';
import { LkButton } from '@/components/shared/LkButton';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { LkInput } from '@/components/shared/LkInput';

interface Props {
	candidateId: string;
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

export function CommentsModal({ candidateId, isOpen, setIsOpen }: Props) {
	const [commentText, setCommentText] = useState('');
	const { data: comments } = useGetCommentsByCandidateQuery({ candidateId });
	const [sendComment] = useSendCommentByCandidateMutation();

	return (
		<>
			<Dialog.Root lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>
									<Text fontSize="20px" lineHeight="24px">
										Комментарии
									</Text>
								</Dialog.Title>
								<Dialog.CloseTrigger asChild top="17px" right="15px">
									<CloseButton size="sm" />
								</Dialog.CloseTrigger>
							</Dialog.Header>
							<Dialog.Body>
								{comments &&
									comments.map((i) => {
										return <Comment key={i.id} {...i} />;
									})}
								<LkInput
									mt="24px"
									value={commentText}
									onChange={(e) => setCommentText(e.target.value)}
									placeholder="Напишите ваш комментарий"
									padding="8px 12px"
									alignItems="flex-start"
								/>
							</Dialog.Body>
							<Dialog.Footer>
								<LkButton
									disabled={commentText.length == 0}
									onClick={() => {
										sendComment({ candidate: candidateId, text: commentText }).then(() =>
											setCommentText('')
										);
									}}
								>
									<Typo size="14px" weight="semibold" color={COLORS.WHITE}>
										Добавить комментарий
									</Typo>
								</LkButton>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}
