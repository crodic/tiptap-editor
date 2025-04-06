'use client';
/* eslint-disable */
// @ts-nocheck
import { PopoverClose } from '@radix-ui/react-popover';
import { X, YoutubeIcon } from 'lucide-react';

import React, { ComponentProps, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToolbar } from './toolbar-provider';
import { getYoutubeUrl } from '@/lib/tiptap-utils';

const YoutubeToolbar = React.forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
    ({ className, ...props }, ref) => {
        const { editor } = useToolbar();
        const defaultConfig = editor?.options.extensions.find((ext) => ext.name === 'youtube')?.options ?? {};
        const [ytbLink, setYtbLink] = React.useState('');
        const [width, setWidth] = React.useState(defaultConfig.width ?? 640);
        const [height, setHeight] = React.useState(defaultConfig.height ?? 360);

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            const url = getYoutubeUrl(ytbLink);
            url && editor?.chain().focus().setYoutubeVideo({ src: url, width, height }).run();
            setYtbLink('');
            setWidth(defaultConfig.width ?? 640);
            setHeight(defaultConfig.height ?? 360);
        };

        return (
            <Popover onOpenChange={(open) => open && setYtbLink(editor?.getAttributes('youtube').src ?? '')}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <PopoverTrigger
                            disabled={
                                !editor
                                    .can()
                                    .chain()
                                    .setYoutubeVideo({ src: 'https://www.youtube.com/watch?v=schUboEshFE' })
                                    .run()
                            }
                            asChild
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    'h-8 w-max px-3 font-normal',
                                    editor?.isActive('youtube') && 'bg-accent',
                                    className
                                )}
                                ref={ref}
                                {...props}
                            >
                                <YoutubeIcon className="size-4" />
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>Youtube Video</span>
                    </TooltipContent>
                </Tooltip>

                <PopoverContent
                    onCloseAutoFocus={(e) => {
                        e.preventDefault();
                    }}
                    asChild
                    className="relative px-3 py-2.5"
                >
                    <div className="relative">
                        <PopoverClose className="absolute right-3 top-3">
                            <X className="h-4 w-4" />
                        </PopoverClose>
                        <form onSubmit={handleSubmit}>
                            <Label>Youtube</Label>
                            <p className="text-sm text-gray-11">Attach a link to the selected text</p>
                            <div className="mt-3 flex flex-col items-end justify-end gap-3">
                                <Input
                                    value={ytbLink}
                                    onChange={(e) => {
                                        setYtbLink(e.target.value);
                                    }}
                                    className="w-full"
                                    placeholder="https://youtube.com/watch?v=..."
                                />
                                <div className="flex gap-3 items-center justify-between">
                                    <div className="space-y-1">
                                        <Label>Width</Label>
                                        <Input
                                            type="number"
                                            value={width}
                                            onChange={(e) => {
                                                setWidth(parseInt(e.target.value));
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Height</Label>
                                        <Input
                                            type="number"
                                            value={height}
                                            onChange={(e) => {
                                                setHeight(parseInt(e.target.value));
                                            }}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Button size="sm" className="h-8">
                                        {editor?.getAttributes('link').href ? 'Update' : 'Confirm'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
);

YoutubeToolbar.displayName = 'YoutubeToolbar';

export { YoutubeToolbar };
