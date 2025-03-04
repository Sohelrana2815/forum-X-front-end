import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../axiosInstances";

const useUserData = (email) => {
  return useQuery({
    queryKey: ["userData", email],
    queryFn: async () => {
      if (!email) return null;
      const response = await axiosPublic.get(`/users/${email}`);
      return response.data;
    },
    enabled: !!email, // শুধুমাত্র email থাকলে query চালাবে
  });
};

export default useUserData;
