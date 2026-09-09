import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
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

            // JWT token save
            localStorage.setItem("token", data.token);

            // User information save
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
                navigate("/admin"); // 🆕 Admin হলে সরাসরি Admin Dashboard
            } else {
                navigate("/Profile"); // সাধারণ ইউজার হলে Profile
            }

  

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
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your Shopora account
                    </p>

                </div>

                {/* Login Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

                    <form onSubmit={handleLogin} className="space-y-5">

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
                                className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full h-12 bg-gray-950 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
                        >
                            Login
                        </button>

                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="font-semibold text-gray-950 hover:underline"
                        >
                            Create Account
                        </a>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;