import axios from "axios";
import { payInSchema } from "./schema";

export const paymentSummary = async (uuid: string) => {
  const { data } = await axios.get(
    `https://api.sandbox.bvnk.com/api/v1/pay/${uuid}/summary`
  );
  return payInSchema.parse(data);
};

export const paymentUpdate = async (uuid: string, body: any) => {
  const { data } = await axios.put(
    `https://api.sandbox.bvnk.com/api/v1/pay/${uuid}/update/summary`,
    body
  );
  return payInSchema.parse(data);
};

export const paymentConfirm = async (uuid: string) => {
  return axios.put(
    `https://api.sandbox.bvnk.com/api/v1/pay/${uuid}/accept/summary`,
    { successUrl: "no_url" }
  );
};
