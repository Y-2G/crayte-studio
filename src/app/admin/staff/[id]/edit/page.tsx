import { notFound } from 'next/navigation';
import { getStaffById, getAllTeams } from '@/lib/data';
import { StaffEditor } from './StaffEditor';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStaffPage({ params }: PageProps) {
  const { id } = await params;
  const staff = await getStaffById(id);

  if (!staff) {
    notFound();
  }

  const teams = await getAllTeams();

  return <StaffEditor staff={staff} teams={teams} />;
}
