import Product from "@/app/Model/ProductModel/ProductModel";
import connectToDB from "@/app/MongoDB_Connect/connectToDB";
import { NextResponse } from "next/server";

const Joi = require("joi");


const AddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    priceDrop: Joi.number().required(),
    short_description: Joi.string().required(),
    description: Joi.string().required(),
    ratings: Joi.number().default(0),
    reviews: Joi.array().items(
        Joi.object({
            rating: Joi.number().required(),
            comment: Joi.string().required(),
        })
    ),
    stock: Joi.number(),
    details_Image: Joi.array().required(),
    Characteristics: Joi.array(),
    Important: Joi.array(),
    usage: Joi.array(),
    advantages: Joi.array(),
    features: Joi.array(),
    Clothes_size: Joi.array(),
    isPopular: Joi.boolean(),
});



export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectToDB();
        const extractData = await req.json();

        const {
            name,
            price,
            priceDrop,
            short_description,
            description,
            ratings,
            reviews,
            stock,
            details_Image,
            Characteristics,
            Important,
            usage,
            advantages,
            features,
            Clothes_size,
            isPopular
        } = extractData;

        const { error } = AddNewProductSchema.validate({
            name,
            price,
            priceDrop,
            short_description,
            description,
            ratings,
            reviews,
            stock,
            details_Image,
            Characteristics,
            Important,
            usage,
            advantages,
            features,
            Clothes_size,
            isPopular
        });

        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message,
            });
        }

        const newlyCreatedProduct = await Product.create(extractData);

        if (newlyCreatedProduct) {
            return NextResponse.json({
                success: true,
                message: "Product added successfully",
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Failed to add the product ! please try again",
            });
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong ! Please try again later",
        });
    }
}