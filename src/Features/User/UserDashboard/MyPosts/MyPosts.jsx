import { useAuth } from "../../../../Hooks/useAuth";
import useAllUserPosts from "../../../../Hooks/User/useAllUserPosts";

const MyPosts = () => {
  const { user: authUser } = useAuth();
  const { data: posts, isLoading, isError } = useAllUserPosts(authUser?.email);
  if (isLoading) {
    return (
      <span className="loading loading-ring loading-xl text-blue-700"></span>
    );
  }
  if (isError) {
    return <div className="text-red-600">Error loading posts</div>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">My Posts</h1>
        {/* Posts list */}

        <div className="space-y-6">
          {posts?.map((post) => (
            <div key={post._id} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h1 className="card-title">{post.title}</h1>
                <p>{post.description}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-sm text-gray-500">👍{post.upVote}</span>
                  <span className="text-sm text-gray-500">
                    👎{post.downVote}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPosts;
