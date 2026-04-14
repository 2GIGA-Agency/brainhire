import React, { useEffect } from 'react'; // Added useEffect
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Image from 'next/image';
import './TiptapEditor.css';

interface TiptapEditorProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
	if (!editor) {
		return null;
	}

	const buttons = [
		{
			action: () => editor.chain().focus().undo().run(),
			icon: 'undo.svg',
			title: 'Назад (Undo)',
			disabled: !editor.can().undo(),
			isActive: false,
			isRedo: false,
		},
		{
			action: () => editor.chain().focus().redo().run(),
			icon: 'undo.svg',
			title: 'Вперед (Redo)',
			disabled: !editor.can().redo(),
			isActive: false,
			isRedo: true,
		},
		{
			type: 'divider',
		},
		{
			action: () => editor.chain().focus().toggleBold().run(),
			icon: 'bold.svg',
			title: 'Жирный',
			disabled: !editor.can().toggleBold(),
			isActive: editor.isActive('bold'),
			isRedo: false,
		},
		{
			action: () => editor.chain().focus().toggleItalic().run(),
			icon: 'italic.svg',
			title: 'Курсив',
			disabled: !editor.can().toggleItalic(),
			isActive: editor.isActive('italic'),
			isRedo: false,
		},
		{
			action: () => editor.chain().focus().toggleUnderline().run(),
			icon: 'underline.svg',
			title: 'Подчеркнутый',
			disabled: !editor.can().toggleUnderline(),
			isActive: editor.isActive('underline'),
			isRedo: false,
		},
		{
			// Разделитель (опционально)
			type: 'divider',
		},
		{
			action: () => editor.chain().focus().toggleBulletList().run(),
			icon: 'unorder.svg',
			title: 'Маркированный список',
			disabled: !editor.can().toggleBulletList(),
			isActive: editor.isActive('bulletList'),
			isRedo: false,
		},
		{
			action: () => editor.chain().focus().toggleOrderedList().run(),
			icon: 'order.svg',
			title: 'Нумерованный список',
			disabled: !editor.can().toggleOrderedList(),
			isActive: editor.isActive('orderedList'),
			isRedo: false,
		},
	];

	return (
		<div className="tiptap-menu-bar">
			{buttons.map((button, index) => {
				if (button.type === 'divider') {
					return <div key={`divider-${index}`} className="toolbar-divider"></div>;
				}
				return (
					<button
						key={button.title}
						type="button"
						onClick={button.action}
						disabled={button.disabled}
						className={`toolbar-button ${button.isActive ? 'is-active' : ''} ${button.isRedo ? 'redo-button' : ''}`}
						title={button.title} // Тултип для доступности
					>
						<Image
							src={`/icons/${button.icon}`}
							alt={button.title || ''}
							width={12} 
							height={12}
							// Добавляем класс для переворота иконки Redo
							className={button.isRedo ? 'icon-redo' : ''}
						/>
					</button>
				);
			})}
		</div>
	);
};

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
	value,
	onChange,
	placeholder,
	className = '',
}) => {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit.configure({
				heading: false,
				blockquote: false,
				codeBlock: false,
				code: false,
				strike: false,
			}),
			Placeholder.configure({
				placeholder: placeholder || 'Введите текст...',
			}),
			Underline,
		],
		content: value || '',
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			if (
				html !== value &&
				!(html === '<p></p>' && (value === '' || value === null || value === undefined))
			) {
				onChange(html);
			}
		},
	});

	useEffect(() => {
		if (!editor) {
			return;
		}

		const editorContent = editor.getHTML();

		const isDifferent =
			value !== editorContent &&
			!((value === '' || value === null || value === undefined) && editorContent === '<p></p>');

		if (isDifferent) {
			editor.commands.setContent(value || '', false);
		}
	}, [value, editor]);

	useEffect(() => {
		return () => {
			editor?.destroy();
		};
	}, [editor]);

	return (
		<div className={`tiptap-editor-wrapper ${className}`}>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} className="tiptap-editor-content" />
		</div>
	);
};
