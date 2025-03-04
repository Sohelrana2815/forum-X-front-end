import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstances";

const useAllUserPosts = (email) => {
  return useQuery({
    queryKey: ["allUserPosts", email],
    queryFn: async () => {
      if (!email) return [];
      const response = await axiosPublic.get(`/posts/user/${email}/all`);
      return response.data;
    },
    enabled: !!email, // শুধুমাত্র ইমেল থাকলে রিকোয়েস্ট করবে
    staleTime: 5 * 60 * 1000, // 5 মিনিট ক্যাশে রাখবে
  });
};

export default useAllUserPosts;
