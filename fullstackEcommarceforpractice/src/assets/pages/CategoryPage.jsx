import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams(); // URL থেকে category নাম আসছে, যেমন "Men"

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products?category=${categoryName}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, [categoryName]); // categoryName বদলালে (Men থেকে Women এ গেলে) আবার fetch হবে

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
        {categoryName} Collection
      </p>

      <h1 className="text-4xl font-extrabold mt-2 mb-10">
        {categoryName} Products
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">এখনো কোনো প্রোডাক্ট নেই এই ক্যাটাগরিতে।</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoryPage;