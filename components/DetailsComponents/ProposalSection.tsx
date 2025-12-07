

import Link from "next/link";


const ProposalsSection = ({ proposals, rfpId }: any) => {
  const proposalList = proposals || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vendor Proposals</h2>

      {proposalList.length > 0 && (
        <Link
          href={`/rfp/${rfpId}/compare`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Compare Vendors
        </Link>
      )}

      {proposalList.length === 0 ? (
        <p className="text-gray-600 text-center p-6 bg-gray-100 rounded-lg">
          No proposals received yet.
        </p>
      ) : (
        <table className="w-full border-collapse mt-4">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">Vendor</th>
              <th className="border p-3">Quoted Amount</th>
              <th className="border p-3">Delivery</th>
              <th className="border p-3">Warranty</th>
              <th className="border p-3">Notes</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {proposalList.map((p: any, i: number) => (
              <tr key={i} className="text-center hover:bg-gray-50 transition">
                <td className="border p-3">{p?.vendor?.name || "N/A"}</td>
                <td className="border p-3">{p?.quotedAmount || "N/A"}</td>
                <td className="border p-3">{p?.deliveryDays || "N/A"}</td>
                <td className="border p-3">{p?.warrantyMonths || "N/A"}</td>

                {/* ----- NEW NOTES COLUMN ----- */}
                <td className="border p-3">
                  <div className="relative group inline-block">
                    <button className="text-blue-600 font-medium underline">
                      View
                    </button>

                    {/* Tooltip */}
                    <div className="absolute hidden group-hover:block bg-white shadow-xl border w-64 p-4 rounded-lg z-10 text-left">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {p?.notes || "No notes provided."}
                      </p>
                    </div>
                  </div>
                </td>

                <td
                  className={`border p-3 font-bold 
                  ${
                    p?.status === "Received"
                      ? "text-green-600"
                      : "text-orange-500"
                  }
                `}
                >
                  {p?.status || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ProposalsSection;