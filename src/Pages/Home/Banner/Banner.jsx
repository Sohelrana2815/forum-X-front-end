const Banner = () => {
  return (
    <div className="border-t bg-[#143D60] min-h-[50vh] flex flex-col justify-center items-center">
      <h2 className="text-center uppercase font-medium text-4xl py-4">
        Welcome to Forum X
      </h2>
      <h4 className="text-center italic font-semibold text-lg mb-8">
        The most popular forum on the internet!
      </h4>
      {/* search field */}
      <div className="w-full px-4 md:w-2/3 lg:w-1/2 max-w-3xl">
        <input
          type="text"
          placeholder="Search topics..."
          className="w-full py-3 px-6 rounded-sm border-2 border-gray-600 focus:outline-none focus:border-white focus:ring-2 focus:ring-gray-500 transition-all"
        />
      </div>
    </div>
  );
};

export default Banner;
