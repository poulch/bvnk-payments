import axios from "axios";
import { payInSchema } from "./schema";
import {
  getPaymentConfirmUrl,
  getPaymentSummaryUrl,
  getPaymentUpdateUrl,
} from "./urls";
import { PaymentUpdateBody } from "@/types";

export const paymentSummary = async (uuid: string) => {
  const { data, status } = await axios.get(getPaymentSummaryUrl(uuid));
  return {
    data: payInSchema.parse(data),
    status,
  };
};

export const paymentUpdate = async (uuid: string, body: PaymentUpdateBody) => {
  const { data } = await axios.put(getPaymentUpdateUrl(uuid), body);
  return payInSchema.parse(data);
};

export const paymentConfirm = async (uuid: string) => {
  return axios.put(getPaymentConfirmUrl(uuid), { successUrl: "no_url" });
};
