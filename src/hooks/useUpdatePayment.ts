"use client";

import { paymentUpdate } from "@/lib/api/payments";
import { PaymentUpdateBody } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export const useUpdatePayment = ({
  uuid,
  currency,
}: {
  uuid: string;
  currency?: string | null;
}) => {
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);
  const updatePayment = useMutation({
    mutationFn: (body: PaymentUpdateBody) => paymentUpdate(uuid, body),
  });

  useEffect(() => {
    if (currency) {
      updatePayment.mutate({
        payInMethod: "crypto",
        currency: currency,
      });
    }
  }, [currency]);

  useEffect(() => {
    if (updatePayment?.data?.acceptanceExpiryDate && currency) {
      if (intervalId) {
        clearInterval(intervalId.current);
      }
      const intervalDelta =
        updatePayment.data.acceptanceExpiryDate - Date.now();

      intervalId.current = setInterval(() => {
        updatePayment.mutate({
          payInMethod: "crypto",
          currency: currency,
        });
      }, intervalDelta);

      return () => clearInterval(intervalId.current);
    }
  }, [currency, updatePayment?.data?.acceptanceExpiryDate]);

  return {
    updatePayment,
  };
};
