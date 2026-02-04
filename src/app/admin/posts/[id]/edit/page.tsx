import { notFound } from 'next/navigation';
import { getPostById, getAllCategories, getAllTags } from '@/lib/data';
import type { Comment } from '@/types/entities';
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

  const [categories, tags] = await Promise.all([
    getAllCategories(),
    getAllTags(),
  ]);

  // コメントは投稿データに含まれている
  const comments: Comment[] = 'comments' in post && Array.isArray(post.comments) ? post.comments : [];

  return <PostEditor post={post} categories={categories} tags={tags} comments={comments} />;
}
