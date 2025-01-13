import prisma from "@/app/utils/db";
import { UpdatePostDto } from "@/app/utils/dtos";
import { postSchema } from "@/app/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method GET
 * @route ~/api/posts/:id
 * @description Get Single Post By Id
 * @access public
 */
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: Props) {
  const postId = (await params).id 
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error); // إضافة طباعة الأخطاء لتحسين التصحيح
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method PUT
 * @route ~/api/posts/:id
 * @description Update a Post by Id
 * @access public
 */
export async function PUT(request: NextRequest, { params }: Props) {
    const postId = (await params).id; 
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const body: UpdatePostDto = await request.json();
    const data = {
      title: body.title ?? post.title,
      description: body.description ?? post.description,
    };

    const validation = postSchema.safeParse(data);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(postId, 10) },
      data,
    });

    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method DELETE
 * @route ~/api/posts/:id
 * @description Delete a Post by Id
 * @access private (only admin can delete a post)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
    const postId = (await params).id; 
  try {
    await prisma.post.delete({
      where: { id: parseInt(postId, 10) },
    });

    return NextResponse.json(
      { message: "Post has been deleted" },
      { status: 202 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}