import { useForm } from "react-hook-form";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp, loading, authError } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await signUp(email, password, { displayName: name });
      console.log("User signed up successfully!");
    } catch (error) {
      console.error("Sign-up error:", error);
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
                    })}
                    className="input focus:border-[#3674B5] focus:outline-none"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span className="text-[#C62300] text-base">
                      {errors.password.message}
                    </span>
                  )}
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
