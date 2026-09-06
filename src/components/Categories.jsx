import CategoryCard from "./CategoryCard";

const categories = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Winter Collection",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Half Sleeve",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Full Sleeve",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Polo",
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc45f8d8f77?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Pant",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
  },

  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
];

const Categories = ({ onCategoryClick }) => {
  return (
    <section
      id="categories"
      className="max-w-7xl mx-auto px-4 mt-16"
    >

      {/* Heading */}

      <div className="flex items-end justify-between mb-7">

        <div>

          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Explore
          </p>

          <h2 className="text-3xl font-extrabold mt-1">
            Shop by Category
          </h2>

        </div>

        <button className="hidden sm:block text-sm font-semibold hover:underline">
          View All →
        </button>

      </div>


      {/* Category Grid */}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">

        {categories.map((category) => (

          <CategoryCard
            key={category.name}
            name={category.name}
            image={category.image}
            onClick={() => onCategoryClick(category.name)}
          />

        ))}

      </div>

    </section>
  );
};

export default Categories;