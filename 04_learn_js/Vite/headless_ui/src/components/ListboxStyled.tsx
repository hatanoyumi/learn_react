import { FC, Fragment } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import styles from "./ListboxStyled.module.scss";

type ListItem = {
  id: string;
  text: string;
};

type Props = {
  // 選択肢
  items: ListItem[];
  // 選択項目のvalue(itemのid)
  value: string | null;
  // 未選択時に表示するテキスト
  prompt?: string;
  // 選択変更時のコールバック
  onChange?: (value: string | null) => void;
};

const findItem = (items: ListItem[], value: string | null) =>
  items.find((item) => item.id === value);

const classes = (...names: (string | false)[]) =>
  names.filter(Boolean).join(" ");


/**
 * ListboxPlainにオリジナルのスタイルやアニメーションを適用したリストコンポーネント。
 */
export const ListboxStyled: FC<Props> = ({
  items, value, prompt = "unselected", onChange
}) => {
  const selectedItem = value ? findItem(items, value) : null;
  const select = (item: ListItem) => onChange?.(item.id);

  return (
    <Listbox value={selectedItem} onChange={select}>
      <div className={styles.root}>
        <ListboxButton className={styles.trigger}>
          {selectedItem?.text ?? prompt}
        </ListboxButton>
        <Transition
          enter={styles.listEnterActive}
          enterFrom={styles.listEnterFrom}
          leave={styles.lestLeaveActive}
          leaveTo={styles.listLeaveTo}
        >
        <ListboxOptions className={styles.options}>
          {items.map((item) => (
            <ListboxOption key={item.id} value={item} as={Fragment}>
              {({ focus, selected }) => (
                <li
                  className={classes(
                    styles.option,
                    focus && styles.active,
                    selected && styles.selected
                  )}
                >
                  {item.text}
                </li>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Transition>
    </div>
    </Listbox>
  );
};