import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getInboxMessageById, getAllInboxMessages } from '@/lib/data';
import { InboxDetail } from './InboxDetail';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const message = await getInboxMessageById(id);

  if (!message) {
    return { title: 'メッセージが見つかりません' };
  }

  return {
    title: `${message.subject} - 受信箱`,
  };
}

export default async function InboxDetailPage({ params }: PageProps) {
  const { id } = await params;
  const message = await getInboxMessageById(id);

  if (!message) {
    notFound();
  }

  const allMessages = await getAllInboxMessages();
  const currentIndex = allMessages.findIndex((m) => m.id === id);
  const prevMessage = currentIndex > 0 ? allMessages[currentIndex - 1] : null;
  const nextMessage =
    currentIndex < allMessages.length - 1 ? allMessages[currentIndex + 1] : null;

  return (
    <InboxDetail
      message={message}
      prevMessageId={prevMessage?.id ?? null}
      nextMessageId={nextMessage?.id ?? null}
    />
  );
}
