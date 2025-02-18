import { Link } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const Login = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      await signIn(email, password);
      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Join Us</h1>
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
                  <label className="fieldset-label">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="input focus:border-[#3674B5] focus:outline-none"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="text-red-600">{errors.email.message}</span>
                  )}
                  <label className="fieldset-label">Password</label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="input focus:border-[#3674B5] focus:outline-none"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <span className="text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button type="submit" className="btn btn-neutral mt-4">
                    Login
                  </button>
                </fieldset>
              </form>
              {/* toggle  */}
              <div>
                <h3 className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="text-purple-500 text-base">
                    Register
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
