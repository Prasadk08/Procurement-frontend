import VendorComparePage from "./vendorComparePage";

export default async function CompareVendors({ params }: any) {
  const { id } = await params;

  return <VendorComparePage rfpId={id} />;
}

