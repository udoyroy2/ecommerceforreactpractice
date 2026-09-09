const Contact = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-16">

      <div className="max-w-4xl mx-auto">

        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Contact Us
        </p>

        <h1 className="text-4xl font-extrabold mt-2 mb-10">
          Get In Touch
        </h1>


        {/* Contact Information */}
        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">
            Contact Information
          </h2>

          <div className="space-y-3 text-gray-600">

            <p>
              <strong>Phone:</strong> +880 1XXXXXXXXX
            </p>

            <p>
              <strong>Email:</strong> support@example.com
            </p>

            <p>
              <strong>Address:</strong> Dhaka, Bangladesh
            </p>

          </div>

        </section>


        {/* Location */}
        <section className="mb-12">

          <h2 className="text-2xl font-bold mb-5">
            Location
          </h2>

          <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center">
            <p className="text-gray-500">
              Store Location / Google Map
            </p>
          </div>

        </section>


        {/* Contact Form */}
        <section>

          <h2 className="text-2xl font-bold mb-5">
            Send Us a Message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-black"
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              Send Message
            </button>

          </form>

        </section>

      </div>

    </main>
  );
};

export default Contact;