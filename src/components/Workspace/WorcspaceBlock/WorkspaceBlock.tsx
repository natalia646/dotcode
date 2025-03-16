import { Resizable } from "re-resizable";
import { RefObject, useRef, useState } from "react";
import Draggable from "react-draggable";
import styles from "../Workspace.module.scss";
import { Block } from "../../../types/Block.type";
import { BlockContent } from "./BlockContent";
import { useDragResize } from "../../../hooks/useDragResize";

type Props = {
  block: Block;
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
};

export const WorkspaceBlock: React.FC<Props> = ({ block, setBlocks }) => {
  const nodeRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const [isResizing, setIsResizing] = useState(false);

  const { resizeBlock, dragBlock, removeBlock } = useDragResize({
    setBlocks,
    setIsResizing,
  });

  return (
    <div className={styles.wrapper}>
      <Draggable
        nodeRef={nodeRef}
        disabled={isResizing}
        key={block.id}
        position={{ x: block.x, y: block.y }}
        onStop={(_, data) => dragBlock(block.id, data.x, data.y)}>
        <div ref={nodeRef} className={styles.blok}>
          <Resizable
            size={{ width: block.width, height: block.height }}
            onResizeStart={() => setIsResizing(true)}
            onResizeStop={(_e, _direction, _ref, d) =>
              resizeBlock(
                block.id,
                block.width + d.width,
                block.height + d.height
              )
            }>
            <BlockContent id={block.id} removeBlock={removeBlock} />
          </Resizable>
        </div>
      </Draggable>
    </div>
  );
};
