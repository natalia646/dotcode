import { useEffect, useState } from "react";
import { INITIAL_BLOCKS } from "../../constants/constants";
import { WorkspaceBlock } from "./WorkspaceBlock";
import styles from "./Workspace.module.scss";
import { Block } from "../types/Block.type";

export const Workspace = () => {
  const savedBlocks = localStorage.getItem("blocks");

  const initialState = savedBlocks ? JSON.parse(savedBlocks) : INITIAL_BLOCKS;

  const [blocks, setBlocks] = useState<Block[]>(initialState);

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  return (
    <div className={styles.bloks}>
      <button onClick={()=> setBlocks(INITIAL_BLOCKS)}>Reset</button>
      {blocks?.map((block) => (
        <WorkspaceBlock key={block.id} block={block} setBlocks={setBlocks} />
      ))}
    </div>
  );
};
