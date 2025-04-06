'use client';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useToolbar } from './toolbar-provider';
import { TableOfContents } from 'lucide-react';
import React, { ComponentProps } from 'react';

import { TextSelection } from '@tiptap/pm/state';
import { Editor, JSONContent } from '@tiptap/core';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export const ToCItem = ({ item, onItemClick }: { item: any; onItemClick: any }) => {
    return (
        <div
            className={`${item.isActive && !item.isScrolledOver ? 'is-active' : ''} ${
                item.isScrolledOver ? 'is-scrolled-over' : ''
            }`}
            style={
                {
                    '--level': item.level,
                } as React.CSSProperties
            }
        >
            <a href={`#${item.id}`} onClick={(e) => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
                {item.textContent}
            </a>
        </div>
    );
};

export const ToCEmptyState = () => {
    return (
        <div className="empty-state">
            <p>Start editing your document to see the outline.</p>
        </div>
    );
};

export const ToC = ({ items = [], editor }: { items: JSONContent[]; editor: Editor }) => {
    if (items.length === 0) {
        return <ToCEmptyState />;
    }

    const onItemClick = (e: Event, id: string) => {
        e.preventDefault();

        if (editor) {
            const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`);
            const pos = editor.view.posAtDOM(element!, 0);

            // set focus
            const tr = editor.view.state.tr;

            tr.setSelection(new TextSelection(tr.doc.resolve(pos)));

            editor.view.dispatch(tr);

            editor.view.focus();

            if (history.pushState) {
                history.pushState(null, '', `#${id}`);
            }

            window.scrollTo({
                top: element!.getBoundingClientRect().top + window.scrollY,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            {items.map((item, i) => (
                <ToCItem onItemClick={onItemClick} key={item.id} item={item} />
            ))}
        </>
    );
};

const MemorizedToC = React.memo(ToC);

const TableOfContentToolbar = React.forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({ className, onClick, children, ...props }, ref) => {
        const { tableOfContents, editor } = useToolbar();
        return (
            <Tooltip>
                <TooltipTrigger asChild>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn('h-8 w-8 p-0 sm:h-9 sm:w-9', className)}
                                ref={ref}
                                {...props}
                            >
                                <TableOfContents className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Table of Content</SheetTitle>
                                <div className="tiptap-sidebar">
                                    <div className="tiptap-sidebar-options">
                                        <div className="tiptap-table-of-contents">
                                            <MemorizedToC editor={editor} items={tableOfContents as JSONContent[]} />
                                        </div>
                                    </div>
                                </div>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </TooltipTrigger>
                <TooltipContent>
                    <span>Table of Content</span>
                </TooltipContent>
            </Tooltip>
        );
    }
);

TableOfContentToolbar.displayName = 'TableOfContentToolbar';

export { TableOfContentToolbar };
