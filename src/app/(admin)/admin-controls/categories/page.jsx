'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Categories = () => {
    const router = useRouter();
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const { status, data: session } = useSession();
    return (
        <div>
            <div className='flex flex-wrap items-center justify-between pl-7 pr-5 py-4'>
				<h2 className='font-bold text-lg'>All Categories</h2>
				<div className='flex justify-between flex-wrap'>
					<button
						className='bg-primary h-12 w-28 rounded-md'
						onClick={() => router.push('/admin-controls/categories/add-category')}>
						Add
					</button>
				</div>
			</div>
        </div>
    );
};

export default Categories;