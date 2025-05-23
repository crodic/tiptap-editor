import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ToolbarProvider } from './toolbar-provider';
import { Content, Editor } from '@tiptap/core';
import { UndoToolbar } from './undo';
import { RedoToolbar } from './redo';
import { HeadingsToolbar } from './headings';
import { BlockquoteToolbar } from './blockquote';
import { CodeToolbar } from './code';
import { BoldToolbar } from './bold';
import { ItalicToolbar } from './italic';
import { UnderlineToolbar } from './underline';
import { StrikeThroughToolbar } from './strikethrough';
import { LinkToolbar } from './link';
import { BulletListToolbar } from './bullet-list';
import { OrderedListToolbar } from './ordered-list';
import { HorizontalRuleToolbar } from './horizontal-rule';
import { AlignmentToolbar } from './alignment';
import { ImagePlaceholderToolbar } from './image-placeholder-toolbar';
import { ColorHighlightToolbar } from './color-and-highlight';
import { SearchAndReplaceToolbar } from './search-and-replace-toolbar';
import { CodeBlockToolbar } from './code-block';
import { YoutubeToolbar } from './youtube';
import { TableOfContentToolbar } from './table-of-content';

export const EditorToolbar = ({ editor, tableOfContents }: { editor: Editor; tableOfContents?: Content }) => {
    return (
        <div className="sticky top-0 z-20 w-full border-b bg-background">
            <ToolbarProvider editor={editor} tableOfContents={tableOfContents}>
                <TooltipProvider>
                    <ScrollArea className="h-fit py-0.5">
                        <div>
                            <div className="flex items-center gap-1 px-2">
                                {/* History Group */}
                                <TableOfContentToolbar />
                                <UndoToolbar />
                                <RedoToolbar />
                                <Separator orientation="vertical" className="mx-1 !h-7" />

                                {/* Text Structure Group */}
                                <HeadingsToolbar />
                                <BlockquoteToolbar />
                                <CodeToolbar />
                                <CodeBlockToolbar />
                                <Separator orientation="vertical" className="mx-1 !h-7" />

                                {/* Basic Formatting Group */}
                                <BoldToolbar />
                                <ItalicToolbar />
                                <UnderlineToolbar />
                                <StrikeThroughToolbar />
                                <LinkToolbar />
                                <YoutubeToolbar />
                                <Separator orientation="vertical" className="mx-1 !h-7" />

                                {/* Lists & Structure Group */}
                                <BulletListToolbar />
                                <OrderedListToolbar />
                                <HorizontalRuleToolbar />
                                <Separator orientation="vertical" className="mx-1 !h-7" />

                                {/* Alignment Group */}
                                <AlignmentToolbar />
                                <Separator orientation="vertical" className="mx-1 !h-7" />

                                {/* Media & Styling Group */}
                                <ImagePlaceholderToolbar />
                                <ColorHighlightToolbar />
                                <Separator orientation="vertical" className="mx-1 !h-7" />

                                <div className="flex-1" />

                                {/* Utility Group */}
                                <SearchAndReplaceToolbar />
                            </div>
                        </div>
                        <ScrollBar className="hidden" orientation="horizontal" />
                    </ScrollArea>
                </TooltipProvider>
            </ToolbarProvider>
        </div>
    );
};
