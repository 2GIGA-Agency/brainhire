import { LkButton } from '@/components/shared/LkButton';
import { LkTextarea } from '@/components/shared/LkTextarea';
import { LkInput } from '@/components/shared/LkInput';
import { COLORS } from '@/constants/colors';
import { Box, CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import styles from './style.module.scss';
import { Typo } from '@/components/shared/Typo/Typo';
import {
	ChangeEvent,
	useState,
	useRef,
	KeyboardEvent,
	MouseEvent,
	useEffect,
	useMemo,
} from 'react';
import { ConfirmedModal } from '../ConfirmedModal';
import { MessageTemplate, NullableTemplate } from '@/store/slices/vacancyCreation/vacancySettings';

export type PatternButton =
	| 'Name'
	| 'HRName'
	| 'Vacancy'
	| 'email'
	| 'link_interview'
	| 'link_feedback'
	| 'link_drop';

const PatternButtons: Record<PatternButton, { title: string; value: string }> = {
	Name: { title: 'Имя соискателя', value: '[Name]' },
	HRName: { title: 'Моё имя', value: '[HRName]' },
	Vacancy: { title: 'Вакансия', value: '[Vacancy]' },
	email: { title: 'Email', value: '{email}' },
	link_interview: { title: 'Ссылка на интервью', value: '{link}' },
	link_feedback: { title: 'Ссылка на обратную связь', value: '{link}' },
	link_drop: { title: 'Ссылка отказа от напоминаний', value: '{link_drop}' },
};

// Хелперы для работы с защищенными блоками
type ProtectedBlock = { start: number; end: number; value: string };
const findProtectedBlocks = (text: string): ProtectedBlock[] => {
	const blocks: ProtectedBlock[] = [];
	const regex = /(\[[^\]]+\]|\{[^}]+\})/g;
	let match;
	while ((match = regex.exec(text)) !== null) {
		blocks.push({
			start: match.index,
			end: match.index + match[0].length,
			value: match[0],
		});
	}
	return blocks;
};

interface Props {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	mode: 'create' | 'edit';
	templateToEdit: NullableTemplate;
	buttons: PatternButton[];
	onSave: (data: MessageTemplate | { title: string; content: string }) => void;
	allTemplates: MessageTemplate[]; // Список всех шаблонов для проверки уникальности
}

