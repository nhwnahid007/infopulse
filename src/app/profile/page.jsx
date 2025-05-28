'use client';
import React from 'react';
import SigninBtn from '../../components/SigninBtn';
import { useSession } from 'next-auth/react';
import Loader from '../../components/shared/LoadingSkeleton';
import ProfileWelcomeCard from '../../components/ProfileCard';

const ProfilePage = () => {
  const { status, data: session } = useSession();
  if (status === 'loading') {
    return <Loader />;
  }
  else if (status === 'authenticated') {
    return (
      <div className="flex flex-col items-center justify-center h-screen pb-5">
        <ProfileWelcomeCard user={session.user} />
      </div>
    );
  }
  return (
    <div className='flex  flex-col items-center justify-center'>
      <SigninBtn></SigninBtn>
    </div>
  );
};

export default ProfilePage;
