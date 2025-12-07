import VendorResponsePageClient from "./VendorResponsePageClient";

interface PageProps {
  params: Promise<{ rfpId: string; vendorId: string }>;
}

export default async function VendorResponsePage({ params }: PageProps) {

  const { rfpId, vendorId } = await params;

  return <VendorResponsePageClient rfpId={rfpId} vendorId={vendorId} />;
}
