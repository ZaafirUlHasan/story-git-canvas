import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BookOpen, Save, ChevronLeft, PanelRightOpen, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import StoryEditor from "@/components/editor/StoryEditor";
import SnapshotTimeline from "@/components/editor/SnapshotTimeline";
import SnapshotDiff from "@/components/editor/SnapshotDiff";
import SaveSnapshotDialog from "@/components/editor/SaveSnapshotDialog";
import {
  getStory,
  updateStory,
  saveSnapshot,
  restoreSnapshot,
  Snapshot,
} from "@/lib/story-storage";

const EditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState(() => (id ? getStory(id) : undefined));
  const [content, setContent] = useState(story?.content ?? "");
  const [title, setTitle] = useState(story?.title ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [snapshotDialogOpen, setSnapshotDialogOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [diffSnapshot, setDiffSnapshot] = useState<Snapshot | null>(null);

  useEffect(() => {
    if (!story) navigate("/stories", { replace: true });
  }, [story, navigate]);

  // Autosave on content/title change
  useEffect(() => {
    if (!id) return;
    const timer = setTimeout(() => {
      updateStory(id, { content, title });
    }, 800);
    return () => clearTimeout(timer);
  }, [content, title, id]);

  const handleSaveSnapshot = useCallback(
    (note: string) => {
      if (!id) return;
      saveSnapshot(id, note);
      setStory(getStory(id));
      toast({ title: "Snapshot saved", description: note });
    },
    [id]
  );

  const handleRestore = useCallback(
    (snap: Snapshot) => {
      if (!id) return;
      const updated = restoreSnapshot(id, snap.id);
      if (updated) {
        setContent(updated.content);
        setStory(updated);
        setSelectedSnapshot(null);
        setDiffSnapshot(null);
        toast({ title: "Snapshot restored" });
      }
    },
    [id]
  );

  const handleSelectSnapshot = useCallback((snap: Snapshot) => {
    setSelectedSnapshot((prev) => (prev?.id === snap.id ? null : snap));
    setDiffSnapshot(null);
  }, []);

  if (!story) return null;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="flex items-center gap-3 border-b border-border px-4 py-2">
        <Link to="/stories" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          <BookOpen className="h-5 w-5 text-primary" />
        </Link>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="max-w-xs border-none bg-transparent font-display text-lg font-semibold shadow-none focus-visible:ring-0"
          placeholder="Untitled story"
        />
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setSnapshotDialogOpen(true)}
          >
            <Save className="h-3.5 w-3.5" /> Save snapshot
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Hide timeline" : "Show timeline"}
          >
            {sidebarOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Editor + Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col p-4">
          {diffSnapshot ? (
            <SnapshotDiff
              snapshot={diffSnapshot}
              currentContent={content}
              onClose={() => setDiffSnapshot(null)}
            />
          ) : (
            <StoryEditor content={content} onChange={setContent} />
          )}
        </div>

        {sidebarOpen && (
          <aside className="w-72 shrink-0 overflow-y-auto border-l border-border bg-muted/20 px-3 py-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-sm font-semibold text-foreground">Version Timeline</h2>
            </div>
            <SnapshotTimeline
              snapshots={story.snapshots}
              selectedId={selectedSnapshot?.id}
              onSelect={handleSelectSnapshot}
              onRestore={handleRestore}
            />
            {selectedSnapshot && (
              <div className="mt-3 px-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full gap-1.5 text-xs"
                  onClick={() => setDiffSnapshot(selectedSnapshot)}
                >
                  Compare with current
                </Button>
              </div>
            )}
          </aside>
        )}
      </div>

      <SaveSnapshotDialog
        open={snapshotDialogOpen}
        onOpenChange={setSnapshotDialogOpen}
        onSave={handleSaveSnapshot}
      />
    </div>
  );
};

export default EditorPage;
