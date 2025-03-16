export interface Transaction {
  hash: string;
  inputs: { prev_out: { addr: string } }[];
  out: { addr: string; value: number }[];
}
