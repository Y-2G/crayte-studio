import { getSession } from '@/lib/auth/session';
import { AdminShell } from './AdminShell';
import '@/styles/admin.css';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  if (!session) {
    // Not authenticated — render children only (login page)
    return <>{children}</>;
  }

  return (
    <AdminShell user={{ displayName: session.displayName, role: session.role }}>
      {children}
    </AdminShell>
  );
}
