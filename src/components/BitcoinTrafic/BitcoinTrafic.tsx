import { useState, useEffect, useRef } from "react";
import { BITCOIN_WS_URL } from "../../constants/constants";
import { Transaction } from "../types/Transaction.type";
import { Table } from "./Table";
import styles from "./BitcoinTrafic.module.scss";

const connection = JSON.stringify({ op: "unconfirmed_sub" });

export const BitcoinTrafic = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBTC, setTotalBTC] = useState(0);
  const ws = useRef<WebSocket | null>(null);
  const [isStart, setIsStart] = useState(false);

  const handleMessage = (event: MessageEvent) => {
    const data = JSON.parse(event.data);

    if (data.op === "utx") {
      const newTransaction: Transaction = data.x;

      setTransactions((prev) => {
        const updatedTransactions = [newTransaction, ...prev];
        return updatedTransactions.slice(0, 5);
      });

      const total = newTransaction.out.reduce((sum, out) => sum + out.value, 0);
      setTotalBTC((prev) => prev + total / 100000000);
    }
  };

  const connectWebSocket = () => {
    ws.current = new WebSocket(BITCOIN_WS_URL);
    ws.current.onopen = () => {
      ws.current?.send(connection);
    };
    ws.current.onmessage = handleMessage;
    ws.current.onerror = (error) => console.error("WebSocket Error:", error);
    ws.current.onclose = () => console.log("WebSocket Disconnected");
    setIsStart(true);
  };

  const disconnectWebSocket = () => {
    ws.current?.close();
    ws.current = null;
    setIsStart(false);
  };

  const resetTransactions = () => {
    setTransactions([]);
    setTotalBTC(0);
    disconnectWebSocket();
    setIsStart(false);
  };

  useEffect(() => {
    return () => disconnectWebSocket();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Bitcoin Transaction Tracker</h2>
      <button
        className={styles.button}
        onClick={connectWebSocket}
        disabled={isStart}>
        Start
      </button>
      <button className={styles.button} onClick={disconnectWebSocket}>
        Stop
      </button>
      <button className={styles.button} onClick={resetTransactions}>
        Reset
      </button>

      <p>Sum = {totalBTC.toFixed(8)} BTC</p>

      {totalBTC !== 0 && <Table transactions={transactions} />}
    </div>
  );
};
