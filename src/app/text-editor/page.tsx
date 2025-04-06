import { RichTextEditorDemo } from '@/components/tiptap/rich-text-editor';

export default function Page() {
    return (
        <div className="mx-auto w-full container flex flex-col justify-center items-center py-5 px-10">
            <RichTextEditorDemo className="w-full" />
        </div>
    );
}
