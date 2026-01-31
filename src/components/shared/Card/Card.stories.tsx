import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

const meta = {
  title: 'Shared/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'bordered'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'カードのコンテンツです。',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: '影付きのカードです。',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: 'ボーダー付きのカードです。',
  },
};

export const WithSections: Story = {
  render: () => (
    <Card variant="bordered">
      <CardHeader>
        <h3 style={{ margin: 0 }}>カードタイトル</h3>
      </CardHeader>
      <CardBody>
        <p style={{ margin: 0 }}>カードの本文コンテンツがここに入ります。テキストや画像など様々な要素を配置できます。</p>
      </CardBody>
      <CardFooter>
        <button>アクション</button>
      </CardFooter>
    </Card>
  ),
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    variant: 'bordered',
    children: 'パディングなしのカードです。',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card variant="default" padding="md">
        <CardBody>Default</CardBody>
      </Card>
      <Card variant="elevated" padding="md">
        <CardBody>Elevated</CardBody>
      </Card>
      <Card variant="bordered" padding="md">
        <CardBody>Bordered</CardBody>
      </Card>
    </div>
  ),
};
