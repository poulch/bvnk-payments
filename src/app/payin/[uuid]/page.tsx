"use client";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { paymentConfirm } from "@/lib/api/payments";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/Spinner";
import { useUpdatePayment } from "@/hooks/useUpdatePayment";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { usePaymentSummary } from "@/hooks/usePaymentSummary";
import { PayInSummaryCard } from "@/components/PayInSummaryCard";
import { PayInConfirmation } from "@/components/PayInConfirmation";

export default function PayIn() {
  const params = useParams<{ uuid: string }>();
  const router = useRouter();
  const [currency, setCurrency] = useState<string | undefined>(undefined);

  const { data, isLoading, isError, isExpired, isAccepted } = usePaymentSummary(
    params.uuid
  );

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

  // side effects
  useEffect(() => {
    const expired =
      updatePayment?.data?.status === "EXPIRED" ||
      isExpired ||
      (
        updatePayment?.error as AxiosError<{ message: string }>
      )?.response?.data?.message?.includes("EXPIRED");

    if (expired) router.push(`/payin/${params.uuid}/expired`);
    if (isAccepted) router.push(`/payin/${params.uuid}/pay`);
    if (isError) router.push(`/payin/${params.uuid}/error`);
  }, [
    isAccepted,
    isError,
    isExpired,
    params.uuid,
    router,
    updatePayment?.data?.status,
    updatePayment?.error,
  ]);

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
          uuid={params.uuid}
          isLoading={updatePaymentLoading}
          showConfirmButton={!!updatePayment?.data}
          onConfirmPayment={confirmPayment.mutateAsync}
          paidCurrency={updatePayment?.data?.paidCurrency}
          expiredTimestamp={updatePayment?.data?.acceptanceExpiryDate ?? 0}
        />
      </Card>
    </Container>
  );
}
