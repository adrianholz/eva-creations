import Post from '@/database/post';
import connectDB from '@/lib/database';
import { verifyAuth } from '@/middleware/apiAuth';
import { NextRequest, NextResponse } from 'next/server';


// Write an endpoint that gets all of the posts from the database with the most recent posts first.

export async function GET() {
  try {

    console.log('getting posts');

    const authResult = await verifyAuth();

    console.log('auth:', authResult);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    console.log('connecting to db');
    
    await connectDB();

    console.log('connected to db');
    
    const posts = await Post.find().sort({ createdAt: -1 });
    console.log('posts', posts);

    return NextResponse.json(posts);

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(null)
  }
}
  

// Write an endpoint that creates a new post in the database.

export async function POST(req: NextRequest) {
  const { title, content } = await req.json();

  console.log('creating post', title, content);

  if (!title || !content) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    const authResult = await verifyAuth();

    console.log('create post auth result', authResult);

    if (!authResult.isAuthenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { userInfo } = authResult;

    console.log('connecting to db');

    await connectDB();
    console.log('connected to db');
    
    const post = await Post.create({ title, content, author: userInfo?.id });
    
    console.log('post created', post);
    
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "An error occurred" }, { status: 500 });
  }
}