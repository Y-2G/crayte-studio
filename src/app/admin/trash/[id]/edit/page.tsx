import { notFound } from 'next/navigation';
import { getTrashItemById } from '@/lib/data';
import { TrashEditor } from './TrashEditor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTrashPage({ params }: PageProps) {
  const { id } = await params;
  const item = getTrashItemById(id);

  if (!item) {
    notFound();
  }

  return <TrashEditor item={item} />;
}
