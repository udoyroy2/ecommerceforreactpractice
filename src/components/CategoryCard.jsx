const CategoryCard = ({ name, image, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-4 flex items-center justify-between">
        <h3 className="font-bold text-base">
          {name}
        </h3>

        <span className="text-gray-400 group-hover:text-black transition">
          →
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;