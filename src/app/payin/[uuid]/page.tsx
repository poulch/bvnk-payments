import { Card } from "@/components/ui/Card";
import { paymentSummary } from "@/lib/api/payments";
import { PayInSummaryCard } from "@/components/PayInSummaryCard";
import { PayInConfirmation } from "@/components/PayInConfirmation";
import { redirect } from "next/navigation";

export default async function PayIn({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const { data, status } = await paymentSummary(uuid);

  if (status !== 200) {
    throw new Error("Failed to fetch payment summary");
  }
  if (data?.status === "EXPIRED") {
    redirect(`/payin/${uuid}/expired`);
  }
  if (data?.quoteStatus === "ACCEPTED") {
    redirect(`/payin/${uuid}/pay`);
  }

  return (
    <Card>
      <PayInSummaryCard
        currency={{
          amount: data?.displayCurrency.amount ?? 0,
          currency: data?.displayCurrency.currency ?? "",
        }}
        reference={data?.reference ?? ""}
        title={data?.merchantDisplayName ?? ""}
      />

      <PayInConfirmation />
    </Card>
  );
}
