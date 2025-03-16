import { Transaction } from "../../types/Transaction.type";
import styles from "./BitcoinTrafic.module.scss";

const NO_DATA = "---";

type Props = {
  transactions: Transaction[];
};

export const Table: React.FC<Props> = ({ transactions }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.hash}>
            <td> {tx.inputs?.[0]?.prev_out?.addr || NO_DATA} </td>
            <td> {tx.out?.[0]?.addr || NO_DATA} </td>
            <td> {(tx.out?.[0]?.value / 100000000).toFixed(8)} BTC</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
