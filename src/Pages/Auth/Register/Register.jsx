import { useForm } from "react-hook-form";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import { axiosPublic } from "../../../Hooks/axiosInstances";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUp, loading, authError, updateUserProfile } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { name, email, password, avatar } = data;

      // 1. Upload image (Mandatory during sign up)

      const formData = new FormData();
      formData.append("image", avatar[0]);

      const uploadResponse = await axiosPublic.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(
        "Img url from img bb:",
        uploadResponse.data,
        "Avatar file",
        avatar
      );

      if (!uploadResponse.data.success) {
        throw new Error("Image upload failed");
      }
      // Stored url in photoURL variable

      const photoURL = uploadResponse.data.url;

      // 2. Create user

      await signUp(email, password);

      // 3. Update user profile with name and image

      updateUserProfile({
        displayName: name,
        photoURL: photoURL,
      });

      console.log("Registration profile update successful!");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="fieldset-label">Full Name</label>
                  {/* Name field */}
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="input focus:border-[#3674B5] focus:outline-none"
                    placeholder="Full Name"
                  />
                  {errors.name && (
                    <span className="text-[#C62300] text-base">
                      {errors.name.message}
                    </span>
                  )}
                  <label className="fieldset-label">Email</label>
                  {/* Email Field */}
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="input focus:border-[#3674B5] focus:outline-none"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="text-[#C62300] text-base">
                      {errors.email.message}
                    </span>
                  )}
                  <label className="fieldset-label">Password</label>
                  {/* Password Field */}
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="input focus:border-[#3674B5] focus:outline-none"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span className="text-[#C62300] text-base">
                      {errors.password.message}
                    </span>
                  )}

                  {/* Avatar Upload Field */}

                  <label className="fieldset-label">Profile Picture</label>

                  <input
                    type="file"
                    className="file-input file-input-accent"
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    {...register("avatar")}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        // Validate file size
                        if (file.size > 5 * 1024 * 1024) {
                          // 5MB
                          alert("File size must be less than 5MB");
                          e.target.value = null; // Clear the invalid file
                        }

                        // Validate file type
                        const allowedTypes = [
                          "image/jpeg",
                          "image/png",
                          "image/gif",
                          "image/webp",
                        ];
                        if (!allowedTypes.includes(file.type)) {
                          alert(
                            "Only JPEG, PNG, GIF, and WEBP images are allowed"
                          );
                          e.target.value = null; // Clear the invalid file
                        }
                      }
                    }}
                  />
                  {errors.avatar && (
                    <span className="text-[#C62300] text-base">
                      {errors.avatar.message}
                    </span>
                  )}
                  <div className="text-sm text-gray-500 mt-1">
                    Maximum file size: 5MB (JPEG, PNG, WEBP)
                  </div>
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  {/* Display Firebase Auth Errors */}
                  {authError && <div style={{ color: "red" }}>{authError}</div>}
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-neutral mt-4"
                  >
                    {loading ? "Sign Up..." : "Sign Up"}
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
