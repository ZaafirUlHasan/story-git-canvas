import { Editor } from "@tiptap/react";
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Undo, Redo, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const items = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold"), label: "Bold" },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic"), label: "Italic" },
    { type: "separator" as const },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }), label: "Heading 1" },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }), label: "Heading 2" },
    { type: "separator" as const },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList"), label: "Bullet list" },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList"), label: "Ordered list" },
    { icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run(), active: false, label: "Divider" },
    { type: "separator" as const },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, label: "Undo" },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, label: "Redo" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 px-3 py-2">
      {items.map((item, i) =>
        "type" in item ? (
          <div key={i} className="mx-1 h-5 w-px bg-border" />
        ) : (
          <Button
            key={i}
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", item.active && "bg-accent text-accent-foreground")}
            onClick={item.action}
            title={item.label}
            type="button"
          >
            <item.icon className="h-4 w-4" />
          </Button>
        )
      )}
    </div>
  );
};

export default EditorToolbar;
