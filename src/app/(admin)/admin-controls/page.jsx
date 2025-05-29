import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import MsgShower from '@/components/MsgShower';
import Link from 'next/link';
import MenuItem from '@/components/MenuItem';
import { MdCategory, MdNewspaper } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';

export default async function AdminControls() {
  const session = await getServerSession(authOptions);
  console.log('session data', session);

  if (session?.user?.role === 'admin' || session?.user?.role === 'superAdmin') {
    return (
      <div className="mx-auto px-4 max-w-6xl">
  <div className="py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
    {session?.user?.role === 'superAdmin' && (
      <Link href="/admin-controls/manage-admins">
        <MenuItem Icon={RiAdminFill} Title="Manage Admins" />
      </Link>
    )}
    <Link href="/admin-controls/categories">
      <MenuItem Icon={MdCategory} Title="Categories" />
    </Link>
    <Link href="/admin-controls/news">
      <MenuItem Icon={MdNewspaper} Title="News" />
    </Link>
    <Link href="/admin-controls/short-url">
      <MenuItem Icon={RiAdminFill} Title="Short URL" />
    </Link>
  </div>
</div>

    );
  }
  return <MsgShower msg={'You are not authorized to access this page'} />;
}
