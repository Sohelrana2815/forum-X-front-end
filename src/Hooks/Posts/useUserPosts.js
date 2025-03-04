import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstances";

const useUserPosts = (email) => {
  return useQuery({
    queryKey: ["userPosts", email],
    queryFn: async () => {
      if (!email) {
        return [];
      }
      const response = await axiosPublic.get(`/posts/user/${email}`);
      return response.data;
    },
    enabled: !!email, // Only query if email exist.
    staleTime: 5 * 60 * 1000,
  });
};

export default useUserPosts;
