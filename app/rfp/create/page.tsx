import RfpForm from "@/components/RfpForm";
import RfpList from "@/components/RfpList";

export default function CreateRfpPage() {
  return (
    <div className="max-w-5xl mx-auto pt-24">
      <RfpForm />
      <RfpList />
    </div>
  );
}
