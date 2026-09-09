import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderIds } = location.state || {}; // 🆕 NEW

  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">✅</div>

      <h1 className="text-3xl font-extrabold mb-4">
        অর্ডার সম্পন্ন হয়েছে!
      </h1>

      <p className="text-gray-500 mb-6">
        আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।
      </p>

      {/* 🆕 NEW: এক বা একাধিক Order ID দেখানো */}
      {orderIds && orderIds.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            {orderIds.length > 1 ? "Order IDs:" : "Order ID:"}
          </p>
          {orderIds.map((id) => (
            <p key={id} className="text-xs text-gray-500 font-mono break-all">
              {id}
            </p>
          ))}
        </div>
      )}

      <Link
        to="/"
        className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        হোমে ফিরে যান
      </Link>
    </main>
  );
};

export default OrderSuccess;