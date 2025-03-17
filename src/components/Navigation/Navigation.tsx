import { NavLink } from "react-router";
import { PATH } from "../../constants/path";
import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active} ` : styles.link;

  return (
    <nav className={styles.navigation}>
      <NavLink className={linkStyle} to={PATH.WORKSPACE}>
        Interactive Workspace
      </NavLink>
      <NavLink className={linkStyle} to={PATH.BITCOIN}>
        Bitcoin Transactions
      </NavLink>
    </nav>
  );
};
