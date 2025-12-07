"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RfpList() {
  const [rfps, setRfps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRfps() {
      try {
        setLoading(true);
        const res = await axios.get("https://procurement-backend-1zi3.onrender.com/rfp/rfps");

        if (res?.data) {
          setRfps(Array.isArray(res.data) ? res.data : []);
        } else {
          setRfps([]);
        }
      } catch (err: any) {
        console.error("Failed to load RFPs:", err);
        toast.error(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to load RFPs. Please try again."
        );
        setRfps([]);
      } finally {
        setLoading(false);
      }
    }
    loadRfps();
  }, []);

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Past RFPs</h3>
        <p className="text-gray-500">Loading RFPs...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Past RFPs</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rfps.map((r) => (
          <Link href={`/rfp/${r?._id}`} key={r?._id || Math.random()}>
            <div className="p-5 bg-white rounded-xl shadow hover:shadow-xl border hover:border-indigo-500 transition cursor-pointer">
              <h4 className="text-lg font-bold text-gray-800">
                {r?.title || "Untitled RFP"}
              </h4>

              <p className="mt-1 text-sm text-gray-600">
                Budget:
                <span className="font-semibold text-gray-800">
                  {" "}
                  ${r?.budget?.toLocaleString?.() || "-"}
                </span>
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {r?.createdAt
                    ? new Date(r.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>

                <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                  {r?.status || "Draft"}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {rfps.length === 0 && (
          <p className="text-gray-500">No RFPs yet — create one above.</p>
        )}
      </div>
    </div>
  );
}
