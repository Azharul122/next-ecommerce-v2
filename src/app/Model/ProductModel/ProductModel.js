import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//     {
//         name: String,
//         description: String,
//         price: Number,
//         category: String,
//         sizes: Array,
//         deliveryInfo: String,
//         onSale: String,
//         priceDrop: Number,
//         imageUrl: String,
//     },
//     { timestamps: true }
// );

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    priceDrop: Number,
    short_description: String,
    description: String,
    category: String,
    ratings: { type: Number, default: 0 },
    reviews: [
        {
            rating: Number,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    stock: {
        type: Number,
        default: 10
    },
    details_Image: Array,
    Characteristics: Object,
    Important: Array,
    usage: Object,
    advantages: Array,
    features: Array,
    Clothes_size: Array,
    isPopular: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const Product =
    mongoose.models.Products || mongoose.model("Products", productSchema);

export default Product;