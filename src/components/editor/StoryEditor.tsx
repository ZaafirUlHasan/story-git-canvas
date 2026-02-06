import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect } from "react";
import EditorToolbar from "./EditorToolbar";

interface StoryEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const StoryEditor = ({ content, onChange }: StoryEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Begin your story…" }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-stone max-w-none min-h-[60vh] px-8 py-6 font-body text-foreground outline-none focus:outline-none",
      },
    },
  });

  // Sync content from outside (e.g. snapshot restore)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false as any);
    }
  }, [content, editor]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default StoryEditor;
