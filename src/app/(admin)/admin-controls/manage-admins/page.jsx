'use client';

import { useSession } from 'next-auth/react';
import Loader from '../../../../components/shared/LoadingSkeleton';
import MsgShower from '../../../../components/MsgShower';
import Input from '../../../../components/Input';
import SubmitButton from '../../../../components/SubmitButton';
import Select from '../../../../components/Select';
import createAdminAction, {
  deleteAdminAction,
  fetchAdminAction,
} from '../../../../actions/adminAction';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Page = () => {
  const { status, data: session } = useSession();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAdminAction();
        setAdmins(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (status === 'loading') {
    return <Loader />;
  }
  if (session?.user?.role !== 'superAdmin') {
    return <MsgShower msg="You are not authorized to access this page" />;
  }
  return (
    <div className="grid place-items-center min-h-screen">
      <form
        action={async (formData) => {
          const result = await createAdminAction(formData);
          if (result.error) {
            toast.error(result.error);
          } else {
            toast.success(result.success);
            const updatedAdmins = await fetchAdminAction();
            setAdmins(updatedAdmins);
          }
        }}
        className="shadow-xl w-[90%] sm:w-[580px] p-8 mt-4 rounded-md flex flex-col gap-3 bg-base-100"
      >
        <h2 className="text-white font-bold text-2xl mb-4 self-center">
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
        <div className="self-center mt-4">
          <SubmitButton />
        </div>
      </form>
      <div className="mt-4 w-[90%] sm:w-[580px]">
        {admins.length > 0 &&
          admins.map((item) => {
            return (
              <div
                key={item?._id}
                className="my-4 flex flex-col bg-base-100 p-4 rounded-lg"
              >
                <div className="self-end">
                  <Tooltip>
                    <TooltipTrigger>
                      <MdDelete
                        className=" text-red-400 cursor-pointer h-6 w-6"
                        onClick={async () => {
                          try {
                            await deleteAdminAction(item.email);
                            toast.success('Admin deleted successfully');
                            const result = await fetchAdminAction();
                            setAdmins(result);
                          } catch (error) {
                            toast.error('Failed to delete admin');
                            console.error(error);
                          }
                        }}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Remove as Admin</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <h2>Name: {item?.name}</h2>
                <h2>Email: {item?.email}</h2>
                <h2>Role: {item?.role}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Page;
