import * as fs from 'node:fs';
import * as path from 'node:path';

interface StoryIndexEntry {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
}

interface StoryIndex {
  v: number;
  entries: Record<string, StoryIndexEntry>;
}

export interface StoryInfo {
  id: string;
  title: string;
  name: string;
}

const EXCLUDED_STORIES: string[] = [
  'public-herovideo--default',
  // StatsCounter uses JS-driven counter animation (requestAnimationFrame)
  // that produces non-deterministic renders between runs
  'public-statscounter--two-stats',
];

export function discoverStories(): StoryInfo[] {
  const indexPath = path.resolve('storybook-static/index.json');

  if (!fs.existsSync(indexPath)) {
    throw new Error(
      `Storybook index not found at ${indexPath}. Run "yarn build-storybook" first.`
    );
  }

  const raw = fs.readFileSync(indexPath, 'utf-8');
  const index: StoryIndex = JSON.parse(raw);

  return Object.values(index.entries)
    .filter((entry) => entry.type === 'story')
    .filter((entry) => !EXCLUDED_STORIES.includes(entry.id))
    .map(({ id, title, name }) => ({ id, title, name }));
}

export function storyUrl(storyId: string): string {
  return `/iframe.html?id=${storyId}&viewMode=story`;
}
