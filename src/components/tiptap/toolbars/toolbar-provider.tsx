'use client';

import type { Content, Editor } from '@tiptap/react';
import React from 'react';

export interface ToolbarContextProps {
    editor: Editor;
    tableOfContents?: Content;
}

export const ToolbarContext = React.createContext<ToolbarContextProps | null>(null);

interface ToolbarProviderProps {
    editor: Editor;
    tableOfContents?: Content;
    children: React.ReactNode;
}

export const ToolbarProvider = ({ editor, children, tableOfContents }: ToolbarProviderProps) => {
    return <ToolbarContext.Provider value={{ editor, tableOfContents }}>{children}</ToolbarContext.Provider>;
};

export const useToolbar = () => {
    const context = React.useContext(ToolbarContext);

    if (!context) {
        throw new Error('useToolbar must be used within a ToolbarProvider');
    }

    return context;
};
