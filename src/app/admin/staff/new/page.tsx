import { getAllTeams } from '@/lib/data';
import type { Staff } from '@/types';
import { StaffEditor } from '../[id]/edit/StaffEditor';

export default async function NewStaffPage() {
  const teams = await getAllTeams();

  // Create empty staff template
  const emptyStaff: Staff = {
    id: 'new',
    slug: '',
    name: '',
    role: '',
    team: '',
    bio: '',
    photo: '',
    visibility: 'public',
    state: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return <StaffEditor staff={emptyStaff} teams={teams} />;
}
