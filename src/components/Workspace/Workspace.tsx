import { useEffect, useState } from "react";
import { INITIAL_BLOCKS } from "../../constants/constants";
import { WorkspaceBlock } from "./WorcspaceBlock/WorkspaceBlock";
import styles from "./Workspace.module.scss";
import { Block } from "../../types/Block.type";

export const Workspace = () => {
  const savedBlocks = localStorage.getItem("blocks");
  const initialState = savedBlocks ? JSON.parse(savedBlocks) : INITIAL_BLOCKS;

  const [blocks, setBlocks] = useState<Block[]>(initialState);

  useEffect(() => {
    localStorage.setItem("blocks", JSON.stringify(blocks));
  }, [blocks]);

  return (
    <>
      <button
        className={styles.reset}
        onClick={() => setBlocks(INITIAL_BLOCKS)}>
        Reset
      </button>
      <div>
        {blocks?.map((block) => (
          <WorkspaceBlock key={block.id} block={block} setBlocks={setBlocks} />
        ))}
      </div>
    </>
  );
};
