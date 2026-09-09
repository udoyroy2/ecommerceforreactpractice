import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">❌</div>
      <h1 className="text-3xl font-extrabold mb-4">Payment ব্যর্থ হয়েছে</h1>
      <p className="text-gray-500 mb-8">
        দুঃখিত, আপনার পেমেন্ট সম্পন্ন করা যায়নি। আবার চেষ্টা করুন।
      </p>
      <Link
        to="/"
        className="inline-block bg-black text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        হোমে ফিরে যান
      </Link>
    </main>
  );
};

export default PaymentFailed;