import { Block } from "../types/Block.type";

type Arg = {
    setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
    setIsResizing: React.Dispatch<React.SetStateAction<boolean>>
}

export const useDragResize = ({setBlocks, setIsResizing} : Arg) => {
  const resizeBlock = (blockId: number, width: number, height: number) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId ? { ...block, width, height } : block
      )
    );
    setIsResizing(false);
  };

  const dragBlock = (blockId: number, x: number, y: number) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === blockId ? { ...block, x, y } : block))
    );
  };

  const removeBlock = (blockId: number) => {
    setBlocks((prev) => prev.filter((item) => item.id !== blockId));
  };

  return { resizeBlock, dragBlock, removeBlock };
};
