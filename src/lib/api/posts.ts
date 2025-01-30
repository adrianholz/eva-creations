import { Post } from "@/interfaces/post";

export async function apiPostsGet() : Promise<Post[]> {
  return fetch('/api/posts').then(async (res) => {
    return (await res.json()).map((post: Post) => ({
      ...post,
      dateCreated: new Date(post.dateCreated),
    }));
  });
}

export async function apiPostCreate(title: string, content: string) : Promise<Post> {
  return fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  }).then((res) => res.json());
}