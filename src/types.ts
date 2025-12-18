export interface SlipItem {
  name: string;
  qty: number;
  price: number;
}

export interface Slip {
  id: string;

  customerName: string;
  customerCEO: string;
  customerBizNumber: string;
  customerPhone: string;
  customerAddress: string;

  writeDate: string;
  confirmDate: string;

  items: SlipItem[];

  totalSupply: number;
  totalTax: number;
  totalAmount: number;
}
