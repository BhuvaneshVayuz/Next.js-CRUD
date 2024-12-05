import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

export const GET = async (request) => {
  try {
    // Connect to the database
    await connect();

    // Fetch all categories without filtering by user
    const categories = await Category.find();

    // Return the categories as a JSON response
    return new NextResponse(JSON.stringify(categories), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Error in fetching categories: " + error.message, {
      status: 500,
    });
  }
};
