import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		owner: {
			type: String,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		tags: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)
