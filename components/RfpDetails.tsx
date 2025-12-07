"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SendRfpSection from "./SendRfpSection";

import toast from "react-hot-toast";

import  SummaryCard  from "./DetailsComponents/SummaryCard";
import OverviewSection from "./DetailsComponents/OverviewSection";
import VendorsSection from "./DetailsComponents/VendorSection";
import ProposalsSection from "./DetailsComponents/ProposalSection";

export default function RfpDetails({ rfpId }: { rfpId: string }) {
  const [rfp, setRfp] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchRfp = async () => {
      try {
        setLoading(true);

        // const res = await fetch(`https://procurement-backend-1zi3.onrender.com/rfp/${rfpId}`);
        const res = await fetch(`http://localhost:8080/rfp/${rfpId}`);

        if (!res.ok) {
          throw new Error(
            `Failed to fetch RFP: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (data) {
          setRfp(data);
          toast.success("RFP details loaded successfully!");
        } else {
          throw new Error("Invalid response data");
        }
      } catch (error: any) {
        console.error("Failed to fetch RFP:", error);
        toast.error(
          error?.message || "Failed to load RFP details. Please try again."
        );
        setRfp(null);
      } finally {
        setLoading(false);
      }
    };

    if (rfpId) {
      fetchRfp();
    }
  }, [rfpId]);

  if (loading) return <p className="p-6">Loading RFP details...</p>;

  if (!rfp)
    return (
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <p className="text-red-500">
          Failed to load RFP details. Please try again later.
        </p>
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">{rfp.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Created on {rfp.createdAt}
          </p>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <SummaryCard label="Budget" value={rfp.budget} />
        <SummaryCard
          label="Delivery Timeline"
          value={`${rfp.deliveryDays} Days`}
        />
        <SummaryCard label="Warranty" value={`${rfp.warrantyMonths} Months`} />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b pb-2 mb-8">
        {["overview", "vendors", "proposals", "send"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg font-medium transition 
              ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }
            `}
          >
            {tab === "overview" && "Overview"}
            {tab === "vendors" && "Vendors Contacted"}
            {tab === "proposals" && "Vendor Proposals"}
            {tab === "send" && "Send RFP to Vendors"}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Overview Section */}
        {activeTab === "overview" && <OverviewSection items={rfp.items} />}

        {/* Vendors Section */}
        {activeTab === "vendors" && <VendorsSection vendors={rfp.vendors} />}

        {/* Proposals Section */}
        {activeTab === "proposals" && (
          <ProposalsSection proposals={rfp.vendorResponses} rfpId={rfp._id} />
        )}

        {/* Send RFP Section */}
        {activeTab === "send" && (
          <SendRfpSection
            rfpId={rfpId}
            onSent={() => window.location.reload()}
          />
        )}
      </motion.div>
    </div>
  );
}
