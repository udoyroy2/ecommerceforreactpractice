import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({
  _id,
  name,
  category,
  price,
  oldPrice,
  discount,
  rating,
  image,
  onAddToCart, // 🆕 ADD: onAddToCart prop
}) => {
const { addToCart } = useCart();
  

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">

      {/* Product Image */}
 <Link to={`/product/${_id}`}>
      <div className="relative h-72 bg-gray-100 overflow-hidden">

        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />


        {/* Discount */}

        {discount && (
          <span className="absolute top-4 left-4 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">
            -{discount}%
          </span>
        )}


        {/* Wishlist */}

        <button 
         onClick={(e) => e.preventDefault()}
        className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-lg hover:bg-gray-100">
          ♡
        </button>

      </div>
</Link>

      {/* Product Details */}

      <div className="p-5">

        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {category}
        </p>

        <Link to={`/product/${_id}`}>
          <h3 className="font-bold text-lg mt-1 hover:underline">
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-2">

          <span className="text-sm">
            ★★★★★
          </span>

          <span className="text-xs text-gray-500">
            ({rating || 0})
          </span>

        </div>

        <div className="flex items-center gap-3 mt-4">

          <span className="text-xl font-extrabold">
            ৳{price}
          </span>

          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ৳{oldPrice}
            </span>
          )}

        </div>

        {/* View Details */}

        <Link
          to={`/product/${_id}`}
          className="block text-center border border-black text-black py-3 rounded-xl font-semibold mt-5 hover:bg-black hover:text-white transition"
        >
          View Details
        </Link>

        {/* Add Cart */}

        <button
          onClick={() => addToCart({  _id, name, price, oldPrice, discount, rating, image, category})}
          className="w-full mt-3 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;