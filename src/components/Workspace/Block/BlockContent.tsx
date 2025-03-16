import styles from "../Workspace.module.scss";

type Props = {
  id: number;
  removeBlock: (blockId: number) => void;
};

export const BlockContent: React.FC<Props> = ({ id, removeBlock }) => {
  return (
    <div className={styles.top}>
      <p>Title {id}</p>
      <button onClick={() => removeBlock(id)}>X</button>
    </div>
  );
};
