import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 mt-20">

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

      {loading ? (
        <p className="text-gray-500">
          Loading products...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              {...product}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default ProductSection;