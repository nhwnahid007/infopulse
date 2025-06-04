'use client';

import { deleteCategoryAction } from '@/actions/categoryActions';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '../../../../../../components/shared/LoadingSkeleton';
import Swal from 'sweetalert2';

export default function DeleteCategory() {
  const params = useParams();
  const { status, data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doRedirect = async () => {
      if (!session?.user || session?.user?.role !== 'superAdmin') {
        router.replace('/admin-controls/categories');
      } else {
        setLoading(false);
      }
    };
    doRedirect();
  }, [session, router]);

  useEffect(() => {
    const deleteCategory = async () => {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
          const response = await deleteCategoryAction(params.categoryId);
          if (response?.success) {
            await Swal.fire(
              'Deleted!',
              'Category has been deleted.',
              'success',
            );
            router.replace('/admin-controls/categories');
          } else {
            await Swal.fire(
              'Error!',
              response?.error || 'Something went wrong!',
              'error',
            );
          }
        } else {
          router.replace('/admin-controls/categories');
          router.refresh();
        }
      } catch (error) {
        await Swal.fire('Error!', 'Something went wrong!', 'error');
        router.replace('/admin-controls/categories');
        router.refresh();
      }
    };

    deleteCategory();
  }, [params.categoryId, router]);

  return null;
}
