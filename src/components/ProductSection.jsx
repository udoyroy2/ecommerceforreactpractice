import ProductCard from "./ProductCard";
import image1 from "../assets/shirt.jpg";


const products = [
  {
    name: "Classic Cotton Shirt",
    category: "Shirt",
    price: "29.99",
    oldPrice: "39.99",
    discount: 25,
    rating: 48,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Full Sleeve Shirt",
    category: "Shirt",
    price: "750tk",
    oldPrice: "700tk",
    discount: 5,
    rating: 48,
    image: image1,
  },








  {
    name: "Relaxed Fit Pant",
    category: "Pant",
    price: "34.99",
    oldPrice: "44.99",
    discount: 22,
    rating: 35,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=80",
  },

  {
    name: "Oversized Hoodie",
    category: "Hoodie",
    price: "49.99",
    oldPrice: "64.99",
    discount: 23,
    rating: 72,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80",
  },

  {
    name: "Urban Running Shoes",
    category: "Shoes",
    price: "69.99",
    oldPrice: "89.99",
    discount: 22,
    rating: 96,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
  },

  {
    name: "Premium Polo Shirt",
    category: "Polo",
    price: "32.99",
    oldPrice: "42.99",
    discount: 23,
    rating: 54,
    image:
      "https://images.unsplash.com/photo-1625910513413-5fc45f8d8f77?auto=format&fit=crop&w=700&q=80",
  },

  {
    name: "Classic Denim Pant",
    category: "Pant",
    price: "39.99",
    oldPrice: "49.99",
    discount: 20,
    rating: 41,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80",
  },

  {
    name: "Winter Fleece Hoodie",
    category: "Hoodie",
    price: "54.99",
    oldPrice: "69.99",
    discount: 21,
    rating: 83,
    image:
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=700&q=80",
  },

  {
    name: "Everyday Casual Shoes",
    category: "Shoes",
    price: "59.99",
    oldPrice: "79.99",
    discount: 25,
    rating: 67,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
  },
];

const ProductSection = () => {
  return (
    <section
      id="products"
      className="max-w-7xl mx-auto px-4 mt-20"
    >

      {/* Heading */}

      <div className="flex items-end justify-between mb-8">

        <div>

          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Our Collection
          </p>

          <h2 className="text-3xl font-extrabold mt-1">
            Featured Products
          </h2>

        </div>

        <button className="hidden sm:block text-sm font-semibold hover:underline">
          View All Products →
        </button>

      </div>


      {/* Products */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {products.map((product) => (

          <ProductCard
            key={product.name}
            {...product}
          />

        ))}

      </div>

    </section>
  );
};

export default ProductSection;