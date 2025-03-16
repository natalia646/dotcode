import { Resizable } from "re-resizable";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "./Workspace.module.scss";
import { Block } from "../types/Block.type";

type Props = {
  block: Block;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
};

export const WorkspaceBlock: React.FC<Props> = ({ block, setBlocks }) => {
  const nodeRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const handleResize = (blockId: number, width: number, height: number) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, width, height } : block
      )
    );
    setIsResizing(false);
  };

  const handleDrag = (blockId: number, x: number, y: number) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === blockId ? { ...block, x, y } : block))
    );
  };

  const removeBlock = (blockId: number) => {
    setBlocks((prev) => prev.filter((item) => item.id !== blockId));
  };


  return (
    <div className={styles.wrapper} >
      <Draggable
        nodeRef={nodeRef}
        disabled={isResizing}
        key={block.id}
        position={{ x: block.x, y: block.y }}
        onStop={(_, data) => handleDrag(block.id, data.x, data.y)}>
        <div
          ref={nodeRef}
          className={styles.blok}
          >
          <Resizable
            size={{ width: block.width, height: block.height }}
            onResizeStart={() => setIsResizing(true)}
            onResizeStop={(_e, _direction, _ref, d) =>
              handleResize(
                block.id,
                block.width + d.width,
                block.height + d.height
              )
            }>
            <div className={styles.top}>
              <p>Title {block.id}</p>
              <button onClick={() => removeBlock(block.id)}>X</button>
            </div>
          </Resizable>
        </div>
      </Draggable>
    </div>
  );
};
