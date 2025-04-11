"use client";

import { Card } from "@/components/Card";
import { Combobox, Option } from "@/components/Combobx";
import { Container } from "@/components/Container";
import { PaymentAmount } from "@/components/PaymentAmount";
import { PaymentTitle } from "@/components/PaymentTitle";
import { Text } from "@/components/Text";
import { paymentConfirm, paymentSummary } from "@/lib/api/payments";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/Button";
import { Table, TableBody, TableCell, TableRow } from "@/components/Table";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/Spinner";
import { ExpireDate } from "@/components/ExpireDate";
import { useUpdatePayment } from "@/hooks/useUpdatePayment";
import { useState } from "react";
import { Money } from "@/components/Money";
import { AxiosError } from "axios";

const paymentOptions: Option[] = [
  { label: "Bitcoin", value: "BTC" },
  { label: "Ethereum", value: "ETH" },
  { label: "Litecoin", value: "LTC" },
];

export default function PayIn() {
  const params = useParams<{ uuid: string }>();
  const [currency, setCurrency] = useState<string | undefined>(undefined);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentSummary", params.uuid],
    queryFn: () => paymentSummary(params.uuid),
  });

  const { handlePaymentUpdate, updatePayment } = useUpdatePayment({
    uuid: params.uuid,
    currency,
  });
  const updatePaymentLoading = updatePayment?.isPending ?? false;

  const confirmPayment = useMutation({
    mutationFn: () => paymentConfirm(params.uuid),
  });

  const handleConfirmPayment = async () => {
    await confirmPayment.mutateAsync();
    redirect(`/payin/${params.uuid}/pay`);
  };

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
    handlePaymentUpdate(currency);
  };

  if (
    updatePayment?.data?.status === "EXPIRED" ||
    data?.status === "EXPIRED" ||
    (
      updatePayment?.error as AxiosError<{ message: string }>
    )?.response?.data?.message?.includes("EXPIRED")
  ) {
    redirect(`/payin/${params.uuid}/expired`);
    return;
  }

  if (data?.quoteStatus === "ACCEPTED") {
    redirect(`/payin/${params.uuid}/pay`);
    return;
  }

  if (isError) {
    redirect(`/payin/${params.uuid}/error`);
    return;
  }

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
        <div>
          <PaymentTitle>{data?.merchantDisplayName}</PaymentTitle>
          <PaymentAmount
            className="mt-2"
            amount={data?.displayCurrency.amount ?? 0}
            currency={data?.displayCurrency.currency ?? ""}
          />
        </div>
        <p className="text-center mt-6">
          <Text className="text-sm">For reference number:</Text>
          <Text isBolded> {data?.reference}</Text>
        </p>

        <div className="flex flex-col gap-1 mt-6">
          <Text>Pay with</Text>
          <Combobox
            options={paymentOptions}
            placeholder="Select Currency"
            onChange={handleCurrencyChange}
          />
        </div>

        {(updatePayment?.data || updatePaymentLoading) && (
          <Table className="mt-8">
            <TableBody>
              <TableRow>
                <TableCell>
                  <Text>Amount due</Text>
                </TableCell>
                <TableCell className="text-right">
                  {updatePaymentLoading ? (
                    <Spinner size={16} />
                  ) : (
                    <Money money={updatePayment?.data?.paidCurrency} />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Text>Quoted price expires in</Text>
                </TableCell>
                <TableCell className="text-right">
                  {updatePaymentLoading ? (
                    <Spinner size={16} />
                  ) : (
                    <ExpireDate
                      datetime={updatePayment?.data?.acceptanceExpiryDate ?? 0}
                    />
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}

        {updatePayment?.data && (
          <Button
            disabled={confirmPayment.isPending}
            onClick={handleConfirmPayment}
            className="w-full mt-8"
          >
            {confirmPayment.isPending && "Confirming..."}
            {confirmPayment.isSuccess && "Confirmed!"}
            {confirmPayment.isIdle && "Confirm"}
          </Button>
        )}
      </Card>
    </Container>
  );
}
