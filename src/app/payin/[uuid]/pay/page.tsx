"use client";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { ExpireDate } from "@/components/ui/ExpireDate";
import { PaymentTitle } from "@/components/ui/PaymentTitle";
import { Spinner } from "@/components/ui/Spinner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";
import { Text } from "@/components/ui/Text";
import { usePaymentSummary } from "@/hooks/usePaymentSummary";
import { paymentOptions } from "@/paymentOptions";
import { useParams, useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function Pay() {
  const params = useParams<{ uuid: string }>();
  const router = useRouter();

  const { data, isLoading, isError, isExpired } = usePaymentSummary(
    params.uuid
  );

  if (isLoading) {
    return (
      <Container>
        <Card className="place-content-center grid min-h-80">
          <Spinner />
        </Card>
      </Container>
    );
  }

  if (isExpired) {
    router.push(`/payin/${params.uuid}/expired`);
    return;
  }

  if (isError) {
    router.push(`/payin/${params.uuid}/error`);
    return;
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
        <Table className="mt-6 border-b-0">
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Amount due</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text className="mr-2">
                  {data?.paidCurrency.amount} {currency}
                </Text>
                <CopyButton
                  text={data?.paidCurrency?.amount.toString() ?? ""}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Text>BTC address</Text>
              </TableCell>
              <TableCell className="text-right">
                <Text className="mr-2">
                  {address?.address.slice(0, 7)}...
                  {address?.address.slice(-5)}
                </Text>
                <CopyButton text={address?.address ?? ""} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex flex-col items-center gap-3 mt-2 mb-3">
          <QRCode value={address?.address ?? ""} size={140} />
          <Text className="text-xs text-center">{address?.address}</Text>
        </div>

        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text>Time left to pay</Text>
              </TableCell>
              <TableCell className="text-right">
                <ExpireDate datetime={data?.expiryDate ?? 0} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
}
