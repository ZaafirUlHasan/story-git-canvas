import { Snapshot } from "@/lib/story-storage";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SnapshotDiffProps {
  snapshot: Snapshot;
  currentContent: string;
  onClose: () => void;
}

const SnapshotDiff = ({ snapshot, currentContent, onClose }: SnapshotDiffProps) => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
        <h3 className="font-body text-sm font-medium text-foreground">
          Comparing: <span className="text-primary">{snapshot.note || "Untitled"}</span> vs Current
        </h3>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid flex-1 grid-cols-2 divide-x divide-border overflow-hidden">
        <div className="overflow-y-auto">
          <div className="border-b border-border bg-muted/20 px-4 py-1.5">
            <span className="font-body text-xs font-medium text-muted-foreground">Snapshot</span>
          </div>
          <div
            className="prose prose-stone max-w-none px-6 py-4 font-body text-sm text-foreground"
            dangerouslySetInnerHTML={{ __html: snapshot.content || "<p><em>Empty</em></p>" }}
          />
        </div>
        <div className="overflow-y-auto">
          <div className="border-b border-border bg-muted/20 px-4 py-1.5">
            <span className="font-body text-xs font-medium text-muted-foreground">Current</span>
          </div>
          <div
            className="prose prose-stone max-w-none px-6 py-4 font-body text-sm text-foreground"
            dangerouslySetInnerHTML={{ __html: currentContent || "<p><em>Empty</em></p>" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SnapshotDiff;
