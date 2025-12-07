"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RfpForm() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rfpData, setRfpData] = useState<any | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    setError("");
    setLoading(true);
    setRfpData(null);

    try {
      // const res = await axios.post("https://procurement-backend-1zi3.onrender.com/rfp/generate-rfp", {
      const res = await axios.post("http://localhost:8080/rfp/generate-rfp", {
        input,
      });

      if (res?.data) {
        setRfpData(res.data);
        setInput("");
        toast.success("RFP generated successfully!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Failed to generate RFP:", err);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to generate RFP. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Create RFP</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">
          Describe your RFP in natural language:
        </label>

        <textarea
          className="w-full h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Write your company name & email first. Company Name: ABC Industries Pvt Ltd Email: info@abc.com Then describe your RFP requirements: Need 20 laptops with 16GB RAM..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <div className="flex items-center gap-3 mt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Generate Structured RFP"}
          </button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </form>

      {/* Preview Section */}
      {rfpData && (
        <div className="mt-8 bg-white border rounded-xl shadow-lg p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">
              📝 RFP Summary (Review Before Sending)
            </h3>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium">
              {rfpData.status || "Draft"}
            </span>
          </div>

          {/* Title */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">RFP Title</h4>
            <p className="mt-1 text-gray-900 text-base">
              {rfpData.title || "Untitled RFP"}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">Description</h4>
            <p className="mt-1 text-gray-700 leading-relaxed">
              {rfpData.description || "No description provided"}
            </p>
          </div>

          {/* Requirements */}
          {rfpData.requirements?.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700">
                Requirements
              </h4>
              <ul className="mt-2 space-y-2">
                {rfpData.requirements.map((req: any, index: number) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 border rounded-lg flex items-start gap-2"
                  >
                    <span className="mt-1 text-blue-600">•</span>
                    <span className="text-gray-800">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Budget */}
          <div>
            <h4 className="text-lg font-semibold text-gray-700">
              Estimated Budget
            </h4>
            <p className="mt-1 text-blue-700 font-bold text-xl">
              ₹ {rfpData.budget?.toLocaleString() || "Not provided"}
            </p>
          </div>

          {/* Timeline */}
          {rfpData.timeline && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700">Timeline</h4>
              <p className="mt-1 text-gray-700">{rfpData.timeline}</p>
            </div>
          )}

          {/* Contact Details */}
          {rfpData.contact && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700">
                Contact Details
              </h4>
              <p className="mt-1 text-gray-700">
                {rfpData.contact.name} • {rfpData.contact.email}
              </p>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="pt-4 flex gap-4">
            <Link
              href={`/rfp/${rfpData._id}`}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              View Full Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
