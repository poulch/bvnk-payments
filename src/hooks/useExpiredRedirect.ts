import { useRouter } from "next/navigation";

export const useExpiredRedirect = (isExpired: boolean, uuid: string) => {
  const router = useRouter();

  if (isExpired) {
    router.push(`/payin/${uuid}/expired`);
    return;
  }
};
