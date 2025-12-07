const SummaryCard = ({ label, value }: any) => (
  <div className="p-4 bg-gray-100 rounded-xl shadow-sm">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-xl font-semibold mt-1">{value}</p>
  </div>
);


export default SummaryCard;