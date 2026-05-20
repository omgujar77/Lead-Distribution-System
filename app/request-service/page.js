"use client";

import { useState } from "react";

export default function RequestServicePage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    serviceType: "Service 1",
    description: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {
      const response = await fetch(
        "/api/leads/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setMessage(
          "Lead submitted successfully!"
        );

        setFormData({
          name: "",
          phone: "",
          city: "",
          serviceType:
            "Service 1",
          description: "",
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 flex items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-2xl">
        
        {/* TOP HEADER */}
        <div className="text-center mb-8">
          
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black text-white text-2xl font-bold shadow-lg mb-4">
            LS
          </div>

          <h1 className="text-4xl font-bold text-gray-900">
            Request Service
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Submit your service request and our team will connect with you shortly.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-3xl p-6 sm:p-10">
          
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* CITY */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* SERVICE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Type
              </label>

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-black placeholder:text-gray-400 focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 outline-none transition-all duration-200"
              >
                <option>
                  Service 1
                </option>

                <option>
                  Service 2
                </option>

                <option>
                  Service 3
                </option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your service requirement..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 text-black focus:bg-white focus:border-black focus:ring-4 focus:ring-black/10 outline-none transition-all duration-200 resize-none"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {loading
                ? "Submitting..."
                : "Submit Request"}
            </button>
          </form>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mt-6 text-center text-sm font-medium px-4 py-3 rounded-xl ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}