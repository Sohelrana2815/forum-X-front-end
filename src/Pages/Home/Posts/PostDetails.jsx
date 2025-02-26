import { useParams } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { axiosPublic } from "../../../Hooks/axiosInstances";
import { FaRegThumbsDown, FaRegThumbsUp, FaShare } from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const shareUrl = `${window.location.origin}/postDetails/${id}`;

  // Fetch post details

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/posts/${id}`);
      return response.data;
    },
  });

  // Fetch comments

  const { data: comments } = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/comments/${id}`);
      return response.date;
    },
  });

  // Upvote mutation
  const upvoteMutation = useMutation({
    mutationFn: () => axiosPublic.put(`/posts/${id}/upvote`),
    onSuccess: () => queryClient.invalidateQueries(["post", id]),
  });

  // Downvote mutation

  const downvoteMutation = useMutation({
    mutationFn: () => axiosPublic.put(`/posts/${id}/downvote`),
    onSuccess: () => queryClient.invalidateQueries(["post", id]),
  });

  // Comment mutation

  const commentMutation = useMutation({
    mutationFn: (newComment) => axiosPublic.post("/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", id]);
      reset();
    },
  });

  const handleCommentSubmit = (data) => {
    commentMutation.mutate({
      postId: id,
      text: data.comment,
      author: {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      },
    });
  };

  if (isLoading)
    return (
      <span className="loading loading-ring loading-xl text-blue-700"></span>
    );

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Post Details */}
        <div className="bg-gray-950 rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold">{post.authorName}</h2>
              <p className="text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-6">{post.description}</p>

          <div className="flex items-center gap-4">
            <div className="badge badge-outline">{post.tag}</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => upvoteMutation.mutate()}
                className="flex items-center gap-2"
              >
                <FaRegThumbsUp />
                <span>{post.upVote}</span>
              </button>
              <button
                onClick={() => downvoteMutation.mutate()}
                className="flex items-center gap-2"
              >
                <FaRegThumbsDown />
                <span>{post.downVote}</span>
              </button>
              <div className="dropdown dropdown-hover">
                <label tabIndex={0} className="btn btn-ghost">
                  <FaShare />
                </label>
                <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <FacebookShareButton url={shareUrl}>
                      Facebook
                    </FacebookShareButton>
                  </li>
                  <li>
                    <TwitterShareButton url={shareUrl}>
                      Twitter
                    </TwitterShareButton>
                  </li>
                  <li>
                    <LinkedinShareButton url={shareUrl}>
                      LinkedIn
                    </LinkedinShareButton>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        {user && (
          <form
            onSubmit={handleSubmit(handleCommentSubmit)}
            className="bg-gray-950 p-6 rounded-lg shadow-md"
          >
            <textarea
              {...register("comment", { required: true })}
              placeholder="Write a comment..."
              className="textarea textarea-bordered w-full mb-4 focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={commentMutation.isLoading}
            >
              {commentMutation.isLoading ? "Posting..." : "Post Comment"}
            </button>
          </form>
        )}

        {/* Comments Section */}
        <div className="bg-gray-950 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">
            Comments ({comments?.length || 0})
          </h3>
          {comments?.map((comment) => (
            <div key={comment._id} className="border-b pb-4 mb-4">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={comment.author.image}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-bold">{comment.author.name}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
