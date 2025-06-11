import { NextResponse } from 'next/server';

import { connectDB } from '../../../lib/connectDB';
import News from '../../../models/newsModel';
import Category from '../../../models/categoriesModel';

await connectDB();

export async function GET(request) {
	try {
		const categories = await Category.find();

		const categoriesWithNews = await Promise.all(
			categories.map(async (category) => {
				const recentNews = await News.find({ categories: category._id })
					.sort({ createdAt: -1 })
					.limit(3);
				return {
					category,
					news: recentNews,
				};
			})
		);

		return NextResponse.json({ categoriesWithNews }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}