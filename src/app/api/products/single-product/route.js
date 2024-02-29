import Product from "@/app/Model/ProductModel/ProductModel";
import connectToDB from "@/app/MongoDB_Connect/connectToDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// export const dynamic = ['id'];

export async function GET(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        console.log(req.query)
        if (!id) {
            return NextResponse.json({
                success: false,
                status: 400,
                message: "Product id is required",
            });
        }
        const getData = await Product.find({ _id: id });

        if (getData && getData.length) {
            return NextResponse.json({ success: true, data: getData[0] });
        } else {
            return NextResponse.json({
                success: false,
                status: 204,
                message: "No Product found",
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