'use client';

import { useState, type FormEvent } from 'react';
import { GradientButton } from '@/components/shared/GradientButton';
import styles from './ContactForm.module.css';

const CATEGORIES = [
  { value: '', label: '選択してください' },
  { value: 'general', label: '一般的なお問い合わせ' },
  { value: 'estimate', label: 'お見積もり・ご相談' },
  { value: 'press', label: 'プレスリリース・取材' },
  { value: 'other', label: 'その他' },
] as const;

interface FormData {
  lastName: string;
  firstName: string;
  email: string;
  company: string;
  phone: string;
  category: string;
  message: string;
  privacy: boolean;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    email: '',
    company: '',
    phone: '',
    category: '',
    message: '',
    privacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.lastName.trim()) {
      newErrors.lastName = '姓を入力してください';
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = '名を入力してください';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    if (!formData.category) {
      newErrors.category = 'お問い合わせ種別を選択してください';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
    }
    if (!formData.privacy) {
      newErrors.privacy = 'プライバシーポリシーへの同意が必要です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
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
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      {/* 姓・名 */}
      <div className={styles.nameRow}>
        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="lastName" className={styles.label}>姓</label>
            <span className={styles.required}>必須</span>
          </div>
          <input
            id="lastName"
            type="text"
            className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="山田"
          />
          {errors.lastName && <span className={styles.errorText} role="alert">{errors.lastName}</span>}
        </div>
        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="firstName" className={styles.label}>名</label>
            <span className={styles.required}>必須</span>
          </div>
          <input
            id="firstName"
            type="text"
            className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="太郎"
          />
          {errors.firstName && <span className={styles.errorText} role="alert">{errors.firstName}</span>}
        </div>
      </div>

      {/* メールアドレス */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="email" className={styles.label}>メールアドレス</label>
          <span className={styles.required}>必須</span>
        </div>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="example@email.com"
        />
        {errors.email && <span className={styles.errorText} role="alert">{errors.email}</span>}
      </div>

      {/* 会社名 */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="company" className={styles.label}>会社名</label>
          <span className={styles.optional}>任意</span>
        </div>
        <input
          id="company"
          type="text"
          className={styles.input}
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="株式会社○○"
        />
      </div>

      {/* 電話番号 */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="phone" className={styles.label}>電話番号</label>
          <span className={styles.optional}>任意</span>
        </div>
        <input
          id="phone"
          type="tel"
          className={styles.input}
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="03-0000-0000"
        />
      </div>

      {/* お問い合わせ種別 */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="category" className={styles.label}>お問い合わせ種別</label>
          <span className={styles.required}>必須</span>
        </div>
        <select
          id="category"
          className={`${styles.select} ${errors.category ? styles.inputError : ''}`}
          value={formData.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && <span className={styles.errorText} role="alert">{errors.category}</span>}
      </div>

      {/* お問い合わせ内容 */}
      <div className={styles.fieldGroup}>
        <div className={styles.labelRow}>
          <label htmlFor="message" className={styles.label}>お問い合わせ内容</label>
          <span className={styles.required}>必須</span>
        </div>
        <textarea
          id="message"
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="お問い合わせ内容をご記入ください"
          rows={8}
        />
        {errors.message && <span className={styles.errorText} role="alert">{errors.message}</span>}
      </div>

      {/* プライバシーポリシー同意 */}
      <div>
        <label className={styles.privacyRow}>
          <input
            type="checkbox"
            className={styles.privacyCheckbox}
            checked={formData.privacy}
            onChange={(e) => handleChange('privacy', e.target.checked)}
          />
          <span className={styles.privacyLabel}>
            <span className={styles.privacyLink}>プライバシーポリシー</span>に同意の上、送信してください。
          </span>
        </label>
        {errors.privacy && <span className={styles.errorText} role="alert">{errors.privacy}</span>}
      </div>

      {/* 送信ボタン */}
      <div className={styles.submitContainer}>
        <GradientButton
          type="submit"
          variant="light"
          size="lg"
          filled
          loading={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? '送信中...' : '送信する'}
        </GradientButton>
      </div>
    </form>
  );
}
