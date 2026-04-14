import { COLORS } from '@/constants/colors';
import { ButtonProps, useClipboard } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import { LkButton } from '../LkButton';
import { Typo } from '../Typo/Typo';

interface Props extends ButtonProps {
	bg?: string;
	copyValue: string;
	title: string;
	fontSize?: string;
	fontWeight?: string | number;
}

export const CopyButton: React.FC<Props> = ({
	copyValue,
	title,
	fontSize = '14px',
	fontWeight = 600,
	...props
}) => {
	const vacancyExternalLink = useClipboard({
		value: copyValue,
	});

	const copyIcon = vacancyExternalLink.copied ? (
		<Image src="/icons/done.svg" width={14} height={14} alt="done" />
	) : (
		<Image src="/icons/link.svg" alt="Add Icon" width={14} height={14} />
	);
	const copyTitle = vacancyExternalLink.copied ? 'Скопировано!' : title;

	return (
		<LkButton onClick={vacancyExternalLink.copy} icon={copyIcon} {...props}>
			<Typo fontSize={fontSize} color={COLORS.WHITE} fontWeight={fontWeight}>
				{copyTitle}
			</Typo>
		</LkButton>
	);
};
