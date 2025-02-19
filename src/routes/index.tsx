import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

// Define the Post type
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get<Post[]>("/posts");
  return response.data.slice(0, 10);
};

const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: () => fetchPosts(),
});

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions),
  component: HomeComponent,
});

// Home component
function HomeComponent() {
  const { data: posts, error, isLoading } = useQuery(postsQueryOptions);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error fetching posts: {error.message}</div>; // Error handling
  }

  // Check if posts is undefined
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>; // Handle empty or undefined posts
  }

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <ul>
        {posts?.map((post) => (
          <li key={post.id} className="p-3 border-y">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
