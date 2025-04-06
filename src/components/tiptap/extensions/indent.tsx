import { Extension } from '@tiptap/core';

type IndentOptions = {
    /**
     * @default ["paragraph", "heading"]
     */
    types: string[];
    /**
     * Amount of margin to increase and decrease the indent
     *
     * @default 40
     */
    margin: number;
};

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        indent: {
            indent: () => ReturnType;
            outdent: () => ReturnType;
        };
    }
}

export const Indent = Extension.create<IndentOptions>({
    name: 'indent',

    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            margin: 40,
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: 0,
                        renderHTML: (attrs) => ({
                            style: `margin-left: ${(attrs.indent || 0) * this.options.margin}px`,
                        }),
                        parseHTML: (attrs) => parseInt(attrs.style.marginLeft) || 0,
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            indent:
                () =>
                ({ editor, chain, commands }) => {
                    // Check for a list
                    if (
                        editor.isActive('listItem') ||
                        editor.isActive('bulletList') ||
                        editor.isActive('orderedList')
                    ) {
                        return chain().sinkListItem('listItem').run();
                    }

                    return this.options.types
                        .map((type) => {
                            const attrs = editor.getAttributes(type).indent;
                            const indent = (attrs || 0) + 1;
                            return commands.updateAttributes(type, { indent });
                        })
                        .every(Boolean);
                },
            outdent:
                () =>
                ({ editor, chain, commands }) => {
                    // Check for a list
                    if (
                        editor.isActive('listItem') ||
                        editor.isActive('bulletList') ||
                        editor.isActive('orderedList')
                    ) {
                        return chain().liftListItem('listItem').run();
                    }

                    const result = this.options.types
                        .filter((type) => {
                            const attrs = editor.getAttributes(type).indent;
                            return attrs > 0;
                        })
                        .map((type) => {
                            const attrs = editor.getAttributes(type).indent;
                            const indent = (attrs || 0) - 1;
                            return commands.updateAttributes(type, { indent });
                        });
                    return result.every(Boolean) && result.length > 0;
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            Tab: ({ editor }) => {
                return editor.commands.indent();
            },
            'Shift-Tab': ({ editor }) => {
                return editor.commands.outdent();
            },
            Backspace: ({ editor }) => {
                const { selection } = editor.state;

                // Make sure we are at the start of the node
                if (selection.$anchor.parentOffset > 0 || selection.from !== selection.to) {
                    return false;
                }

                return editor.commands.outdent();
            },
        };
    },
});