export function ChangePatternModal({
	isOpen,
	setIsOpen,
	mode,
	templateToEdit,
	buttons,
	onSave,
	allTemplates,
}: Props) {
	// Локальное состояние для полей формы
	const [localTitle, setLocalTitle] = useState('');
	const [localContent, setLocalContent] = useState('');

	// Находим системный шаблон внутри компонента
	// Предполагаем, что у системного шаблона есть флаг is_system (или id === 0, или type === 'system')
	const systemTemplate = useMemo(() => {
		return allTemplates.find((t) => t.isSystem);
	}, [allTemplates]);

	// --- Start: Логика Истории (Undo/Redo) ---
	const [history, setHistory] = useState<string[]>([]);
	const [historyIndex, setHistoryIndex] = useState(0);
	const historyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const addToHistory = (newContent: string, forceNew = false) => {
		setHistory((prev) => {
			const currentHistory = prev.slice(0, historyIndex + 1);
			if (!forceNew && currentHistory[currentHistory.length - 1] === newContent) {
				return currentHistory;
			}
			return [...currentHistory, newContent];
		});

		setHistoryIndex((prev) => prev + 1);
	};

	useEffect(() => {
		setHistoryIndex(history.length - 1);
	}, [history.length]);
	// --- End: Логика Истории ---

	const [titleError, setTitleError] = useState('');
	const [globalError, setGlobalError] = useState('');
	const [missingFields, setMissingFields] = useState<string[]>([]);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Эффект для инициализации
	useEffect(() => {
		if (isOpen) {
			let initialContent = '';
			if (mode === 'edit' && templateToEdit) {
				setLocalTitle(templateToEdit.title);
				initialContent = templateToEdit.content;
			} else {
				setLocalTitle('');
				initialContent = '';
			}
			setLocalContent(initialContent);
			setHistory([initialContent]);
			setHistoryIndex(0);

			setTitleError('');
			setMissingFields([]);
		}
	}, [isOpen, mode, templateToEdit]);

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (titleError) setTitleError('');
		if (globalError) setGlobalError('');
		setLocalTitle(e.target.value);
	};

	const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		const hasUnclosedBracket = /\[[^\]]*$/.test(newValue);
		const hasUnclosedBrace = /\{[^}]*$/.test(newValue);
		if (hasUnclosedBracket || hasUnclosedBrace) {
			return;
		}

		setLocalContent(newValue);

		if (historyTimeoutRef.current) {
			clearTimeout(historyTimeoutRef.current);
		}
		historyTimeoutRef.current = setTimeout(() => {
			addToHistory(newValue);
		}, 200);
	};

	const handleUndo = () => {
		if (historyIndex > 0) {
			const previousContent = history[historyIndex - 1];
			setLocalContent(previousContent);
			setHistoryIndex(historyIndex - 1);
		}
	};

	const handleRedo = () => {
		if (historyIndex < history.length - 1) {
			const nextContent = history[historyIndex + 1];
			setLocalContent(nextContent);
			setHistoryIndex(historyIndex + 1);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (globalError) setGlobalError('');

		// Undo/Redo
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
			e.preventDefault();
			if (e.shiftKey) {
				handleRedo();
			} else {
				handleUndo();
			}
			return;
		}

		const textarea = e.currentTarget;
		const { selectionStart, selectionEnd } = textarea;
		const blocks = findProtectedBlocks(localContent);

		if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
			const isRight = e.key === 'ArrowRight';
			const isLeft = e.key === 'ArrowLeft';
			const isShift = e.shiftKey;

			if (!isShift && selectionStart === selectionEnd) {
				for (const block of blocks) {
					if (isRight && selectionStart === block.start) {
						e.preventDefault();
						textarea.setSelectionRange(block.end, block.end);
						return;
					}
					if (isLeft && selectionStart === block.end) {
						e.preventDefault();
						textarea.setSelectionRange(block.start, block.start);
						return;
					}
				}
			}

			if (isShift) {
				const direction = textarea.selectionDirection;
				if (selectionStart === selectionEnd) {
					for (const block of blocks) {
						if (isLeft && selectionStart === block.end) {
							e.preventDefault();
							textarea.setSelectionRange(block.start, block.end, 'backward');
							return;
						}
						if (isRight && selectionStart === block.start) {
							e.preventDefault();
							textarea.setSelectionRange(block.start, block.end, 'forward');
							return;
						}
					}
				}
				for (const block of blocks) {
					if (isRight) {
						if (direction === 'forward' && selectionEnd === block.start) {
							e.preventDefault();
							textarea.setSelectionRange(selectionStart, block.end, 'forward');
							return;
						}
						if (direction === 'backward' && selectionStart === block.start) {
							e.preventDefault();
							textarea.setSelectionRange(block.end, selectionEnd, 'backward');
							return;
						}
					} else if (isLeft) {
						if (direction === 'backward' && selectionStart === block.end) {
							e.preventDefault();
							textarea.setSelectionRange(block.start, selectionEnd, 'backward');
							return;
						}
						if (direction === 'forward' && selectionEnd === block.end) {
							e.preventDefault();
							textarea.setSelectionRange(selectionStart, block.start, 'forward');
							return;
						}
					}
				}
			}
		}

		if (e.key === 'Backspace' || e.key === 'Delete') {
			if (selectionStart !== selectionEnd) return;
			let blockToDelete: ProtectedBlock | undefined;
			if (e.key === 'Backspace') {
				blockToDelete = blocks.find((b) => b.end === selectionStart);
			} else {
				blockToDelete = blocks.find((b) => b.start === selectionStart);
			}
			if (blockToDelete) {
				e.preventDefault();
				const newText =
					localContent.slice(0, blockToDelete.start) + localContent.slice(blockToDelete.end);

				setLocalContent(newText);
				if (historyTimeoutRef.current) clearTimeout(historyTimeoutRef.current);
				historyTimeoutRef.current = setTimeout(() => addToHistory(newText), 500);

				setTimeout(() => {
					textarea.setSelectionRange(blockToDelete!.start, blockToDelete!.start);
				}, 0);
			}
		}
	};

	const handleClick = (e: MouseEvent<HTMLTextAreaElement>) => {
		const textarea = e.currentTarget;
		setTimeout(() => {
			const { selectionStart } = textarea;
			const blocks = findProtectedBlocks(localContent);
			for (const block of blocks) {
				if (selectionStart > block.start && selectionStart < block.end) {
					textarea.setSelectionRange(block.end, block.end);
					break;
				}
			}
		}, 0);
	};

	const handleDoubleClick = (e: MouseEvent<HTMLTextAreaElement>) => {
		const textarea = e.currentTarget;
		const clickPos = textarea.selectionStart;
		const blocks = findProtectedBlocks(localContent);
		for (const block of blocks) {
			if (clickPos >= block.start && clickPos <= block.end) {
				e.preventDefault();
				textarea.setSelectionRange(block.start, block.end);
				return;
			}
		}
	};

	const handleSaveClick = (callback?: () => void) => {
		const trimmedTitle = localTitle.trim();

		if (!trimmedTitle) {
			setTitleError('Название шаблона не может быть пустым');
			return;
		}
		if (trimmedTitle.length > 255) {
			setTitleError('Название шаблона не может превышать 255 символов');
			return;
		}

		// Проверка на уникальность названия
		const isTitleDuplicate = allTemplates.some((t) => {
			// Если редактируем, пропускаем сравнение с самим собой (по id)
			if (mode === 'edit' && templateToEdit && t.id === templateToEdit.id) {
				return false;
			}
			return t.title.trim().toLowerCase() === trimmedTitle.toLowerCase();
		});

		if (isTitleDuplicate) {
			setTitleError('Шаблон с таким названием уже существует');
			return;
		}

		if (
			mode === 'edit' &&
			templateToEdit &&
			localTitle === templateToEdit.title &&
			localContent === templateToEdit?.content
		) {
			setGlobalError('Для обновления шаблона, необходимо внести изменения в название или текст');
			return;
		}
		setTitleError('');

		const blocks = findProtectedBlocks(localContent);
		const tagsString = blocks.map((i) => i.value);
		const missing: string[] = [];
		buttons.forEach((i) => {
			if (!tagsString.includes(PatternButtons[i].value)) {
				missing.push(PatternButtons[i].title);
			}
		});
		setMissingFields(missing);

		if (missing.length === 0) {
			let dataToSave;
			if (mode === 'edit' && templateToEdit) {
				dataToSave = { ...templateToEdit, title: localTitle, content: localContent };
			} else {
				dataToSave = { title: localTitle, content: localContent };
			}
			onSave(dataToSave);
			setIsOpen(false);
			if (callback) callback();
		}
	};

	const handleCloseAttempt = () => {
		let hasChanges = false;
		if (mode === 'edit' && templateToEdit) {
			hasChanges = localTitle !== templateToEdit.title || localContent !== templateToEdit.content;
		} else {
			hasChanges = localTitle.trim() !== '' || localContent.trim() !== '';
		}

		if (hasChanges) {
			setIsConfirmModalOpen(true);
		} else {
			setIsOpen(false);
		}
	};

	const handlePatternButtonClick = (pattern: PatternButton) => {
		if (globalError) setGlobalError('');
		const textarea = textareaRef.current;
		if (!textarea) return;

		if (historyTimeoutRef.current) clearTimeout(historyTimeoutRef.current);
		if (localContent !== history[historyIndex]) {
			setHistory((prev) => {
				const current = prev.slice(0, historyIndex + 1);
				return [...current, localContent];
			});
		}

		const { selectionStart, selectionEnd } = textarea;
		const patternValue = PatternButtons[pattern].value;

		if (missingFields.includes(PatternButtons[pattern].title)) {
			setMissingFields((prev) => prev.filter((i) => i !== PatternButtons[pattern].title));
		}

		const newText =
			localContent.substring(0, selectionStart) +
			patternValue +
			localContent.substring(selectionEnd);

		setLocalContent(newText);

		setTimeout(() => {
			addToHistory(newText, true);
		}, 0);

		setTimeout(() => {
			const newCursorPos = selectionStart + patternValue.length;
			textarea.focus();
			textarea.setSelectionRange(newCursorPos, newCursorPos);
		}, 0);
	};

	const handleConfirmAndSave = () => {
		handleSaveClick(() => setIsConfirmModalOpen(false));
	};

	const handleDiscardAndClose = () => {
		setIsConfirmModalOpen(false);
		setIsOpen(false);
	};

	const handleDefaultClick = () => {
		textareaRef.current?.focus();
		if (systemTemplate) {
			if (historyTimeoutRef.current) clearTimeout(historyTimeoutRef.current);
			if (localContent !== history[historyIndex]) {
				setHistory((prev) => [...prev.slice(0, historyIndex + 1), localContent]);
			}

			setLocalContent(systemTemplate.content);

			setTimeout(() => {
				addToHistory(systemTemplate.content, true);
			}, 0);

			setTitleError('');
			setGlobalError('');
			setMissingFields([]);
		} else {
			setGlobalError('Системный шаблон не найден');
		}
	};

	return (
		<>
			<Dialog.Root
				lazyMount
				open={isOpen}
				onOpenChange={(details) => !details.open && handleCloseAttempt()}
			>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content className={styles.modal}>
							<Dialog.Header>
								<Dialog.Title>
									{mode === 'edit' ? 'Редактирование шаблона' : 'Создание нового шаблона'}
								</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								<Box className={styles.content}>
									<Box mb={4}>
										<Typo mb={1}>Название шаблона</Typo>
										<LkInput value={localTitle} onChange={handleTitleChange} />
										{titleError && (
											<Typo mt={1} color={COLORS.RED_400}>
												{titleError}
											</Typo>
										)}
									</Box>

									<Box>
										<Typo mb={1}>Текст шаблона</Typo>
										<LkTextarea
											ref={textareaRef}
											resize={'none'}
											minH={'302px'}
											value={localContent}
											onChange={handleChangeContent}
											onKeyDown={handleKeyDown}
											onClick={handleClick}
											onDoubleClick={handleDoubleClick}
										/>
									</Box>

									<Box mt={4}>
										<Typo color={COLORS.GRAY_400}>Нужно вставить</Typo>
										<Flex wrap={'wrap'} gap={2} mt={2}>
											{buttons.map((buttonKey) => (
												<LkButton
													key={buttonKey}
													borderWidth="1px"
													borderStyle="solid"
													borderColor={
														missingFields.includes(PatternButtons[buttonKey].title)
															? COLORS.RED_400
															: 'transparent'
													}
													bg={COLORS.GRAY_200}
													onClick={() => handlePatternButtonClick(buttonKey)}
												>
													<Typo color={COLORS.GRAY_800}>{PatternButtons[buttonKey].title}</Typo>
												</LkButton>
											))}
										</Flex>
									</Box>
								</Box>

								{missingFields.length > 0 && (
									<Typo mt={2} color={COLORS.RED_400} weight="medium">
										Вставьте теги: {missingFields.join(', ')}
									</Typo>
								)}
								{globalError && (
									<Typo mt={2} color={COLORS.RED_400} weight="medium">
										{globalError}
									</Typo>
								)}
							</Dialog.Body>
							<Dialog.Footer display={'flex'} justifyContent={'space-between'}>
								<LkButton
									bg={COLORS.WHITE_ALPHA_100}
									borderColor={COLORS.GRAY_400}
									color={COLORS.GRAY_800}
									onClick={() => handleDefaultClick()}
								>
									По умолчанию
								</LkButton>
								<LkButton onClick={() => handleSaveClick()}>Сохранить</LkButton>
							</Dialog.Footer>

							<CloseButton
								size="sm"
								onClick={handleCloseAttempt}
								position="absolute"
								top="4"
								right="4"
							/>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>

			<ConfirmedModal
				isOpen={isConfirmModalOpen}
				onClose={handleDiscardAndClose}
				title="Сохранить изменения?"
				text="Вы внесли изменения в шаблон. Хотите сохранить их перед выходом?"
				action={handleConfirmAndSave}
				buttonConfirmText="Сохранить"
				buttonCancelText="Не сохранять"
				onCloseButtonClick={() => setIsConfirmModalOpen(false)}
			/>
		</>
	);
}
