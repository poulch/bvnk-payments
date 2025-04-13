import { PaymentDetails } from "@/components/PaymentDetails";
import { Card } from "@/components/ui/Card";
import { PaymentTitle } from "@/components/ui/PaymentTitle";
import { Text } from "@/components/ui/Text";
import { paymentSummary } from "@/lib/api/payments";
import { paymentOptions } from "@/paymentOptions";
import { redirect } from "next/navigation";

export default async function Pay({ params }: { params: { uuid: string } }) {
  const { uuid } = await params;
  const { data, status } = await paymentSummary(uuid);

  if (status !== 200) {
    throw new Error("Failed to fetch payment summary");
  }
  if (data?.status === "EXPIRED") {
    redirect(`/payin/${uuid}/expired`);
  }

  const address = data?.address;
  const currency = data?.paidCurrency.currency;
  const currencyLabel =
    paymentOptions.find((option) => option.value === currency)?.label ??
    "Bitcoin";

  return (
    <Card>
      <PaymentTitle>Pay with {currencyLabel}</PaymentTitle>
      <p className="text-center mt-6 max-w-[300px] mx-auto">
        <Text>
          To complete this payment send the amount due to the {currency} address
          provided below.
        </Text>
      </p>

      <PaymentDetails
        paidCurrency={{
          amount: data?.paidCurrency.amount ?? 0,
          currency: data?.paidCurrency.currency ?? null,
        }}
        walletAddress={address?.address ?? ""}
        expiredTimestamp={data?.expiryDate ?? 0}
      />
    </Card>
  );
}
