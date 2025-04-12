import { useRouter } from "next/navigation";

export const usePaymentRedirect = (isAccepted: boolean, uuid: string) => {
  const router = useRouter();

  if (isAccepted) {
    router.push(`/payin/${uuid}/pay`);
    return;
  }
};
