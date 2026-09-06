const ProductCard = ({
  name,
  category,
  price,
  oldPrice,
  discount,
  rating,
  image,
}) => {

  const handleAddToCart = () => {
    alert(`${name} added to cart!`);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300">

      {/* Product Image */}

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

        <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-lg hover:bg-gray-100">
          ♡
        </button>

      </div>


      {/* Product Details */}

      <div className="p-5">

        {/* Category */}

        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {category}
        </p>


        {/* Name */}

        <h3 className="font-bold text-lg mt-1">
          {name}
        </h3>


        {/* Rating */}

        <div className="flex items-center gap-2 mt-2">

          <span className="text-sm">
            ★★★★★
          </span>

          <span className="text-xs text-gray-500">
            ({rating})
          </span>

        </div>


        {/* Price */}

        <div className="flex items-center gap-3 mt-4">

          <span className="text-xl font-extrabold">
            ${price}
          </span>

          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}

        </div>


        {/* Add Cart */}

        <button
          onClick={handleAddToCart}
          className="w-full mt-5 bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;