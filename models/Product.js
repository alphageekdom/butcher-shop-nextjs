import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema();

const ProductSchema = new Schema();

const Product = models.Product || model('Product', ProductSchema);

export default Product;
