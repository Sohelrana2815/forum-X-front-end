import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
const CreatePost = () => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const onSubmit = async (data) => {
    try {
      // Prepare the post data

      const postData = {
        authorName: user.displayName,
        authorEmail: user.email,
        authorImage: user.photoURL,
        title: data.title,
        description: data.description,
        tag: data.tag,
        upVote: 0,
        downVote: 0,
        createdAt: new Date(),
      };

      console.log(postData);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create a New Post</h2>

        {/* Title */}
        <div>
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required." })}
            placeholder="Enter post title"
          />
          {errors.title && (
            <span className="text-[#C62300] text-base">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Description */}

        <div className="form-group">
          <label>Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter post description"
          />
          {errors.description && (
            <span className="text-[#C62300] text-base">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Tags */}

        <div>
          <label>Tag</label>
          <select
            defaultValue=""
            {...register("tag", { required: "Tag is required" })}
          >
            <option value="">Select a tag</option>
            <option value="technology">Technology</option>
            <option value="web-development">Programming</option>
            <option value="design">Design</option>
          </select>
          {errors && (
            <span className="text-[#C62300] text-base">
              {errors.tag?.message}
            </span>
          )}
        </div>

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePost;
