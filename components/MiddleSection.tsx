"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ClipboardList, Truck, Users, FileCheck } from "lucide-react";

export default function MiddleSection() {
  return (
    <section className="max-w-6xl mx-auto mt-16 mb-20 px-4">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center text-gray-800"
      >
        Smart Procurement. Faster Decisions.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-3 text-gray-600 max-w-2xl mx-auto"
      >
        AI-powered tools to help you streamline RFP creation, vendor comparison,
        and procurement workflows — all in one place.
      </motion.p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
        {/* Card 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
        >
          <ClipboardList className="text-blue-600 w-12 h-12 mb-4" />
          <h3 className="font-semibold text-lg mb-2">AI RFP Generator</h3>
          <p className="text-gray-600 text-sm">
            Create professional RFPs instantly with automated item extraction.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
        >
          <Users className="text-blue-600 w-12 h-12 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Vendor Management</h3>
          <p className="text-gray-600 text-sm">
            Track vendor details, performance, and proposals effortlessly.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
        >
          <Truck className="text-blue-600 w-12 h-12 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Procurement Tracking</h3>
          <p className="text-gray-600 text-sm">
            Monitor budget, delivery timelines, and approval workflows.
          </p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
        >
          <FileCheck className="text-blue-600 w-12 h-12 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Vendor Comparison</h3>
          <p className="text-gray-600 text-sm">
            Compare proposals side-by-side and choose the best vendor.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="text-center mt-16"
      >
        <Link
          href="/rfp/create"
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition"
        >
          Create Your First AI-Powered RFP
        </Link>
      </motion.div>
    </section>
  );
}
