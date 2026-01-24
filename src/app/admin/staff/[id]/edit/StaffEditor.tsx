'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Staff, StaffState, Visibility } from '@/types';
import { EditPage } from '@/components/admin/EditPage';
import { MetaBox } from '@/components/admin/MetaBox';
import { InputField, TextareaField, SelectField, RadioField } from '@/components/admin/FormField';
import styles from './StaffEditor.module.css';
import horrorStyles from '@/styles/horror.module.css';

interface StaffEditorProps {
  staff: Staff;
  teams: string[];
}

export function StaffEditor({ staff: initialStaff, teams }: StaffEditorProps) {
  const [staff, setStaff] = useState(initialStaff);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving staff:', staff);
  };

  // Sidebar content
  const sidebar = (
    <>
      {/* State Panel */}
      <MetaBox title="状態" accent>
        <div className={styles.statePanel}>
          <RadioField
            label="在籍状況"
            name="state"
            value={staff.state}
            onChange={(value) => setStaff({ ...staff, state: value as StaffState })}
            options={[
              { value: 'active', label: '在籍' },
              { value: 'suspended', label: '休職' },
              { value: 'missing', label: '不明' },
            ]}
          />

          <RadioField
            label="表示設定"
            name="visibility"
            value={staff.visibility}
            onChange={(value) => setStaff({ ...staff, visibility: value as Visibility })}
            options={[
              { value: 'public', label: '公開' },
              { value: 'private', label: '非公開' },
            ]}
          />

          <div className={styles.saveAction}>
            <button type="button" onClick={handleSave} className={styles.saveButton}>
              更新
            </button>
          </div>
        </div>
      </MetaBox>

      {/* Removal Reason (if applicable) */}
      {(staff.state === 'suspended' || staff.state === 'missing') && (
        <MetaBox title={staff.state === 'missing' ? '⚠ 状態メモ' : '状態メモ'}>
          {staff.state === 'missing' && staff.removedReason && (
            <div className={horrorStyles.warningBox} style={{ marginBottom: '1rem' }}>
              <div className={horrorStyles.title}>行方不明者</div>
              <div className={horrorStyles.message}>{staff.removedReason}</div>
            </div>
          )}
          <TextareaField
            value={staff.removedReason || ''}
            onChange={(e) => setStaff({ ...staff, removedReason: e.target.value })}
            placeholder="休職・不明の理由や備考"
            rows={4}
            help="管理者のみ閲覧可能"
            fullWidth
          />
        </MetaBox>
      )}
    </>
  );

  return (
    <EditPage sidebar={sidebar}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link href="/admin/staff" className={styles.breadcrumbLink}>
          スタッフ一覧
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span>編集</span>
      </div>

      {/* Name */}
      <div className={styles.section}>
        <InputField
          label="名前"
          value={staff.name}
          onChange={(e) => setStaff({ ...staff, name: e.target.value })}
          placeholder="スタッフの名前"
          fullWidth
        />
      </div>

      {/* Role and Team */}
      <div className={styles.infoGrid}>
        <InputField
          label="役職"
          value={staff.role}
          onChange={(e) => setStaff({ ...staff, role: e.target.value })}
          placeholder="例: デザイナー、エンジニア"
        />
        <SelectField
          label="チーム"
          value={staff.team}
          onChange={(e) => setStaff({ ...staff, team: e.target.value })}
        >
          <option value="">チームを選択</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
          <option value="__new__">新規追加...</option>
        </SelectField>
      </div>

      {/* Bio */}
      <div className={styles.section}>
        <TextareaField
          label="自己紹介"
          value={staff.bio}
          onChange={(e) => setStaff({ ...staff, bio: e.target.value })}
          placeholder="スタッフの経歴や専門分野など..."
          rows={8}
          help="公開ページに表示されます"
          fullWidth
        />
      </div>

      {/* Photo URL */}
      <div className={styles.section}>
        <InputField
          label="写真URL"
          type="url"
          value={staff.photo}
          onChange={(e) => setStaff({ ...staff, photo: e.target.value })}
          placeholder="https://example.com/photo.jpg"
          help="プロフィール写真のURL"
          fullWidth
        />
      </div>
    </EditPage>
  );
}
