import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Plus, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { listStories, createStory, deleteStory, Story } from "@/lib/story-storage";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Stories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>(listStories);
  const [newOpen, setNewOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleCreate = () => {
    const story = createStory(newTitle || "Untitled Story");
    setNewTitle("");
    setNewOpen(false);
    navigate(`/editor/${story.id}`);
  };

  const handleDelete = (id: string) => {
    deleteStory(id);
    setStories(listStories());
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <BookOpen className="h-6 w-6 text-primary" />
            Inkflow
          </a>
          <Button size="sm" className="gap-1.5 rounded-full" onClick={() => setNewOpen(true)}>
            <Plus className="h-4 w-4" /> New story
          </Button>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Your Stories</h1>

        {stories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="mb-2 font-body text-lg text-muted-foreground">No stories yet</p>
            <p className="mb-6 font-body text-sm text-muted-foreground/70">Create your first story to get started</p>
            <Button onClick={() => setNewOpen(true)} className="gap-1.5 rounded-full">
              <Plus className="h-4 w-4" /> Create story
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card
                key={story.id}
                className="group cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => navigate(`/editor/${story.id}`)}
              >
                <CardContent className="flex flex-col p-5">
                  <h3 className="mb-1 font-display text-lg font-semibold text-foreground">{story.title}</h3>
                  <p className="mb-3 font-body text-xs text-muted-foreground">
                    Edited {formatDistanceToNow(new Date(story.updatedAt), { addSuffix: true })}
                    {" · "}{story.snapshots.length} snapshot{story.snapshots.length !== 1 ? "s" : ""}
                  </p>
                  <div
                    className="mb-4 line-clamp-3 font-body text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: story.content || "<em>Empty story</em>",
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(story.id);
                    }}
                    title="Delete story"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">New Story</DialogTitle>
            <DialogDescription className="font-body">Give your story a title to get started.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="e.g. The Lighthouse Keeper"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Stories;
