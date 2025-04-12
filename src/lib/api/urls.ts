export const ROOT_URL = "https://api.sandbox.bvnk.com/api/v1";

export const getPaymentSummaryUrl = (uuid: string) =>
  `${ROOT_URL}/pay/${uuid}/summary`;
export const getPaymentUpdateUrl = (uuid: string) =>
  `${ROOT_URL}/pay/${uuid}/update/summary`;
export const getPaymentConfirmUrl = (uuid: string) =>
  `${ROOT_URL}/pay/${uuid}/accept/summary`;
