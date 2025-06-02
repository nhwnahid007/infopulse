'use client';

import { useSession } from 'next-auth/react';
import Loader from '../../../../components/shared/LoadingSkeleton';
import MsgShower from '../../../../components/MsgShower';
import Input from '../../../../components/Input';
import SubmitButton from '../../../../components/SubmitButton';
import Select from '../../../../components/Select';
import { useRouter } from 'next/navigation';
import createAdminAction from '../../../../actions/adminAction';
import toast from 'react-hot-toast';

const page = () => {
  const { status, data: session } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <Loader />;
  }
  if (session?.user?.role !== 'superAdmin') {
    return <MsgShower msg="You are not authorized to access this page" />;
  }
  return (
    <div className='grid place-items-center min-h-screen'>
      <form
				action={async (formData) => {
					const result = await createAdminAction(formData);
					if (result.error) {
						toast.error(result.error);
					} else {
						toast.success(result.success);
						router.push('/admin-controls');
					}
				}}
				className='shadow-xl w-[90%] sm:w-[580px] p-8 mt-4 rounded-md flex flex-col gap-3 bg-base-100'>
				<h2 className='text-white font-bold text-2xl mb-4 self-center'>
					Create Admin
				</h2>
				<Input
					typeAttr={'email'}
					nameAttr={'email'}
					placeholderAttr={'User Email'}
					classAttr={'w-full'}
					requiredAttr={true}
				/>
				<Select
					nameAttr={'role'}
					requiredAttr={true}
					classAttr={'w-full'}
					placeholderAttr={'Select Role'}
					optionsAttr={['admin', 'superAdmin']}
				/>
				<div className='self-center mt-4'>
					<SubmitButton />
				</div>
			</form>
    </div>
  );
};

export default page;
