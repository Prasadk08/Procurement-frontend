import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AI RFP System
        </Link>
        <div className="flex gap-6 text-gray-800 font-medium">
          <Link href="/rfp/create" className="hover:text-blue-600">
            Create RFP
          </Link>
          <Link href="/vendor" className="hover:text-blue-600">
            Vendors
          </Link>
        </div>
      </div>
    </nav>
  );
};
