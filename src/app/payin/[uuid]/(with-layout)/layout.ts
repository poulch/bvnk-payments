import { paymentSummary } from "@/lib/api/payments";
import { redirect } from "next/navigation";

export default async function PayInLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uuid: string };
}) {
  let redirectUrl = "";

  try {
    const { uuid } = await params;
    const { data, status } = await paymentSummary(uuid);

    if (status !== 200) {
      redirectUrl = "/error";
    } else if (data?.status === "EXPIRED") {
      redirectUrl = `/payin/${uuid}/expired`;
    } else if (data?.quoteStatus === "ACCEPTED") {
      redirectUrl = `/payin/${uuid}/pay`;
    }
  } catch (error) {
    console.error("Error fetching payment summary:", error);
    redirectUrl = `/error`;
  } finally {
    if (redirectUrl) {
      redirect(redirectUrl);
    }
  }

  return children;
}
