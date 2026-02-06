import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SaveSnapshotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (note: string) => void;
}

const SaveSnapshotDialog = ({ open, onOpenChange, onSave }: SaveSnapshotDialogProps) => {
  const [note, setNote] = useState("");

  const handleSave = () => {
    onSave(note || "Untitled snapshot");
    setNote("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Save Snapshot</DialogTitle>
          <DialogDescription className="font-body">
            Give this version a short description so you can find it later.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="e.g. Finished chapter 3 rewrite"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save snapshot</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveSnapshotDialog;
