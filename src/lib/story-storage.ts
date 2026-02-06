export interface Snapshot {
  id: string;
  title: string;
  content: string;
  note: string;
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  snapshots: Snapshot[];
  createdAt: string;
  updatedAt: string;
}

const STORIES_KEY = "inkflow_stories";

function getStories(): Story[] {
  try {
    const raw = localStorage.getItem(STORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStories(stories: Story[]) {
  localStorage.setItem(STORIES_KEY, JSON.stringify(stories));
}

export function listStories(): Story[] {
  return getStories().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getStory(id: string): Story | undefined {
  return getStories().find((s) => s.id === id);
}

export function createStory(title: string): Story {
  const story: Story = {
    id: crypto.randomUUID(),
    title,
    content: "",
    snapshots: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const stories = getStories();
  stories.push(story);
  saveStories(stories);
  return story;
}

export function updateStory(id: string, updates: Partial<Pick<Story, "title" | "content">>): Story | undefined {
  const stories = getStories();
  const idx = stories.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  stories[idx] = { ...stories[idx], ...updates, updatedAt: new Date().toISOString() };
  saveStories(stories);
  return stories[idx];
}

export function deleteStory(id: string) {
  saveStories(getStories().filter((s) => s.id !== id));
}

export function saveSnapshot(storyId: string, note: string): Snapshot | undefined {
  const stories = getStories();
  const idx = stories.findIndex((s) => s.id === storyId);
  if (idx === -1) return undefined;
  const story = stories[idx];
  const snapshot: Snapshot = {
    id: crypto.randomUUID(),
    title: story.title,
    content: story.content,
    note,
    createdAt: new Date().toISOString(),
  };
  story.snapshots.push(snapshot);
  story.updatedAt = new Date().toISOString();
  saveStories(stories);
  return snapshot;
}

export function restoreSnapshot(storyId: string, snapshotId: string): Story | undefined {
  const stories = getStories();
  const idx = stories.findIndex((s) => s.id === storyId);
  if (idx === -1) return undefined;
  const snapshot = stories[idx].snapshots.find((s) => s.id === snapshotId);
  if (!snapshot) return undefined;
  stories[idx].content = snapshot.content;
  stories[idx].updatedAt = new Date().toISOString();
  saveStories(stories);
  return stories[idx];
}
