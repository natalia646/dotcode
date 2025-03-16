/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Transaction } from "../../types/Transaction.type";
import { Table } from "./Table";
import { useWsConnect } from "../../hooks/useWsConnect";
import styles from "./BitcoinTrafic.module.scss";

export const BitcoinTrafic = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBTC, setTotalBTC] = useState(0);
  const [isStart, setIsStart] = useState(false);

  const { connectWebSocket, disconnectWebSocket, resetTransactions } =
    useWsConnect({ setTransactions, setTotalBTC, setIsStart });

  useEffect(() => {
    return () => disconnectWebSocket();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Bitcoin Transaction Tracker</h2>
      <button onClick={connectWebSocket} disabled={isStart}>
        Start
      </button>
      <button onClick={disconnectWebSocket}>Stop</button>
      <button onClick={resetTransactions}>Reset</button>

      <p>Sum = {totalBTC.toFixed(8)} BTC</p>

      {totalBTC !== 0 && <Table transactions={transactions} />}
    </div>
  );
};
