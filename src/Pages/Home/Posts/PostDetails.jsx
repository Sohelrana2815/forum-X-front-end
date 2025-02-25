import { useParams } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { axiosPublic } from "../../../Hooks/axiosInstances";
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
    },
  });

  return <div>Post Details...{id}</div>;
};

export default PostDetails;
