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
    if (currency) {
      if (updatePayment?.data?.acceptanceExpiryDate) {
        const intervalDelta =
          updatePayment.data.acceptanceExpiryDate - Date.now();

        const intervalId = setInterval(() => {
          updatePayment.mutate({
            payInMethod: "crypto",
            currency: currency,
          });
        }, intervalDelta);

        return () => clearInterval(intervalId);
      } else {
        updatePayment.mutate({
          payInMethod: "crypto",
          currency: currency,
        });
      }
    }
  }, [currency, updatePayment?.data?.acceptanceExpiryDate]);

  return {
    updatePayment,
  };
};
