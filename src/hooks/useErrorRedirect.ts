import { useRouter } from "next/navigation";

export const useErrorRedirect = (isError: boolean) => {
  const router = useRouter();

  if (isError) {
    router.push("/error");
    return;
  }
};
