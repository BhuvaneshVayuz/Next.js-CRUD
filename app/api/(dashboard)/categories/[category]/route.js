import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import Blog from "@/lib/modals/blog";

export const PATCH = async (request, context) => {
  const categoryId = context.params.category;
  try {
    const body = await request.json();
    const { title } = body;

    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    const userHeader = JSON.parse(request.headers.get("X-User"));

    const userId = userHeader.userId;




    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const category = await Category.findOne({ _id: categoryId, user: userId });

    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found" }),
        {
          status: 404,
        }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify({
        message: "Category is updated",
        category: updatedCategory,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in updating category" + error.message, {
      status: 500,
    });
  }
};


export const DELETE = async (request, context) => {
  const categoryId = context.params.category;

  try {
    const userHeader = JSON.parse(request.headers.get("X-User"));
    const userId = userHeader.userId;

    // Validate userId and categoryId
    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId" }),
        { status: 400 }
      );
    }

    if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing categoryId" }),
        { status: 400 }
      );
    }

    await connect();

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    // Check if category belongs to the user
    const category = await Category.findOne({ _id: categoryId, user: userId });
    if (!category) {
      return new NextResponse(
        JSON.stringify({ message: "Category not found or does not belong to the user" }),
        { status: 404 }
      );
    }

    // Delete all blogs associated with this category
    await Blog.deleteMany({ category: categoryId, user: userId });

    // Delete the category itself
    await Category.findByIdAndDelete(categoryId);

    return new NextResponse(
      JSON.stringify({ message: "Category and its blogs are deleted" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error in deleting category and blogs: " + error.message, {
      status: 500,
    });
  }
};
