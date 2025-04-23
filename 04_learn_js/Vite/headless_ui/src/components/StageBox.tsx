import { FC, PropsWithChildren } from "react";
import styles from "./StageBox.module.scss";

type Props = {
  hasBg?: boolean;
};

const classes = (...names: (string | false)[]) => names.filter(Boolean).join(" ");

/**
 * サンプル画面の表示用に背景色をつけるコンポーネント。
 */
export const StageBox: FC<PropsWithChildren<Props>> = ({
  hasBg = false,
  children,
}) => {
  return (
    <div className={classes(styles.root, hasBg && styles.hasBg)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
