"use client";

import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { Award } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

export default function VendorComparePage({ rfpId }: any) {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState("");

  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    const loadAI = async () => {
      if (!rfpId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://procurement-backend-1zi3.onrender.com/compare/${rfpId}/ai-compare`
        );

        if (!res.ok) {
          throw new Error(
            `Failed to fetch AI comparison: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (data?.comparisons && Array.isArray(data.comparisons)) {
          setProposals(data.comparisons);
          setReason(data.bestVendor?.reason || "Reason not provided by AI.");
          toast.success("AI comparison loaded!");
        } else {
          throw new Error("Invalid response data format");
        }
      } catch (error: any) {
        console.error("Failed to fetch AI comparison:", error);
        toast.error(
          error?.message || "Failed to load AI comparison. Please try again."
        );
        setProposals([]);
        setReason("");
      } finally {
        setLoading(false);
      }
    };

    loadAI();
  }, [rfpId]);

  useEffect(() => {
    if (!loading && proposals.length > 0) {
      confettiRef.current?.fire({});
    }
  }, [loading, proposals]);

  if (loading)
    return <p className="p-6">Analyzing vendor proposals with AI...</p>;

  if (!proposals || proposals.length === 0) {
    return (
      <div className="relative pt-24 max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">AI Vendor Comparison</h1>
        <div className="bg-white shadow-lg p-6 rounded-2xl border">
          <p className="text-gray-600 text-center">
            No vendor proposals available for comparison. Please ensure vendors
            have submitted their proposals.
          </p>
        </div>
      </div>
    );
  }

  const bestVendor = proposals.reduce((max, v) =>
    (v?.overallScore || 0) > (max?.overallScore || 0) ? v : max
  );

  return (
    <div className="relative pt-24 max-w-6xl mx-auto p-6">
      {/* CONFETTI */}
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      <h1 className="text-3xl font-bold mb-6 relative z-10">
        AI Vendor Comparison
      </h1>

      {/* AI RECOMMENDATION SECTION */}
      <div className="bg-white shadow-lg p-6 rounded-2xl border mb-10 relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <Award className="text-yellow-500 w-8 h-8" />
          <h2 className="text-xl font-semibold">AI Recommendation</h2>
        </div>

        <p className="text-gray-700 mb-4">
          Based on pricing, delivery, warranty & quality —
          <span className="font-semibold text-green-600">
            {" "}
            {bestVendor?.vendor || "N/A"}
          </span>{" "}
          is the best vendor with an AI score of{" "}
          <span className="font-semibold">
            {bestVendor?.overallScore || 0}/10
          </span>
          .
        </p>

        {/* REASONING CARD (new) */}
        <div className="bg-gray-50 border rounded-xl p-5 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Why this vendor?
          </h3>
          <ul className="list-disc ml-5 text-gray-700 leading-relaxed space-y-1">
            {reason
              .split(".")
              .map((r: string, i: number) =>
                r.trim() ? <li key={i}>{r.trim()}.</li> : null
              )}
          </ul>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-2xl relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Vendor</th>
              <th className="p-4">Price Score</th>
              <th className="p-4">Delivery Score</th>
              <th className="p-4">Warranty Score</th>
              <th className="p-4">Overall Score</th>
            </tr>
          </thead>

          <tbody>
            {proposals.map((p, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{p?.vendor || "N/A"}</td>
                <td className="p-4">{p?.priceScore ?? "N/A"}</td>
                <td className="p-4">{p?.deliveryScore ?? "N/A"}</td>
                <td className="p-4">{p?.warrantyScore ?? "N/A"}</td>
                <td className="p-4 font-semibold">
                  {p?.overallScore ?? "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center mt-10 text-gray-600 relative z-10">
        Powered by <span className="font-semibold">AI Scoring Engine</span>
      </p>
    </div>
  );
}
