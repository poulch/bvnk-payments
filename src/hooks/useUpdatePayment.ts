import { paymentUpdate } from "@/lib/api/payments";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface PaymentUpdateBody {
  payInMethod: string;
  currency: string;
}

export const useUpdatePayment = ({
  uuid,
  currency,
}: {
  uuid: string;
  currency?: string;
}) => {
  const updatePayment = useMutation({
    mutationFn: (body: PaymentUpdateBody) => paymentUpdate(uuid, body),
  });

  useEffect(() => {
    if (currency && updatePayment?.data?.acceptanceExpiryDate) {
      const intervalDelta =
        updatePayment.data.acceptanceExpiryDate - Date.now();

      const intervalId = setInterval(() => {
        handlePaymentUpdate(currency);
      }, intervalDelta);

      return () => clearInterval(intervalId);
    }
  }, [currency, updatePayment?.data?.acceptanceExpiryDate]);

  const handlePaymentUpdate = (currency: string) => {
    updatePayment.mutate({
      payInMethod: "crypto",
      currency: currency,
    });
  };

  return {
    handlePaymentUpdate,
    updatePayment,
  };
};
