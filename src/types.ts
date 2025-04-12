export type Currency = {
  amount: number;
  currency: string | null;
};

export interface PaymentUpdateBody {
  payInMethod: string;
  currency: string;
}
