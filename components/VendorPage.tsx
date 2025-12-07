"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VendorPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please provide vendor name and email");
      return;
    }

    try {
      const res = await axios.post(
        "https://procurement-backend-1zi3.onrender.com/vendor/add-vendor",
        form
      );

      if (res?.data?.vendor) {
        setVendors([res.data.vendor, ...vendors]);
        setForm({ name: "", email: "", phone: "" });
        toast.success("Vendor added successfully!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Failed to add vendor:", err);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to add vendor. Please try again.";
      toast.error(errorMessage);
    }
  };
  const deleteVendor = async (id: string) => {
    if (!id) {
      toast.error("Invalid vendor ID");
      return;
    }

    try {
      await axios.delete(`https://procurement-backend-1zi3.onrender.com/vendor/${id}`);
      setVendors(vendors.filter((v) => v._id !== id));
      toast.success("Vendor deleted successfully!");
    } catch (err: any) {
      console.error("Failed to delete vendor:", err);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to delete vendor. Please try again.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("https://procurement-backend-1zi3.onrender.com/vendor/getvendor");

        if (res?.data) {
          setVendors(Array.isArray(res.data) ? res.data : []);
        } else {
          setVendors([]);
        }
      } catch (err: any) {
        console.error("Failed to load vendors:", err);
        toast.error(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to load vendors. Please try again."
        );
        setVendors([]);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">
        Vendor Management
      </h2>

      {/* Add Vendor */}
      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Vendor Name"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <button
          type="submit"
          className="md:col-span-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Add Vendor
        </button>
      </form>

      {/* Vendor List */}
      <h3 className="text-xl font-semibold mb-4">Saved Vendors</h3>

      {vendors.length === 0 ? (
        <p className="text-gray-500">No vendors added yet.</p>
      ) : (
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Phone</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor._id} className="text-center">
                <td className="border p-3">{vendor.name}</td>
                <td className="border p-3">{vendor.email}</td>
                <td className="border p-3">{vendor.phone || "-"}</td>
                <td className="border p-3">
                  <button
                    onClick={() => deleteVendor(vendor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
