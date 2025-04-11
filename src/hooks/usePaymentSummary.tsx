import { paymentSummary } from "@/lib/api/payments";
import { useQuery } from "@tanstack/react-query";

export const usePaymentSummary = (uuid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentSummary", uuid],
    queryFn: () => paymentSummary(uuid),
  });

  const isExpired = data?.status === "EXPIRED";
  const isAccepted = data?.quoteStatus === "ACCEPTED";

  return {
    data,
    isLoading,
    isError,
    isExpired,
    isAccepted,
  };
};
