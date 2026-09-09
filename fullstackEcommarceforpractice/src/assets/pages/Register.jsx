import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      // Token save
      localStorage.setItem("token", data.token);

      // User information save
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Registration successful!");

      // পরে চাইলে এখানে login/home page-এ পাঠাবো
      // window.location.href = "/login";

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="text-center mb-8">

          <div className="w-14 h-14 bg-gray-950 text-white rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
            🛍️
          </div>

          <h1 className="text-3xl font-extrabold text-gray-950">
            Create an account
          </h1>

          <p className="text-gray-500 mt-2">
            Join Shopora and start shopping
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full h-12 bg-gray-950 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-gray-950 hover:underline"
            >
              Login
            </a>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;