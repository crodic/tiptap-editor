import { type Editor } from '@tiptap/core';

export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME = 'node-handles-selected-style';

export function isValidUrl(url: string) {
    return /^https?:\/\/\S+$/.test(url);
}

export const duplicateContent = (editor: Editor) => {
    const { view } = editor;
    const { state } = view;
    const { selection } = state;

    editor
        .chain()
        .insertContentAt(
            selection.to,

            // @ts-nocheck
            selection.content().content.firstChild?.toJSON(),
            {
                updateSelection: true,
            }
        )
        .focus(selection.to)
        .run();
};

export function getUrlFromString(str: string) {
    if (isValidUrl(str)) {
        return str;
    }
    try {
        if (str.includes('.') && !str.includes(' ')) {
            return new URL(`https://${str}`).toString();
        }
    } catch {
        return null;
    }
}

export function absoluteUrl(path: string) {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getYoutubeUrl(url: string) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? `https://www.youtube.com/embed/${match[7]}` : null;
}
