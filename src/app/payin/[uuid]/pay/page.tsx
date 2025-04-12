"use client";

import { PaymentDetails } from "@/components/PaymentDetails";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PaymentTitle } from "@/components/ui/PaymentTitle";
import { Spinner } from "@/components/ui/Spinner";
import { Text } from "@/components/ui/Text";
import { usePaymentSummary } from "@/hooks/usePaymentSummary";
import { paymentOptions } from "@/paymentOptions";
import { useParams } from "next/navigation";

export default function Pay() {
  const params = useParams<{ uuid: string }>();

  const { data, isLoading } = usePaymentSummary(params.uuid);

  if (isLoading) {
    return (
      <Container>
        <Card className="place-content-center grid min-h-80">
          <Spinner />
        </Card>
      </Container>
    );
  }

  const address = data?.address;
  const currency = data?.paidCurrency.currency;
  const currencyLabel =
    paymentOptions.find((option) => option.value === currency)?.label ??
    "Bitcoin";

  return (
    <Container>
      <Card>
        <PaymentTitle>Pay with {currencyLabel}</PaymentTitle>
        <p className="text-center mt-6 max-w-[300px] mx-auto">
          <Text>
            To complete this payment send the amount due to the {currency}{" "}
            address provided below.
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
    </Container>
  );
}
