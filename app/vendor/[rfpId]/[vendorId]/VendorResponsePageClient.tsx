"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface VendorResponsePageClientProps {
  rfpId: string;
  vendorId: string;
}

export default function VendorResponsePageClient({
  rfpId,
  vendorId,
}: VendorResponsePageClientProps) {
  const [rfp, setRfp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [amount, setAmount] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [warranty, setWarranty] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function loadRfp() {
      if (!rfpId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/rfp/${rfpId}`);

        if (res?.data) {
          setRfp(res.data);
        } else {
          throw new Error("Invalid response data");
        }
      } catch (err: any) {
        console.error("Failed to load RFP:", err);
        toast.error(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to load RFP details. Please try again."
        );
        setRfp(null);
      } finally {
        setLoading(false);
      }
    }
    loadRfp();
  }, [rfpId]);

  async function submitResponse() {
    if (!rfpId || !vendorId) {
      toast.error("Invalid RFP or Vendor ID");
      return;
    }

    if (!amount || !deliveryDays || !warranty) {
      toast.error(
        "Please fill in all required fields (Amount, Delivery Days, Warranty)"
      );
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/proposal/${rfpId}/${vendorId}/submit`,
        {
          quotedAmount: amount,
          deliveryDays,
          warrantyMonths: warranty,
          notes: notes || "",
        }
      );

      toast.success("Response submitted successfully!");

      // Clear form
      setAmount("");
      setDeliveryDays("");
      setWarranty("");
      setNotes("");
    } catch (err: any) {
      console.error("Failed to submit response:", err);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to submit response. Please try again.";
      toast.error(errorMessage);
    }
  }

  if (loading)
    return <p className="text-center mt-10">Loading RFP details...</p>;

  if (!rfp)
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <p className="text-red-500 text-center">
            Failed to load RFP details. Please try again later.
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-10">
      {/* ------------------ RFP DETAILS (Top Card) ------------------ */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-3">
          {rfp?.title || "Untitled RFP"}
        </h2>
        <p className="opacity-90 mb-4">
          {rfp?.description || "No description provided"}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-white text-black rounded-lg p-3 shadow">
            <p className="text-sm text-gray-500">Category</p>
            <p className="font-semibold">{rfp?.category || "N/A"}</p>
          </div>

          <div className="bg-white text-black rounded-lg p-3 shadow">
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="font-semibold">{rfp?.deadline || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* ------------------ VENDOR FORM ------------------ */}
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h3 className="text-2xl font-bold mb-6 text-blue-600">
          Submit Your Proposal
        </h3>

        <div className="space-y-5">
          <div>
            <label className="font-semibold">Quoted Amount</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter your quoted amount"
            />
          </div>

          <div>
            <label className="font-semibold">Delivery Days</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              type="number"
              value={deliveryDays}
              onChange={(e) => setDeliveryDays(e.target.value)}
              placeholder="Number of days required for delivery"
            />
          </div>

          <div>
            <label className="font-semibold">Warranty (Months)</label>
            <input
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              type="number"
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              placeholder="Warranty period in months"
            />
          </div>

          <div>
            <label className="font-semibold">Additional Notes</label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter any extra details..."
            />
          </div>

          <button
            onClick={submitResponse}
            className="w-full bg-blue-600 text-white font-semibold text-lg py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Response
          </button>
        </div>
      </div>
    </div>
  );
}
