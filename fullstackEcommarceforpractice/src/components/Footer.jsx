const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white mt-20">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-2">

              <div className="w-10 h-10 bg-white text-gray-950 rounded-xl flex items-center justify-center">
                🛍️
              </div>

              <div>
                <h2 className="text-xl font-extrabold">
                  Shopora
                </h2>

                <p className="text-[10px] text-gray-400">
                  Everything you need
                </p>
              </div>

            </div>

            <p className="text-gray-400 text-sm leading-6 mt-5 max-w-xs">
              Discover quality products, great prices and a shopping
              experience made for you.
            </p>

          </div>


          {/* Pages */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Pages
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="/"
                  className="hover:text-white transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#categories"
                  className="hover:text-white transition"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="#products"
                  className="hover:text-white transition"
                >
                  Products
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="hover:text-white transition"
                >
                  About Us
                </a>
              </li>

            </ul>

          </div>


          {/* Help */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Help
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">

              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/refund-exchange"
                  className="hover:text-white transition"
                >
                  Refund, Trial & Exchange Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>

            </ul>

          </div>


          {/* Contact Information */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Contact Information
            </h3>

            <div className="space-y-4 text-sm text-gray-400">

              <div className="flex gap-3">
                <span>📍</span>

                <p>
                  Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex gap-3">
                <span>📞</span>

                <p>
                  +880 1XXX-XXXXXX
                </p>
              </div>

              <div className="flex gap-3">
                <span>✉️</span>

                <p>
                  support@shopora.com
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Location */}
        <div className="border-t border-gray-800 mt-12 pt-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <h3 className="font-bold text-lg">
                Contact Information & Location
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Visit our store or contact us online for any questions
                regarding your order.
              </p>

            </div>

            <a
              href="#"
              className="inline-flex items-center justify-center bg-white text-gray-950 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition"
            >
              View Location
            </a>

          </div>

        </div>

      </div>


      {/* Bottom Footer */}
      <div className="border-t border-gray-800">

        <div className="max-w-7xl mx-auto px-4 py-5">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">

            <p className="text-gray-500 text-center sm:text-left">
              © 2026 Shopora. All rights reserved.
            </p>

            <p className="text-gray-500">
              Designed & Developed by{" "}
              <span className="text-white font-semibold">
                Udoy Roy
              </span>
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;