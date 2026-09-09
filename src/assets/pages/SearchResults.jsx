import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products?search=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setLoading(false);
      });
  }, [query]); // query বদলালে আবার সার্চ হবে

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
        Search Results
      </p>
      <h1 className="text-3xl font-extrabold mt-2 mb-10">
        "{query}" এর জন্য ফলাফল
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">কোনো প্রোডাক্ট পাওয়া যায়নি।</p>
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

export default SearchResults;