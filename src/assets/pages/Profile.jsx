import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Please Login
          </h1>

          <a
            href="/login"
            className="inline-block mt-4 px-5 py-2 bg-gray-950 text-white rounded-lg"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-950">
            My Profile
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">

          {/* Profile Icon */}
          <div className="flex items-center gap-5 mb-8">

            <div className="w-20 h-20 bg-gray-950 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-950">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.email}
              </p>
            </div>

          </div>

          {/* User Information */}
          <div className="space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                Full Name
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email Address
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                User ID
              </p>

              <p className="font-mono text-sm text-gray-700 mt-1 break-all">
                {user.id}
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;