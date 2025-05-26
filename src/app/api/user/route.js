import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/connectDB';
import User from '../../../models/userModel';

export async function POST(request) {
	try {
		const { name, email, image } = await request.json();
		await connectDB();
		const userExists = await User.findOne({ email });
		if (userExists) {
			userExists.name = name;
			userExists.image = image;
			const updatedUser = await userExists.save();

			return NextResponse.json(
				{ message: 'User Exits', data: updatedUser },
				{ status: 200 }
			);
		}

		const newUser = await new User({ name, email, image });
		const createdUser = await newUser.save();

		if (createdUser) {
			return NextResponse.json(
				{ message: 'User created', data: createdUser },
				{ status: 201 }
			);
		}
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 500 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Something went wrong' },
			{ status: 400 }
		);
	}
}