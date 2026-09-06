import { useState } from "react";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      {/* Top Bar */}
      <div className="bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between text-xs">
          <p>Free shipping on orders over $50</p>

          <div className="hidden sm:flex gap-5">
            <a href="#">Track Order</a>
            <a href="#">Help Center</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-20 flex items-center justify-between gap-6">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-950 text-white rounded-xl flex items-center justify-center">
              🛍️
            </div>

            <div>
              <h1 className="font-extrabold text-xl">
                Shopora
              </h1>

              <p className="text-[10px] text-gray-500">
                Everything you need
              </p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <a href="/">Home</a>
            <a href="#categories">Categories</a>
            <a href="#products">Products</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </nav>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">

              <input
                type="text"
                placeholder="Search products..."
                className="w-full h-11 px-4 pr-20 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900"
              />

              <button className="absolute right-1 top-1 bottom-1 px-4 bg-gray-950 text-white rounded-lg text-sm">
                Search
              </button>

            </div>
          </div>

          {/* Cart */}
          <a
            href="/cart"
            className="relative w-11 h-11 rounded-xl border border-gray-200 flex items-center justify-center"
          >
            🛒

            <span className="absolute -top-2 -right-2 bg-gray-950 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden w-11 h-11 border rounded-xl"
          >
            ☰
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden border-t py-5">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              <a href="/">Home</a>
              <a href="#categories">Categories</a>
              <a href="#products">Products</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        )}

      </div>

    </header>
  );
};

export default Header;