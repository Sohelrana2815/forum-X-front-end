import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../Hooks/axiosInstances";
import PostCard from "./PostCard";
import { useState } from "react";

const Posts = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts using react Query

  const {
    data: postData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", sortBy, currentPage], // Unique key for this query
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/posts?sort=${sortBy}&page=${currentPage}`
      );
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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            All Posts: {postData.totalPosts}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("newest")}
              className={`btn ${sortBy === "newest" ? "btn-active" : ""}`}
            >
              Newest
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`btn ${sortBy === "popular" ? "btn-active" : ""}`}
            >
              Popular
            </button>
          </div>
        </div>

        {postData.posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          postData.posts.map((post) => <PostCard key={post._id} post={post} />)
        )}

        {/* Pagination Controls */}

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn btn-outline"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {postData.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage >= postData.totalPages}
            className="btn btn-outline"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Posts;
