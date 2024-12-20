import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";



export const POST = async (request) => {
    try {
      const { searchParams } = new URL(request.url);
      // const userId = searchParams.get("userId");
      const categoryId = searchParams.get("categoryId");
  
      const userHeader = JSON.parse(request.headers.get("X-User"));
  
      const userId = userHeader.userId;
  
  
      const body = await request.json();
      const { title, description } = body;
  
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
      const category = await Category.findById(categoryId);
      if (!category) {
        return new NextResponse(
          JSON.stringify({ message: "Category not found" }),
          {
            status: 404,
          }
        );
      }
  
      const newBlog = new Blog({
        title,
        description,
        user: new Types.ObjectId(userId),
        category: new Types.ObjectId(categoryId),
      });
  
      await newBlog.save();
      return new NextResponse(
        JSON.stringify({ message: "Blog is created", blog: newBlog }),
        { status: 200 }
      );
    } catch (error) {
      return new NextResponse("Error in fetching blogs" + error.message, {
        status: 500,
      });
    }
  };
  