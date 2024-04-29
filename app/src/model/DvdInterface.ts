export interface DvdInterface {
  id: string;
  barcode: string;
  title: string;
  description: string;
  format: string;
  inStock: boolean;
}
export interface DvdServiceInterface {
  data?: DvdInterface;
  found: boolean;
  message?: string;
}
