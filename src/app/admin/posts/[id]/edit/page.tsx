import { notFound } from 'next/navigation';
import { getPostById, getAllCategories, getAllTags } from '@/lib/data';
import { PostEditor } from './PostEditor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const categories = await getAllCategories();
  const tags = await getAllTags();

  return <PostEditor post={post} categories={categories} tags={tags} />;
}
