'use server';
import Joi from 'joi';
import { connectDB } from '../lib/connectDB';
import User from '../models/userModel';

const joiAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid('admin', 'superAdmin').required(),
});
const createAdminAction = async (formData) => {
  try {
    const email = formData.get('email');
    const role = formData.get('role');
    const { error } = joiAdminSchema.validate({ email, role });
    if (error) {
      return { error: error.message };
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return { error: 'User does not exist' };
    }
    existingUser.role = role;
    const result = await existingUser.save();
    if (result) {
      return { success: 'Admin created successfully' };
    }
    return { error: 'Failed to create admin' };
  } catch (error) {
    return { error: error.message };
  }
};

export const fetchAdminAction = async () => {
	try {
		await connectDB();

		const result = await User.find({ role: 'admin' }).select('name email role');

		const dataObj = JSON.parse(JSON.stringify(result));
		return dataObj;
	} catch (error) {
		throw new Error(error);
	}
};

export const deleteAdminAction = async (email) => {
	try {
		await connectDB();
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			throw new Error('User does not exist!');
		}
		existingUser.role = 'user';
		await existingUser.save();
	} catch (error) {
		throw new Error(error);
	}
};


export default createAdminAction;
