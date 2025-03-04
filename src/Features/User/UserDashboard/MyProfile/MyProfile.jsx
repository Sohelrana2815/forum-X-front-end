import useUserPosts from "../../../../Hooks/Posts/useUserPosts";
import { useAuth } from "../../../../Hooks/useAuth";
import useUserData from "../../../../Hooks/User/useUserData";

const MyProfile = () => {
  const { user: authUser } = useAuth();

  const { data: userData, isLoading, isError } = useUserData(authUser?.email);

  const { data: userPosts } = useUserPosts(authUser?.email);

  if (isLoading) {
    return (
      <span className="loading loading-ring loading-xl text-blue-700"></span>
    );
  }

  if (isError) {
    <span>Error User data failed to fetched</span>;
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-base-200 p-6 rounded-xl shadow-lg">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100">
              <img
                src={userData?.photoURL || "/default-avatar.png"}
                alt="Profile"
              />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">{userData?.name}</h1>
            <p className="text-lg mb-4">📧 {userData?.email}</p>
            {/* badge section */}
            <div>
              {userData?.badge === "Bronze" ? (
                <div className="border border-yellow-700 rounded-full">
                  🥉Bronze Member
                </div>
              ) : (
                <div className="border border-yellow-500 rounded-full">
                  🥇 Gold Member
                </div>
              )}
            </div>

            {/* recent posts section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
              <div className="space-y-4">
                {userPosts?.map((post) => (
                  <div key={post._id} className="card bg-base-100 shadow">
                    <div className="card-body">
                      <h3 className="card-title">{post.title}</h3>
                      <p>{post.description.substring(0, 10)}...</p>
                      <div className="flex gap-2 mt-2">
                        <span>{new Date(post.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
