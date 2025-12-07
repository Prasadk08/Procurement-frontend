
import RfpDetails from "@/components/RfpDetails";

interface PageProps {
  params: { id: string };
}

//SERVER COMPONENT
export default async function RfpDetailsPage({ params }: PageProps)  {

  const {id}= await params;

  return (
    <div className="max-w-6xl mx-auto pt-24">
      <RfpDetails rfpId={id} />
    </div>
  );
}
