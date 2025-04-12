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
import { useExpiredRedirect } from "@/hooks/useExpiredRedirect";
import { usePaymentRedirect } from "@/hooks/usePaymentRedirect";
import { useErrorRedirect } from "@/hooks/useErrorRedirect";

export default function PayIn() {
  const router = useRouter();
  const params = useParams<{ uuid: string }>();
  const [currency, setCurrency] = useState<string | undefined>(undefined);

  const { data, isLoading, isError, isExpired, isAccepted } = usePaymentSummary(
    params.uuid
  );

  const { updatePayment, isExpired: isPaymentExpired } = useUpdatePayment({
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

  useExpiredRedirect(isExpired || isPaymentExpired, params.uuid);
  usePaymentRedirect(isAccepted, params.uuid);
  useErrorRedirect(isError);

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
          currency={data?.displayCurrency.currency ?? ""}
          currencyAmount={data?.displayCurrency.amount ?? 0}
          onCurrencyChange={handleCurrencyChange}
          reference={data?.reference ?? ""}
          title={data?.merchantDisplayName ?? ""}
        />

        <PayInConfirmation
          isLoading={updatePaymentLoading}
          hasSelectedCurrency={!!currency}
          onConfirmPayment={handleConfirmPayment}
          paidCurrency={updatePayment?.data?.paidCurrency}
          expiredTimestamp={updatePayment?.data?.acceptanceExpiryDate ?? 0}
        />
      </Card>
    </Container>
  );
}
