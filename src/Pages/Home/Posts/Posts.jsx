import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosInstances";
import PostCard from "./PostCard";

const Posts = () => {
  // Fetch posts using react Query

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"], // Unique key for this query
    queryFn: async () => {
      const response = await axiosPublic.get("/posts");
      return response.data;
    },
  });
  // Loading state
  if (isLoading) {
    return (
      <span className="loading loading-ring loading-xl text-blue-600"></span>
    );
  }

  // Error state

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Render posts

  return (
    <>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">All Posts: {posts.length}</h1>

        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </>
  );
};

export default Posts;
