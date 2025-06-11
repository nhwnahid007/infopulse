import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import mongoose from 'mongoose';

import { NextResponse } from 'next/server';

import { connectDB } from '../../../../lib/connectDB';
import News from '../../../../models/newsModel';
import Bookmark from '../../../../models/BookmarkModel';


await connectDB();

export async function GET(request) {
	try {
		const newsIdentifier = request.nextUrl.searchParams.get('newsIdentifier');
		const session = await getServerSession(authOptions);
		const userId = session?.user?.mongoId;

		const isValidObjectId = mongoose.Types.ObjectId.isValid(newsIdentifier);
		let query;

		if (isValidObjectId) {
			query = { _id: newsIdentifier };
		} else {
			query = { slug: newsIdentifier };
		}
		await connectDB();
		const news = await News.findOne(query);

		const bookmarkExists = await Bookmark.findOne({
			User: userId,
			News: news?._id,
		});

		if (!bookmarkExists) {
			throw new Error('Bookmark not found');
		}

		const hasBookmarked = true;
		return NextResponse.json({ hasBookmarked }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}