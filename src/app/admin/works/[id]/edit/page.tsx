import { notFound } from 'next/navigation';
import { getWorkById, getAllWorkTags } from '@/lib/data';
import { WorkEditor } from './WorkEditor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWorkPage({ params }: PageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  const tags = await getAllWorkTags();

  return <WorkEditor work={work} tags={tags} />;
}
