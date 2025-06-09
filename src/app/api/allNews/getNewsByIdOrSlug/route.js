import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import News from '../../../../models/newsModel';
import { connectDB } from '../../../../lib/connectDB';

export async function GET(req) {
	try {
		const newsIdentifier = req.nextUrl.searchParams.get('newsIdentifier');

		if (!newsIdentifier) {
			return NextResponse.json(
				{ message: 'Missing News Identifier' },
				{ status: 400 }
			);
		}

		const isValidObjectId = mongoose.Types.ObjectId.isValid(newsIdentifier);
		let query;

		if (isValidObjectId) {
			query = { _id: newsIdentifier };
		} else {
			query = { slug: newsIdentifier };
		}
		await connectDB();
		const news = await News.findOne(query);

		if (!news) {
			return NextResponse.json({ message: 'News not found' }, { status: 404 });
		}

		return NextResponse.json({ news }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}