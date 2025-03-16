import { useRef } from "react";
import { Transaction } from "../types/Transaction.type";
import { BITCOIN_WS_URL } from "../constants/constants";

const connection = JSON.stringify({ op: "unconfirmed_sub" });

type Arg = {
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setTotalBTC: React.Dispatch<React.SetStateAction<number>>;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useWsConnect = ({
  setTransactions,
  setTotalBTC,
  setIsStart,
}: Arg) => {
  const ws = useRef<WebSocket | null>(null);

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

  return { connectWebSocket, disconnectWebSocket, resetTransactions };
};
