"use client";

import { useState } from "react";
import { Text } from "./ui/Text";
import { paymentOptions } from "@/paymentOptions";
import { Combobox } from "./ui/Combobx";
import { useUpdatePayment } from "@/hooks/useUpdatePayment";
import { useParams, useRouter } from "next/navigation";
import { PayInConfirmationDetails } from "./PayInConfirmationDetails";
import { useConfirmPayment } from "@/hooks/useComfirmPayment";
import { ConfirmButton } from "./ConfirmButton";

export const PayInConfirmation = () => {
  const router = useRouter();
  const { uuid } = useParams<{ uuid: string }>();
  const [currency, setCurrency] = useState<string | null>(null);

  const { updatePayment } = useUpdatePayment({
    uuid,
    currency,
  });
  const updatePaymentLoading = updatePayment?.isPending ?? false;

  const { confirmPayment } = useConfirmPayment(uuid);

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  const handleConfirmPayment = async () => {
    await confirmPayment();
    router.push(`/payin/${uuid}/pay`);
  };

  return (
    <>
      <div className="flex flex-col gap-1 mt-6">
        <Text>Pay with</Text>
        <Combobox
          options={paymentOptions}
          placeholder="Select Currency"
          onChange={handleCurrencyChange}
        />
      </div>
      {currency && (
        <>
          <PayInConfirmationDetails
            currency={{
              amount: updatePayment?.data?.paidCurrency.amount ?? 0,
              currency: updatePayment?.data?.paidCurrency.currency ?? "",
            }}
            expireTimestamp={updatePayment?.data?.acceptanceExpiryDate ?? 0}
            isLoading={updatePaymentLoading}
          />

          {!updatePaymentLoading && (
            <ConfirmButton onClick={handleConfirmPayment} />
          )}
        </>
      )}
    </>
  );
};
