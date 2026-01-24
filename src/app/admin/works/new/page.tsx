import { getAllWorkTags } from '@/lib/data';
import type { Work } from '@/types';
import { WorkEditor } from '../[id]/edit/WorkEditor';

export default async function NewWorkPage() {
  const tags = await getAllWorkTags();

  // Create empty work template
  const emptyWork: Work = {
    id: 'new',
    slug: '',
    title: '',
    description: '',
    client: '',
    venue: '',
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    status: 'planned',
    images: [],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return <WorkEditor work={emptyWork} tags={tags} />;
}
