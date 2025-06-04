'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function CategoryCard({ category }) {
	const router = useRouter();

	return (
		<Card className="w-full p-2 md:w-96 bg-slate-800 text-white border-none ">
			{category?.thumbnailURL && (
				<div className="relative w-full h-48">
					<Image
						src={category.thumbnailURL}
						alt={category.name}
						fill
						className="object-cover rounded-xl"
					/>
				</div>
			)}

			<CardContent className="p-4 space-y-3">
				<h2 className="text-xl font-semibold">{category?.name}</h2>
				{category?.description && (
					<p className="text-sm text-slate-300">{category.description}</p>
				)}

				<div className="flex justify-end space-x-2 pt-4">
					<Button
						variant="default"
						onClick={() =>
							router.push(`/admin-controls/categories/update/${category._id}`)
						}
					>
						Edit
					</Button>
					<Button
						variant="destructive"
						onClick={() =>
							router.push(`/admin-controls/categories/delete/${category._id}`)
						}
					>
						Delete
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
