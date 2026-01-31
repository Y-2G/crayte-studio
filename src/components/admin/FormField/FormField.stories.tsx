import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';
import { InputField, TextareaField, SelectField, CheckboxField, RadioField } from './FormField';

// InputField stories
const inputMeta = {
  title: 'Admin/FormField/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    onChange: fn(),
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputField>;

export default inputMeta;
type InputStory = StoryObj<typeof inputMeta>;

export const Default: InputStory = {
  args: {
    label: 'タイトル',
    placeholder: '投稿タイトルを入力',
  },
};

export const WithHelp: InputStory = {
  args: {
    label: 'スラッグ',
    placeholder: 'post-slug',
    help: 'URLに使用される識別子です',
  },
};

export const WithError: InputStory = {
  args: {
    label: 'メールアドレス',
    type: 'email',
    value: 'invalid',
    error: '有効なメールアドレスを入力してください',
  },
};

export const DateInput: InputStory = {
  args: {
    label: '公開日',
    type: 'date',
  },
};

// TextareaField Story
export const TextareaDefault: StoryObj<typeof TextareaField> = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <TextareaField
        label="本文"
        placeholder="記事の本文を入力してください"
        rows={8}
      />
    </div>
  ),
};

export const TextareaWithError: StoryObj<typeof TextareaField> = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <TextareaField
        label="概要"
        error="概要を入力してください"
      />
    </div>
  ),
};

// SelectField Story
export const SelectDefault: StoryObj<typeof SelectField> = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <SelectField label="カテゴリ" help="投稿のカテゴリを選択してください">
        <option value="">選択してください</option>
        <option value="news">ニュース</option>
        <option value="blog">ブログ</option>
        <option value="announcement">お知らせ</option>
      </SelectField>
    </div>
  ),
};

// CheckboxField Story
export const CheckboxDefault: StoryObj<typeof CheckboxField> = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CheckboxField label="公開する" />
    </div>
  ),
};

export const CheckboxWithHelp: StoryObj<typeof CheckboxField> = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CheckboxField
        label="コメントを許可する"
        help="この投稿にコメントを受け付けます"
      />
    </div>
  ),
};

// RadioField Story
export const RadioDefault: StoryObj<typeof RadioField> = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <RadioField
        label="公開状態"
        name="status"
        options={[
          { value: 'draft', label: '下書き' },
          { value: 'pending', label: 'レビュー待ち' },
          { value: 'publish', label: '公開' },
        ]}
        value="draft"
        onChange={fn()}
      />
    </div>
  ),
};

// All fields combined
export const AllFields: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <InputField label="タイトル" placeholder="投稿タイトル" />
      <InputField label="スラッグ" placeholder="post-slug" help="URLに使用されます" />
      <TextareaField label="本文" placeholder="記事の本文" rows={5} />
      <SelectField label="カテゴリ">
        <option value="">選択してください</option>
        <option value="news">ニュース</option>
        <option value="blog">ブログ</option>
      </SelectField>
      <RadioField
        label="ステータス"
        name="status"
        options={[
          { value: 'draft', label: '下書き' },
          { value: 'publish', label: '公開' },
        ]}
        value="draft"
      />
      <CheckboxField label="コメントを許可する" />
    </div>
  ),
};
