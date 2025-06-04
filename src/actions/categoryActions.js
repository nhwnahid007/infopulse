'use server';

import Joi from "joi";
import { connectDB } from "../lib/connectDB";
import fileUploader from "../lib/fileUploader";
import Category from "../models/categoriesModel";

const joiCategoryCreateSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	thumbnailURL: Joi.string().required(),
});


export const createCategoryAction = async (formData) => {
	try {
		const name = formData.get('name')?.toString();
		const description = formData.get('description')?.toString();
		const thumbnailImage = formData.get('thumbnailImage');

		if (
			!thumbnailImage ||
			(thumbnailImage.type !== 'image/jpeg' &&
				thumbnailImage.type !== 'image/png')
		) {
			throw new Error('Image is Required!');
		}
		const thumbnailURL = await fileUploader(thumbnailImage, 'images');

		const { error, value } = joiCategoryCreateSchema.validate({
			name,
			description,
			thumbnailURL,
		});

		if (error) {
			throw new Error(error);
		}
		await connectDB();

		const result = await Category.create({
			name,
			description,
			thumbnailURL,
		});
		if (result) {
			return { success: true };
		}
	} catch (error) {
		return { error: error.message };
	}
};

