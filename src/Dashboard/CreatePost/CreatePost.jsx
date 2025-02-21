import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { axiosPublic } from "../../Hooks/axiosInstances";
const CreatePost = () => {
  const {
    register,
    handleSubmit,
    reset,
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
        createdAt: new Date().toISOString(), // ISO format for consistency
      };

      const response = await axiosPublic.post("/add-posts", postData);

      // Handle success
      if (response.data.insertedId) {
        alert("Post created successfully!");
        reset();
      } else {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <>
      <form
        className="xl:w-1/3 md:w-1/2 w-3/4 border mx-auto shadow-lg rounded-lg bg-gradient-to-t from-gray-700 via-gray-600 to-gray-800 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create a New Post
        </h2>

        {/* Title */}
        <div className="mb-4">
          <label className="fieldset-label">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required." })}
            placeholder="Enter post title"
            className="input focus:border-gray-200
            
            focus:outline-none"
          />
          {errors.title && (
            <p className="text-[#C62300] text-base">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}

        <div className="mb-4">
          <label className="fieldset-label">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter post description"
            className="textarea focus:border-gray-200
            
            focus:outline-none"
          />
          {errors.description && (
            <p className="text-[#C62300] text-base">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Tags */}

        <div className="mb-4">
          <label className="fieldset-label">Tag</label>
          <select
            defaultValue=""
            {...register("tag", { required: "Tag is required" })}
            className="select focus:outline-none focus:ring focus:ring-purple-700 focus:border-none"
          >
            <option value="" disabled>
              Select a tag
            </option>
            <option value="technology">Technology</option>
            <option value="web-development">Programming</option>
            <option value="design">Design</option>
            <option value="art">Art</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="business">Business</option>
            <option value="gaming">Gaming</option>
            <option value="movies">Movies</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="travel">Travel</option>
            <option value="food">Food</option>
            <option value="fitness">Fitness</option>
            <option value="photography">Photography</option>
            <option value="books">Books</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
            <option value="environment">Environment</option>
          </select>
          {errors && (
            <p className="text-[#C62300] text-base">{errors.tag?.message}</p>
          )}
        </div>

        <button type="submit" className="btn hover:border-purple-600">
          Submit
        </button>
      </form>
    </>
  );
};

export default CreatePost;
