'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { deleteNewsAction } from '@/actions/newsActions';
import Swal from 'sweetalert2';

const NewsCard = ({ news, onDelete }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleDelete = async () => {
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
        const response = await deleteNewsAction(news._id);
        if (response?.success) {
          await Swal.fire('Deleted!', 'News has been deleted.', 'success');
          onDelete(news._id);
        } else {
          await Swal.fire(
            'Error!',
            response?.error || 'Something went wrong!',
            'error',
          );
        }
      }
    } catch (error) {
      await Swal.fire('Error!', 'Something went wrong!', 'error');
    }
  };

  return (
    <Card
      className="w-full p-2 md:w-96 bg-slate-800 text-white border-none cursor-pointer hover:bg-slate-700 transition"
      onClick={() => router.push(`/news/view/${news.slug}`)}
    >
      {news?.thumbnailURL && (
        <div className="relative w-full h-48">
          <Image
            src={news.thumbnailURL}
            alt={news.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        <h2 className="text-xl font-semibold hover:text-indigo-400 transition">
          {news?.title}
        </h2>

        {news?.shortDescription && (
          <p className="text-sm text-slate-300">{news.shortDescription}</p>
        )}

        <div className="text-xs text-slate-400">{news?.viewsCount} views</div>

        {pathname.includes('/admin-controls') && (
          <div className="flex justify-end space-x-2 pt-4">
            <Link href={`/admin-controls/news/update/${news?._id}`}>
              <Button variant="default">Edit</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsCard;
