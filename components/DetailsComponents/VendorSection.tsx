

const VendorsSection = ({ vendors }: any) => {
  const vendorList = vendors || [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vendors Contacted</h2>

      {vendorList.length === 0 ? (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
          <p className="text-yellow-700 font-medium">
            No vendors contacted yet.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Send this RFP to vendors to start receiving proposals.
          </p>
        </div>
      ) : (
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-3">Vendor</th>
              <th className="border p-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {vendorList.map((v: any) => (
              <tr key={v?._id || Math.random()} className="text-center">
                <td className="border p-3">{v?.name || "N/A"}</td>
                <td className="border p-3">{v?.email || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VendorsSection;