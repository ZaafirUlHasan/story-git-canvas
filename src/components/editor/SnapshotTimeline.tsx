import { Snapshot } from "@/lib/story-storage";
import { Clock, RotateCcw, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface SnapshotTimelineProps {
  snapshots: Snapshot[];
  selectedId?: string;
  onSelect: (snapshot: Snapshot) => void;
  onRestore: (snapshot: Snapshot) => void;
}

const SnapshotTimeline = ({ snapshots, selectedId, onSelect, onRestore }: SnapshotTimelineProps) => {
  const sorted = [...snapshots].reverse();

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="mb-3 h-8 w-8 text-muted-foreground/50" />
        <p className="font-body text-sm text-muted-foreground">No snapshots yet</p>
        <p className="mt-1 font-body text-xs text-muted-foreground/70">
          Save a snapshot to start tracking your drafts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sorted.map((snap, i) => (
        <div key={snap.id} className="relative flex gap-3 pl-4">
          {/* Timeline line */}
          <div className="absolute left-[1.05rem] top-6 bottom-0 w-px bg-border" style={{ display: i === sorted.length - 1 ? "none" : "block" }} />
          {/* Dot */}
          <div className={cn(
            "relative z-10 mt-1.5 h-3 w-3 shrink-0 rounded-full border-2",
            selectedId === snap.id
              ? "border-primary bg-primary"
              : "border-muted-foreground/40 bg-background"
          )} />
          {/* Content */}
          <button
            onClick={() => onSelect(snap)}
            className={cn(
              "flex-1 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted/50",
              selectedId === snap.id && "bg-muted"
            )}
          >
            <p className="font-body text-sm font-medium text-foreground">{snap.note || "Untitled snapshot"}</p>
            <p className="mt-0.5 font-body text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(snap.createdAt), { addSuffix: true })}
            </p>
          </button>
          {selectedId === snap.id && (
            <Button
              variant="ghost"
              size="icon"
              className="mt-1 h-7 w-7 shrink-0"
              onClick={(e) => { e.stopPropagation(); onRestore(snap); }}
              title="Restore this snapshot"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SnapshotTimeline;
