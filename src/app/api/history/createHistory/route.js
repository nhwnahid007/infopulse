import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import Joi from 'joi';
import mongoose from 'mongoose';
import { authOptions } from '../../auth/[...nextauth]/route';
import { connectDB } from '../../../../lib/connectDB';
import History from '../../../../models/HistoryModel';
import News from '../../../../models/newsModel';

const joiHistorySchema = Joi.object({
	userId: Joi.string().required(),
	newsIdentifier: Joi.string().required(),
});

export async function POST(req) {
	try {
		const newsIdentifier = req.nextUrl.searchParams.get('newsIdentifier');
		const session = await getServerSession(authOptions);
		const userId = session?.user?.mongoId;

		const { error } = joiHistorySchema.validate({ userId, newsIdentifier });

		if (error) {
			return NextResponse.json(
				{ message: 'Validation Error', error: error.details[0].message },
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

		const historyExists = await History.findOneAndUpdate(
			{ User: userId, News: news?._id },
			{ createdAt: new Date() },
			{ new: true }
		);

		if (historyExists) {
			return NextResponse.json(
				{ message: 'History Exists', data: historyExists },
				{ status: 200 }
			);
		}

		const result = await History.create({
			User: userId,
			News: news._id,
		});

		await News.updateOne({ _id: news._id }, { $inc: { viewsCount: 1 } });

		return NextResponse.json(
			{ message: 'History Create', data: result },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong', error },
			{ status: 400 }
		);
	}
}