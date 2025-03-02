import { redirect } from 'next/navigation';

import UserProfileForm from './(components)/user-profile-form';
import { getUser } from '@/access-data/user/get-auth-user';

const ProfilePage = async () => {
  const user = await getUser();
  if (!user) redirect('/startups');

  return (
    <section className='py-8 md:p-8'>
      <UserProfileForm user={user} />
    </section>
  );
};

export default ProfilePage;
