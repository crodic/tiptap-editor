'use client';
import './tiptap.css';
import { cn } from '@/lib/utils';
import { ImageExtension } from '@/components/tiptap/extensions/image';
import { ImagePlaceholder } from '@/components/tiptap/extensions/image-placeholder';
import SearchAndReplace from '@/components/tiptap/extensions/search-and-replace';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TipTapFloatingMenu } from '@/components/tiptap/extensions/floating-menu';
import { EditorToolbar } from './toolbars/editor-toolbar';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents';
import { useState } from 'react';
import { Indent } from './extensions/indent';

export function RichTextEditorDemo({ className }: { className?: string }) {
    const [items, setItems] = useState<Content>('');
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc',
                    },
                },
                heading: {
                    levels: [1, 2, 3, 4],
                },
            }),
            Placeholder.configure({
                emptyNodeClass: 'is-editor-empty',
                placeholder: ({ node }) => {
                    switch (node.type.name) {
                        case 'heading':
                            return `Heading ${node.attrs.level}`;
                        case 'detailsSummary':
                            return 'Section title';
                        case 'codeBlock':
                            // never show the placeholder when editing code
                            return '';
                        default:
                            return 'Enter some rich text...';
                    }
                },
                includeChildren: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            TextStyle,
            Subscript,
            Superscript,
            Underline,
            Link,
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            ImageExtension.configure({
                inline: true,
            }),
            ImagePlaceholder,
            SearchAndReplace,
            Typography,
            Youtube.configure({
                nocookie: true,
                width: 640,
                height: 360,
            }),
            CharacterCount,
            TableOfContents.configure({
                getIndex: getHierarchicalIndexes,
                onUpdate(content) {
                    setItems(content);
                },
            }),
            Indent,
        ],
        content: '',
        autofocus: true,
        editorProps: {
            attributes: {
                class: 'max-w-full focus:outline-none',
            },
        },
        onUpdate: ({ editor }) => {
            // do what you want to do with output
            // Update stats
            // saving as text/json/hmtml
            // const text = editor.getHTML();
            // console.log(editor.getText());
        },
    });

    if (!editor) return null;

    return (
        <div className="flex flex-col w-full">
            <div
                className={cn(
                    'relative max-h-[calc(100dvh-6rem)] w-full overflow-hidden overflow-y-scroll border bg-card pb-[60px] sm:pb-0',
                    className
                )}
            >
                <EditorToolbar editor={editor} tableOfContents={items} />
                <TipTapFloatingMenu editor={editor} />
                <EditorContent editor={editor} className="min-h-[600px] w-full min-w-full cursor-text sm:p-6" />
            </div>
            <div className="bg-accent px-4 py-2 text-sm text-accent-foreground">
                {editor.storage.characterCount.characters()} characters
            </div>
        </div>
    );
}
