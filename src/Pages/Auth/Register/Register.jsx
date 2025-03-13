import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosPublic } from "../../../Hooks/axiosInstances";
import { useAuth } from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const {
    signUp,
    loading: authLoading,
    authError,
    updateUserProfile,
  } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true); // Start loading
      const { name, email, password, avatar } = data;

      // Show loading alert

      Swal.fire({
        title: "Creating Account...",
        html: "Please wait while we create your account",

        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

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

      // 4. Store user data in MongoDB (ব্যাজ সহ)

      const userData = {
        name,
        email,
        password, // Hash it(Before stored it in database)
        photoURL,
        badge: "Bronze", // Default bronze 🥉
      };

      const registerUserResponse = await axiosPublic.post("/signup", userData);

      if (!registerUserResponse.data.insertedId) {
        throw new Error("Failed to store user data in database");
      }

      // Success alert

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your account has been created 🥉",
        showConfirmButton: false,
        timer: 2000,
      });
      // Reset the form
      reset();
      // Navigate the user

      navigate(from, { replace: true });

      console.log("Registration profile update successful!");
    } catch (error) {
      console.error("Registration error:", error.message);
      // Error alert

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false); // End loading
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
                    accept="image/jpeg, image/gif, image/png, /image/webp"
                    {...register("avatar")}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) {
                        // Validate file size

                        if (file.size > 5 * 1024 * 1024) {
                          // if file size grater then 5MB
                          alert("File size must be less than 5MB");
                          e.target.value = null; // clear the invalid file
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
                  <div className="text-sm text-gray-200 mt-1">
                    Maximum file size: 5MB (JPEG, PNG, WEBP)
                  </div>
                  {/* Display Firebase Auth Errors */}
                  {authError && <div style={{ color: "red" }}>{authError}</div>}
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || authLoading}
                    className="btn btn-neutral mt-4"
                  >
                    {isSubmitting || authLoading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Signing up...
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </button>
                </fieldset>
                {/* Toggle */}
                <div>
                  <h3 className="text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-500 text-base">
                      Login
                    </Link>
                  </h3>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
