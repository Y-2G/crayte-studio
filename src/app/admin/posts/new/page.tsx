import { getAllCategories, getAllTags } from '@/lib/data';
import type { Post } from '@/types';
import { PostEditor } from '../[id]/edit/PostEditor';

export default async function NewPostPage() {
  const categories = await getAllCategories();
  const tags = await getAllTags();

  // Create empty post template
  const emptyPost: Post = {
    id: 'new',
    slug: '',
    title: '',
    content: '',
    excerpt: '',
    status: 'draft',
    visibility: 'public',
    category: '',
    tags: [],
    author: 'admin',
    reviewComments: [],
    meta: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return <PostEditor post={emptyPost} categories={categories} tags={tags} />;
}
