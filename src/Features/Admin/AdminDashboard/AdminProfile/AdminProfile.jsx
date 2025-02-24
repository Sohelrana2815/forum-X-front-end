import { useForm } from "react-hook-form";
import { axiosPublic } from "../../../../Hooks/axiosInstances";
const AdminProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Split tags by comma and trim whitespaces

      const tags = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      if (tags.length === 0) {
        alert("Please enter at least one tag");
        return;
      }
      console.log(tags);

      // Send tags to the backend

      await axiosPublic.post("/tags", { tags });

      alert("Tags added successfully!");
      reset();
    } catch (error) {
      console.error("Error posting tags", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Add Tags</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="fieldset-label">
              Enter tags (comma-separated)
            </label>
            <input
              type="text"
              {...register("tags", {
                required: "Tags are required",
                validate: (value) => {
                  const tags = value.split(",").map((tag) => tag.trim());
                  return tags.length > 0 || "Please enter at least one tag";
                },
              })}
              placeholder="e.g., technology, design, science"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            {errors.tags && <span>{errors.tags.message}</span>}
          </div>
          <button
            disabled={isSubmitting}
            className="w-full bg-purple-700 text-white p-2 rounded hover:bg-purple-800 disabled:bg-gray-400"
          >
            {isSubmitting ? "Adding Tags..." : "Add Tags"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminProfile;
