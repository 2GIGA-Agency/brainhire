import { Box, Flex, Grid } from '@chakra-ui/react';
import Image from 'next/image';
import styles from './Comment.module.scss';
import { formatDateToDateTime } from '@/utils/formatDate';
import { useState } from 'react';
import { useGetProfileQuery } from '@/store/rtkQuery/api';
import { Tooltip } from '@/components/ui/tooltip';
import axios from '@/utils/axios';
import { CandidateNote } from './types/types';
import { Typo } from '@/components/shared/Typo/Typo';
import { COLORS } from '@/constants/colors';
import { LkButton } from '@/components/shared/LkButton';
import { LkInput } from '@/components/shared/LkInput';

const postComment = (candidate: string, id: number, text: string) => {
	return axios.patch(`/api/candidates/comments/${id}/`, {
		candidate,
		text: text,
	});
};

export const Comment = ({
	id,
	candidate,
	text,
	created_at,
	updated_at,
	creator,
}: CandidateNote) => {
	const [isEdit, setIsEdit] = useState(false);
	const [editCommentText, setEditCommentText] = useState(text);

	const { data: profile } = useGetProfileQuery();

	const isCommentByUser = creator.email === profile?.email;

	const handleSubmit = () => {
		postComment(candidate, id, editCommentText);
		setIsEdit(false);
	};

	const handleCancel = () => {
		setEditCommentText(text);
		setIsEdit(false);
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			postComment(candidate, id, editCommentText);
			setIsEdit(false);
		}
	};

	const handleStartEdit = () => {
		setIsEdit(true);
	};

	return (
		<Flex gap="8px" mb="16px" position="relative">
			{isCommentByUser && (
				<Box right="2px" top="2px" position="absolute" cursor="pointer" onClick={handleStartEdit}>
					<Tooltip content="Редактировать" showArrow positioning={{ placement: 'top' }}>
						<Image src="/icons/HiPencil.svg" width={16} height={16} alt="edit" />
					</Tooltip>
				</Box>
			)}

			<Image
				className={styles.avatar}
				src={creator?.photo_url ? creator.photo_url : '/images/default_user.avif'}
				alt="User Profile"
				width={32}
				height={32}
				unoptimized={true}
			/>
			<Box mt="2px" flex="1">
				<Flex gap="8px">
					<Typo size="14px" weight="medium">{`${creator.first_name} ${creator.last_name}`}</Typo>
					<Typo size="14px" weight="regular">
						написал комментарий
					</Typo>
				</Flex>
				<Typo size="12px" weight="regular" color={COLORS.GRAY_400} mt="2px">
					{formatDateToDateTime(created_at)}
				</Typo>
				{isEdit ? (
					<Grid>
						<LkInput
							autoFocus
							mt="8px"
							value={editCommentText}
							onChange={(e) => setEditCommentText(e.target.value)}
							onKeyDown={handleInputKeyDown}
						/>
						<Flex gap="8px" justifySelf="end">
							<LkButton bg="white" onClick={handleSubmit}>
								<Image src="/icons/ok.svg" width={12} height={12} alt="submit" />
							</LkButton>
							<LkButton bg="white" onClick={handleCancel}>
								<Image src="/icons/cancel.svg" width={12} height={12} alt="cancel" />
							</LkButton>
						</Flex>
					</Grid>
				) : (
					<Typo size="14px" weight="regular" color={COLORS.GRAY_800} mt="8px">
						{editCommentText}
					</Typo>
				)}
			</Box>
		</Flex>
	);
};
