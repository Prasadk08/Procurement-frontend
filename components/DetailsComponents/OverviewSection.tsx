


const OverviewSection = ({ items }: any) => {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Requested Items</h2>
        <p className="text-gray-500">No items specified.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-2">Requested Items</h2>
      <table className="w-full border-collapse mb-4">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-3">Item</th>
            <th className="border p-3">Quantity</th>
            <th className="border p-3">Specs</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any, i: number) => (
            <tr key={i} className="text-center">
              <td className="border p-3">{item?.name || "N/A"}</td>
              <td className="border p-3">{item?.qty || "N/A"}</td>
              <td className="border p-3">{item?.specs || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default OverviewSection;