import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { paymentSummary } from "@/lib/api/payments";
import { PayInSummaryCard } from "@/components/PayInSummaryCard";
import { PayInConfirmation } from "@/components/PayInConfirmation";
import { redirect } from "next/navigation";

export default async function PayIn({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const { data, status } = await paymentSummary(uuid);

  let redirectUrl = "";

  try {
    if (status !== 200) {
      redirectUrl = "/error";
    } else if (data?.status === "EXPIRED") {
      redirectUrl = `/payin/${uuid}/expired`;
    } else if (data?.quoteStatus === "ACCEPTED") {
      redirectUrl = `/payin/${uuid}/pay`;
    }
  } catch (error) {
    console.error("Error fetching payment summary:", error);
    redirectUrl = `/error`;
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }

  return (
    <Container>
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
    </Container>
  );
}
