import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">

      {/* About Us */}
      <section className="max-w-4xl mx-auto text-center">

        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          About Us
        </p>

        <h1 className="text-4xl font-extrabold mt-2 mb-6">
          About Our Store
        </h1>

        <p className="text-gray-600 leading-7">
          Welcome to our online store. We provide quality fashion
          products at affordable prices. Our collection includes
          shirts, T-shirts, polo shirts, pants, shoes and other
          fashion items.
        </p>

        <p className="text-gray-600 leading-7 mt-4">
          Our goal is to make online shopping simple, convenient and
          enjoyable by providing quality products and a smooth
          shopping experience.
        </p>

      </section>


      {/* Help */}
      <section className="max-w-4xl mx-auto mt-16">

        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Help
        </p>

        <h2 className="text-3xl font-extrabold mt-2 mb-6">
          Policies & Information
        </h2>

        <div className="space-y-3">

          <Link
            to="/privacy-policy"
            className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            Privacy Policy →
          </Link>

          <Link
            to="/refund-exchange"
            className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            Refund, Trial & Exchange Policy →
          </Link>

          <Link
            to="/terms"
            className="block border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
          >
            Terms & Condition →
          </Link>

        </div>

      </section>

    </main>
  );
};

export default About;