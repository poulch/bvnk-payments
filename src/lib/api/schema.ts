import { z } from "zod";

const currencySchema = z.object({
  currency: z.string().nullable(),
  amount: z.number(),
  actual: z.number().nullable(),
});

export const payInSchema = z.object({
  uuid: z.string().uuid(),
  merchantDisplayName: z.string(),
  merchantId: z.string().uuid(),
  dateCreated: z.number(),
  expiryDate: z.number(),
  quoteExpiryDate: z.number().nullable(),
  acceptanceExpiryDate: z.number().nullable(),
  quoteStatus: z.string(),
  reference: z.string(),
  type: z.string(),
  subType: z.string(),
  status: z.enum(["PENDING", "EXPIRED"]),
  displayCurrency: currencySchema,
  walletCurrency: currencySchema,
  paidCurrency: currencySchema,
  feeCurrency: currencySchema,
  networkFeeCurrency: currencySchema, // changed from nullable to required
  displayRate: z.any().nullable(),
  exchangeRate: z.any().nullable(),
  address: z
    .object({
      address: z.string(),
      tag: z.any().nullable(),
      protocol: z.string(),
      uri: z.string(),
      alternatives: z.any(),
    })
    .nullable(),
  returnUrl: z.string(),
  redirectUrl: z.string().url(),
  transactions: z.array(z.any()),
  refund: z.any().nullable(),
  refunds: z.array(z.any()),
  currencyOptions: z.array(z.any()).nullable(),
  flow: z.string().nullable(),
  twoStep: z.boolean(),
  customerId: z.string(),
  walletId: z.string(),
  networkFeeBilledTo: z.string(),
  networkFeeRates: z.array(z.any()),
});
