import { ArrowRight, FileText, Users, FileSearch } from "lucide-react";
import Link from "next/link";
import ShineBorder from "./ui/shine-border";
import { AuroraText } from "./ui/aurora-text";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
         <AuroraText>AI-Powered</AuroraText> Procurement & RFP Automation
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Create RFPs, evaluate vendor proposals, and automate procurement
          workflows with AI. Save time, reduce errors, and make smarter
          purchasing decisions.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/rfp/create"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition transform flex items-center gap-2"
          >
            Get Started <ArrowRight size={18} />
          </Link>

          <Link
            href="/rfp/list"
            className="px-8 py-4 bg-white text-blue-600 border border-blue-300 rounded-xl shadow hover:shadow-md hover:scale-105 transition"
          >
            View RFPs
          </Link>
        </div>
      </section>

      {/* FEATURES / DASHBOARD CARDS */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Your Procurement Control Center
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

            <Link href="/rfp/create" className="block p-8">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-xl mb-4">
                <FileText size={32} />
              </div>

              <h3 className="text-xl font-semibold">Create RFP With AI</h3>
              <p className="text-gray-600 mt-2">
                Convert natural language into a full structured RFP in seconds.
              </p>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

            <Link href="/vendor" className="block p-8">
              <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-xl mb-4">
                <Users size={32} />
              </div>

              <h3 className="text-xl font-semibold">Vendor Management</h3>
              <p className="text-gray-600 mt-2">
                Add, manage and track approved vendors in one place.
              </p>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl shadow-md hover:shadow-xl transition">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

            <Link href="/rfp/list" className="block p-8">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 flex items-center justify-center rounded-xl mb-4">
                <FileSearch size={32} />
              </div>

              <h3 className="text-xl font-semibold">Track All RFPs</h3>
              <p className="text-gray-600 mt-2">
                Monitor submitted RFPs, vendor responses, comparisons, and
                status updates.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
