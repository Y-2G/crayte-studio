'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/shared/Input/Input';
import { Button } from '@/components/shared/Button/Button';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = '件名を入力してください';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successMessage}>
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>送信完了</h3>
        <p className={styles.successText}>
          お問い合わせありがとうございます。
          <br />
          内容を確認の上、担当者よりご連絡させていただきます。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        label="お名前"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        fullWidth
        required
      />

      <Input
        label="メールアドレス"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        error={errors.email}
        fullWidth
        required
      />

      <Input
        label="件名"
        type="text"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        error={errors.subject}
        fullWidth
        required
      />

      <div className={styles.textareaContainer}>
        <label htmlFor="message" className={styles.label}>
          メッセージ <span className={styles.required}>*</span>
        </label>
        <textarea
          id="message"
          className={`${styles.textarea} ${errors.message ? styles.textareaError : ''}`}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={8}
          required
        />
        {errors.message && (
          <span className={styles.errorText} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <div className={styles.submitContainer}>
        <Button type="submit" variant="primary" size="lg" loading={isSubmitting} disabled={isSubmitting}>
          送信する
        </Button>
      </div>
    </form>
  );
}
