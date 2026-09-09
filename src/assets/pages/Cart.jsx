import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg mb-6">আপনার কার্ট এখনো খালি।</p>
        <Link
          to="/"
          className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Shopping Continue করুন
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-500">৳{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="w-8 h-8 border rounded-full font-bold"
              >
                −
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="w-8 h-8 border rounded-full font-bold"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-bold">
              ৳{(parseFloat(item.price) * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex justify-between items-center">
        <span className="text-xl font-bold">Total: ৳{cartTotal.toFixed(2)}</span>
        <button
          onClick={() => navigate("/checkout", { state: { cartItems: cart } })}
          className="bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Checkout
        </button>
      </div>
    </main>
  );
};

export default Cart;