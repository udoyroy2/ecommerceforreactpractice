import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      });
  }, [id]);

  // Order Now বাটনে ক্লিক করলে checkout পেজে প্রোডাক্ট পাঠানো হচ্ছে
  const handleOrderNow = () => {
    navigate("/checkout", { state: { product } });
  };

  if (loading) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">

      <button
        onClick={() => navigate(-1)}
        className="mb-8 font-semibold hover:underline"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="h-[500px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Details */}
        <div>

          <p className="text-sm text-gray-500 uppercase">
            {product.category}
          </p>

          <h1 className="text-4xl font-extrabold mt-2">
            {product.name}
          </h1>

          <div className="mt-4">
            ⭐ {product.rating || 0}
          </div>

          <div className="flex gap-3 items-center mt-6">
            <span className="text-3xl font-bold">৳{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through">
                ৳{product.oldPrice}
              </span>
            )}
          </div>

          {product.discount && (
            <p className="mt-3 text-sm font-semibold">
              {product.discount}% OFF
            </p>
          )}

          <p className="text-gray-600 mt-6 leading-7">
            {product.description ||
              "High quality product with comfortable design and premium materials."}
          </p>

          {/* শুধু Order Now বাটন — Add to Cart আপাতত বাদ */}
          <button
            onClick={handleOrderNow}
            className="w-full bg-black text-white py-4 rounded-xl mt-8 font-bold hover:bg-gray-800 transition"
          >
            Order Now
          </button>

        </div>

      </div>

    </main>
  );
};

export default ProductDetails;