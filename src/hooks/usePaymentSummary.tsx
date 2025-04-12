import { paymentSummary } from "@/lib/api/payments";
import { useQuery } from "@tanstack/react-query";

export const usePaymentSummary = (uuid: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["paymentSummary", uuid],
    queryFn: () => paymentSummary(uuid),
  });

  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
