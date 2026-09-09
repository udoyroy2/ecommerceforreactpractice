import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);

  // Image file
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    categories: "",
    price: "",
    oldPrice: "",
    discount: "",
    rating: "",
    stock: "",
  });

  const [message, setMessage] = useState("");

  // =====================================================
  // ADMIN CHECK
  // =====================================================

  if (!token || user.role !== "admin") {
    return (
      <Navigate
        to={token ? "/Profile" : "/login"}
        replace
      />
    );
  }

  // =====================================================
  // LOAD PRODUCTS
  // =====================================================

  const loadProducts = () => {
    setLoading(true);

    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
    }
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setFormData({
      name: "",
      categories: "",
      price: "",
      oldPrice: "",
      discount: "",
      rating: "",
      stock: "",
    });

    setImageFile(null);

    setEditingProduct(null);

    // Clear file input
    const fileInput = document.getElementById(
      "product-image"
    );

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // =====================================================
  // EDIT PRODUCT
  // =====================================================

  const handleEditClick = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,

      categories: product.categories.join(", "),

      price: product.price,

      oldPrice: product.oldPrice || "",

      discount: product.discount || "",

      rating: product.rating || "",

      stock: product.stock ?? "",
    });

    // New image is optional during edit
    setImageFile(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SUBMIT
  // ADD + UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // New product must have image
    if (!editingProduct && !imageFile) {
      setMessage("Please select a product image");

      return;
    }

    // ===================================================
    // FormData
    // ===================================================

    const data = new FormData();

    data.append("name", formData.name);

    data.append(
      "categories",
      JSON.stringify(
        formData.categories
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean)
      )
    );

    data.append("price", formData.price);

    data.append("oldPrice", formData.oldPrice);

    data.append(
      "discount",
      Number(formData.discount) || 0
    );

    data.append(
      "rating",
      Number(formData.rating) || 0
    );

    data.append(
      "stock",
      Number(formData.stock) || 0
    );

    // Add image only if selected
    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const url = editingProduct
        ? `${API_URL}/products/${editingProduct._id}`
        : `${API_URL}/products`;

      const method = editingProduct
        ? "PUT"
        : "POST";

      const res = await fetch(url, {
        method,

        headers: {
          Authorization: `Bearer ${token}`,
        },

        body: data,
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(
          result.message ||
            "কিছু একটা ভুল হয়েছে"
        );

        return;
      }

      setMessage(
        editingProduct
          ? "প্রোডাক্ট আপডেট হয়েছে!"
          : "নতুন প্রোডাক্ট যোগ হয়েছে!"
      );

      resetForm();

      loadProducts();
    } catch (err) {
      console.error(err);

      setMessage(
        "সার্ভারে সমস্যা হয়েছে"
      );
    }
  };

  // =====================================================
  // DELETE PRODUCT
  // =====================================================

  const handleDelete = async (id) => {
    if (
      !confirm(
        "আপনি কি নিশ্চিত এই প্রোডাক্টটি ডিলিট করতে চান?"
      )
    ) {
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/products/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          data.message ||
            "ডিলিট করা যায়নি"
        );

        return;
      }

      setMessage(
        "প্রোডাক্ট ডিলিট হয়েছে"
      );

      loadProducts();
    } catch (err) {
      console.error(err);

      setMessage(
        "সার্ভারে সমস্যা হয়েছে"
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">

      {/* ================= HEADER ================= */}

      <h1 className="text-3xl font-extrabold mb-8">
        Admin Dashboard
      </h1>

      {/* ================= MESSAGE ================= */}

      {message && (
        <p className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg mb-6">
          {message}
        </p>
      )}

      {/* ================= ADD / EDIT FORM ================= */}

      <div className="border border-gray-200 rounded-2xl p-6 mb-10">

        <h2 className="text-xl font-bold mb-4">
          {editingProduct
            ? "প্রোডাক্ট এডিট করুন"
            : "নতুন প্রোডাক্ট যোগ করুন"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-4"
        >

          {/* NAME */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Nike Air Max"
            />
          </div>

          {/* CATEGORY */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Categories
            </label>

            <input
              type="text"
              name="categories"
              value={formData.categories}
              onChange={handleChange}
              placeholder="Men, Shoes"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <p className="text-xs text-gray-500 mt-1">
              একাধিক category হলে comma ব্যবহার করুন
            </p>
          </div>

          {/* PRICE */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Price
            </label>

            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="8500"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* OLD PRICE */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Old Price
            </label>

            <input
              type="text"
              name="oldPrice"
              value={formData.oldPrice}
              onChange={handleChange}
              placeholder="10000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* DISCOUNT */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Discount (%)
            </label>

            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* RATING */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Rating
            </label>

            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="5"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* STOCK */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {/* IMAGE UPLOAD */}

          <div>
            <label className="block text-sm font-semibold mb-1">
              Product Image
            </label>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!editingProduct}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            {imageFile && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: {imageFile.name}
              </p>
            )}

            {editingProduct && !imageFile && (
              <p className="text-xs text-gray-500 mt-2">
                নতুন image select না করলে আগের image থাকবে।
              </p>
            )}
          </div>

          {/* IMAGE PREVIEW */}

          {imageFile && (
            <div className="sm:col-span-2">

              <p className="text-sm font-semibold mb-2">
                Image Preview
              </p>

              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-xl border"
              />

            </div>
          )}

          {/* BUTTONS */}

          <div className="sm:col-span-2 flex gap-3">

            <button
              type="submit"
              className="bg-black text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              {editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingProduct && (
              <button
                type="button"
                onClick={resetForm}
                className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>

      {/* ================= PRODUCT LIST ================= */}

      <h2 className="text-xl font-bold mb-4">
        সব প্রোডাক্ট ({products.length})
      </h2>

      {loading ? (
        <p className="text-gray-500">
          Loading...
        </p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">
          কোনো প্রোডাক্ট নেই।
        </p>
      ) : (
        <div className="space-y-3">

          {products.map((product) => (

            <div
              key={product._id}
              className="flex items-center gap-4 border border-gray-200 rounded-xl p-4"
            >

              {/* PRODUCT IMAGE */}

              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />

              {/* PRODUCT INFO */}

              <div className="flex-1">

                <h3 className="font-bold">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">
                  ৳{product.price} · Stock:{" "}
                  {product.stock ?? "N/A"}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {product.categories?.join(", ")}
                </p>

              </div>

              {/* EDIT */}

              <button
                onClick={() =>
                  handleEditClick(product)
                }
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Edit
              </button>

              {/* DELETE */}

              <button
                onClick={() =>
                  handleDelete(product._id)
                }
                className="text-sm font-semibold text-red-600 hover:underline"
              >
                Delete
              </button>

            </div>

          ))}

        </div>
      )}

    </main>
  );
};

export default AdminDashboard;