'use client';
import { PageContainer, PageContentContainer } from '@/components/containers';
import { PostForm } from '@/components/forms';
import { LoggedInHeader } from '@/components/headers';
import { PageLoader } from '@/components/loading';
import { Post } from '@/interfaces/post';
import { apiPostsGet } from '@/lib/api/posts';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

function Dashboard() {
  const { user } = useUser();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts = await apiPostsGet();
    console.log(posts);
    setPosts(posts);
  }

  return (
    <>
      <LoggedInHeader />
      <PageContainer>
        {user && (
          <PageContentContainer>
            <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
            <p className="text-lg text-gray-700">Welcome back, {user.name}!</p>
            <PostForm onCreate={(data: Post) => {
              // Add the new post to the top of the list

              setPosts([data, ...posts]);
            }} />

            <div className="flex flex-row gap-4 items-center justify-between">
              {
                posts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {posts.map((post) => (
                      <div key={post._id} className="bg-gray-100 p-4 rounded-md">
                        <h3 className="text-lg font-semibold">{post.title}</h3>
                        <p className="text-gray-700">{post.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No posts found.</p>
                )
              }
            </div>
          </PageContentContainer>
        )}

      </PageContainer>
    </>
  );
}

export default withPageAuthRequired(Dashboard, {
  onRedirecting: () => <PageLoader />,
  onError: error => <p>{error.message}</p>
});