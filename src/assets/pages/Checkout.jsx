import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, cartItems } = location.state || {};
  const items = cartItems || (product ? [{ ...product, quantity: 1 }] : []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [quantities, setQuantities] = useState(
    items.reduce((acc, item) => {
      acc[item._id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const [paymentMethod, setPaymentMethod] = useState("cod"); // 🆕 NEW: ডিফল্ট COD
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (items.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">কোনো প্রোডাক্ট বাছাই করা হয়নি।</p>
      </main>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + parseFloat(item.price) * (quantities[item._id] || 1),
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const firstItem = items[0];

      const orderRes = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerInfo: formData,
          product: {
            productId: firstItem._id,
            name: firstItem.name,
            price: firstItem.price,
            image: firstItem.image,
          },
          quantity: quantities[firstItem._id] || 1,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message || "অর্ডার তৈরি করতে সমস্যা হয়েছে");
      }

      // 🔴 CHANGED: paymentMethod অনুযায়ী আলাদা flow
      if (paymentMethod === "cod") {
        // Cash on Delivery হলে সরাসরি Success পেজে
        navigate("/order-success", { state: { orderIds: [orderData._id] } });
      } else {
        // Mobile Banking/Card হলে SSLCommerz এ পাঠানো
        const paymentRes = await fetch(`${API_URL}/payment/initiate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: orderData._id }),
        });

        const paymentData = await paymentRes.json();

      if (!paymentData.url) {
  console.log("Payment response:", paymentData);
  throw new Error(
    paymentData.message || "Payment শুরু করা যায়নি"
  );
}
        




        window.location.href = paymentData.url;
      }
    } catch (err) {
      setError(err.message || "সার্ভারে সমস্যা হয়েছে, একটু পর চেষ্টা করুন");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8">Checkout</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex gap-4 items-center border border-gray-200 rounded-xl p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-500">৳{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleQuantityChange(item._id, -1)}
                className="w-8 h-8 border rounded-full font-bold"
              >
                −
              </button>
              <span className="font-semibold">{quantities[item._id]}</span>
              <button
                type="button"
                onClick={() => handleQuantityChange(item._id, 1)}
                className="w-8 h-8 border rounded-full font-bold"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <p className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* 🆕 NEW: Payment Method বাছাই করার অংশ */}
        <div>
          <label className="block text-sm font-semibold mb-2">Payment Method</label>

          <div className="space-y-2">
            <label
              className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                paymentMethod === "cod" ? "border-black bg-gray-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="text-xl">💵</span>
              <div>
                <p className="font-semibold">Cash on Delivery</p>
                <p className="text-xs text-gray-500">প্রোডাক্ট হাতে পেয়ে টাকা দিন</p>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition ${
                paymentMethod === "online" ? "border-black bg-gray-50" : "border-gray-300"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="text-xl">💳📱</span>
              <div>
                <p className="font-semibold">Mobile Banking / Card</p>
                <p className="text-xs text-gray-500">bKash, Nagad, Rocket, Visa/Mastercard</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
          <span>Total</span>
          <span>৳{totalPrice.toFixed(2)}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading
            ? "প্রসেস হচ্ছে..."
            : paymentMethod === "cod"
            ? "Confirm Order (COD)"
            : "Proceed to Payment"}
        </button>
      </form>
    </main>
  );
};

export default Checkout;