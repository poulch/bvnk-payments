import { paymentConfirm } from "@/lib/api/payments";
import { useMutation } from "@tanstack/react-query";

export const useConfirmPayment = (uuid: string) => {
  const confirmPaymentMutation = useMutation({
    mutationFn: () => paymentConfirm(uuid),
  });

  const confirmPayment = async () => {
    await confirmPaymentMutation.mutateAsync();
  };
  return {
    confirmPayment,
  };
};
