'use client';

import { useState } from 'react';
import { MetaBox } from '@/components/admin/MetaBox';
import { Badge } from '@/components/shared/Badge';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { type Comment } from '@/types/entities';
import horrorStyles from '@/styles/horror.module.css';
import styles from './CommentsSection.module.css';

interface CommentsSectionProps {
  /** Comments to display */
  comments: Comment[];
  /** Parent post ID */
  postId: string;
}

/**
 * Comments section for post editor
 *
 * Displays existing comments with moderation status badges and horror detection.
 * Includes a form for adding new comments (UI only, no actual submission).
 */
export function CommentsSection({ comments, postId }: CommentsSectionProps) {
  const [newAuthor, setNewAuthor] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContent, setNewContent] = useState('');

  /**
   * Detect horror elements in a comment
   */
  const isHorrorComment = (comment: Comment): boolean => {
    // Author name contains "？"
    if (comment.author.includes('？')) return true;
    // Email contains "void@"
    if (comment.email.includes('void@')) return true;
    // Content contains horror keywords
    const horrorKeywords = ['封印', '公開してはならない', '書き換え', '逃げて'];
    if (horrorKeywords.some((keyword) => comment.content.includes(keyword))) return true;

    return false;
  };

  /**
   * Format timestamp to Japanese date string
   */
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  /**
   * Get badge variant for comment status
   */
  const getStatusBadgeVariant = (
    status: Comment['status']
  ): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'spam':
        return 'error';
      case 'trash':
        return 'default';
      default:
        return 'default';
    }
  };

  /**
   * Get badge label for comment status
   */
  const getStatusLabel = (status: Comment['status']): string => {
    switch (status) {
      case 'approved':
        return '承認済み';
      case 'pending':
        return '保留中';
      case 'spam':
        return 'スパム';
      case 'trash':
        return 'ゴミ箱';
      default:
        return status;
    }
  };

  /**
   * Handle add comment (UI only)
   */
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment = {
      id: `comment-temp-${Date.now()}`,
      postId,
      author: newAuthor,
      email: newEmail,
      content: newContent,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };
    console.log('コメント追加:', newComment);
    // Reset form
    setNewAuthor('');
    setNewEmail('');
    setNewContent('');
  };

  return (
    <MetaBox title="コメント" defaultCollapsed={false}>
      <div className={styles.container}>
        {/* Comments list */}
        {comments.length === 0 ? (
          <p className={styles.empty}>コメントはまだありません</p>
        ) : (
          <ul className={styles.commentList}>
            {comments.map((comment) => {
              const isHorror = isHorrorComment(comment);
              return (
                <li
                  key={comment.id}
                  className={`${styles.comment} ${isHorror ? horrorStyles.horrorReviewComment : ''}`}
                >
                  <div className={styles.commentHeader}>
                    <div className={styles.commentMeta}>
                      <span className={styles.author}>{comment.author}</span>
                      <span className={styles.email}>{comment.email}</span>
                    </div>
                    <Badge variant={getStatusBadgeVariant(comment.status)} size="sm">
                      {getStatusLabel(comment.status)}
                    </Badge>
                  </div>
                  <p className={styles.commentContent}>{comment.content}</p>
                  <time className={styles.commentDate} dateTime={comment.createdAt}>
                    {formatDate(comment.createdAt)}
                  </time>
                </li>
              );
            })}
          </ul>
        )}

        {/* Add comment form */}
        <form className={styles.form} onSubmit={handleAddComment}>
          <h4 className={styles.formTitle}>新しいコメントを追加</h4>
          <Input
            label="著者名"
            type="text"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            required
            fullWidth
          />
          <Input
            label="メールアドレス"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            fullWidth
          />
          <div className={styles.textareaWrapper}>
            <label htmlFor="comment-content" className={styles.textareaLabel}>
              コメント内容
            </label>
            <textarea
              id="comment-content"
              className={styles.textarea}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
              rows={4}
            />
          </div>
          <Button type="submit" variant="primary" size="sm">
            コメント追加
          </Button>
        </form>
      </div>
    </MetaBox>
  );
}
