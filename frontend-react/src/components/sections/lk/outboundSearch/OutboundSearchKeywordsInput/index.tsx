import { KeywordsInput } from '@/components/shared/KeywordInput';
import { selectOutboundSearchSettings, setKeywords } from '@/store/slices/outboundSearch';
import { useAppDispatch, useAppSelector } from '@/store/store';

export function OutboundSearchKeywordsInput() {
	const keywords = useAppSelector(selectOutboundSearchSettings).keywords;
	const dispatch = useAppDispatch();

	const handleSelectKeyword = (keyword: string) => {
		dispatch(setKeywords([...keywords, keyword]));
	};

	const handleRemoveKeyword = (keyword: string) => {
		dispatch(setKeywords(keywords.filter((i) => i !== keyword)));
	};

	return (
		<KeywordsInput
			keywords={keywords}
			onSelect={handleSelectKeyword}
			onRemove={handleRemoveKeyword}
		/>
	);
}
