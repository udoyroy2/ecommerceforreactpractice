const PaymentMethods = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 mb-16">

      <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10">

        {/* Heading */}
        <div className="text-center">

          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
            Secure Payment
          </p>

          <h2 className="text-3xl font-extrabold mt-2">
            Pay With
          </h2>

          <p className="text-gray-500 mt-3">
            We support secure and convenient payment methods.
          </p>

        </div>


        {/* SSLCOMMERZ Payment Image */}
        <div className="mt-8 flex justify-center">

          <img
            src="/SSLCOMMERZ-Pay-With-logo-All-Size_Aug-21-02-2048x240.png"
            alt="Payment methods supported by SSLCOMMERZ"
            className="w-full max-w-5xl h-auto object-contain"
          />

        </div>

      </div>

    </section>
  );
};

export default PaymentMethods;