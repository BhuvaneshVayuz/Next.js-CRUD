import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import { Types } from "mongoose";
import User from "@/lib/modals/user";

export const PATCH = async (request, context) => {
    const blogId = context.params.blog;
    try {
      const body = await request.json();
      const { title, description } = body;
  
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
  
      if (!blogId || !Types.ObjectId.isValid(blogId)) {
        return new NextResponse(
          JSON.stringify({ message: "Invalid or missing blogId" }),
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
      const blog = await Blog.findOne({ _id: blogId, user: userId });
      if (!blog) {
        return new NextResponse(JSON.stringify({ message: "Blog not found" }), {
          status: 404,
        });
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, description },
        { new: true }
      );
  
      return new NextResponse(
        JSON.stringify({ message: "Blog updated", blog: updatedBlog }),
        { status: 200 }
      );
    } catch (error) {
      return new NextResponse("Error updating blog" + error.message, {
        status: 500,
      });
    }
  };
  
  