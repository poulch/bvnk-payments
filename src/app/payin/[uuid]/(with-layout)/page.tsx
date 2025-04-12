"use client";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { paymentConfirm } from "@/lib/api/payments";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/Spinner";
import { useUpdatePayment } from "@/hooks/useUpdatePayment";
import { useState } from "react";
import { usePaymentSummary } from "@/hooks/usePaymentSummary";
import { PayInSummaryCard } from "@/components/PayInSummaryCard";
import { PayInConfirmation } from "@/components/PayInConfirmation";

export default function PayIn() {
  const router = useRouter();
  const params = useParams<{ uuid: string }>();
  const [currency, setCurrency] = useState<string | undefined>(undefined);

  const { data, isLoading } = usePaymentSummary(params.uuid);

  const { updatePayment } = useUpdatePayment({
    uuid: params.uuid,
    currency,
  });
  const updatePaymentLoading = updatePayment?.isPending ?? false;

  const confirmPayment = useMutation({
    mutationFn: () => paymentConfirm(params.uuid),
  });

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  const handleConfirmPayment = async () => {
    await confirmPayment.mutateAsync();
    router.push(`/payin/${params.uuid}/pay`);
  };

  if (isLoading)
    return (
      <Container>
        <Card className="place-content-center grid min-h-80">
          <Spinner />
        </Card>
      </Container>
    );

  return (
    <Container>
      <Card>
        <PayInSummaryCard
          currency={{
            amount: data?.displayCurrency.amount ?? 0,
            currency: data?.displayCurrency.currency ?? "",
          }}
          onCurrencyChange={handleCurrencyChange}
          reference={data?.reference ?? ""}
          title={data?.merchantDisplayName ?? ""}
        />

        <PayInConfirmation
          isLoading={updatePaymentLoading}
          hasSelectedCurrency={!!currency}
          onConfirmPayment={handleConfirmPayment}
          paidCurrency={{
            amount: updatePayment?.data?.paidCurrency.amount ?? 0,
            currency: updatePayment?.data?.paidCurrency.currency ?? "",
          }}
          expiredTimestamp={updatePayment?.data?.acceptanceExpiryDate ?? 0}
        />
      </Card>
    </Container>
  );
}
