"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function SendRfpSection({ rfpId, onSent }: any) {
  const [vendors, setVendors] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

  // Fetch all vendors
  useEffect(() => {
    const loadVendors = async () => {
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
    };

    loadVendors();
  }, []);

  const toggleVendor = (vendorId: string) => {
    setSelected((prev) =>
      prev.includes(vendorId)
        ? prev.filter((id) => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const sendRfp = async () => {
    if (!rfpId) {
      toast.error("Invalid RFP ID");
      return;
    }

    if (selected.length === 0) {
      toast.error("Please select at least one vendor!");
      return;
    }

    setSending(true);
    try {
      await axios.post(`https://procurement-backend-1zi3.onrender.com/proposal/${rfpId}/send`, {
      // await axios.post(`http://localhost:8080/proposal/${rfpId}/send`, {
        vendors: selected,
      });

      setSelected([]);
      toast.success("RFP sent to vendors successfully!");
      onSent(); // refresh parent
    } catch (err: any) {
      console.error("Failed to send RFP:", err);
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to send RFP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Send RFP to Vendors</h2>

      {vendors.length === 0 ? (
        <p className="text-gray-500">No vendors available.</p>
      ) : (
        <>
          {/* Send button */}
          <button
            onClick={sendRfp}
            disabled={sending || selected.length === 0}
            className={`mb-4 px-6 py-2 rounded-lg text-white 
              ${
                sending || selected.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {sending ? "Sending..." : "Send RFP"}
          </button>

          {/* Vendor list */}
          <div className="space-y-3">
            {vendors.map((v: any) => (
              <div
                key={v._id}
                className="flex justify-between items-center p-3 border rounded-lg bg-white"
              >
                <div>
                  <p className="font-medium">{v.name}</p>
                  <p className="text-sm text-gray-500">{v.email}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selected.includes(v._id)}
                  onChange={() => toggleVendor(v._id)}
                  className="w-5 h-5"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
