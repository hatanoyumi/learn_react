import { FC, Fragment } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

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

export const ListboxPlain: FC<Props> = (
  {items, value, prompt = "unselected", onChange}
) => {
  const selectedItem = value ? findItem(items, value) : null;
  const select = (item: ListItem) => onChange?.(item.id);

  return (
    <Listbox value={selectedItem} onChange={select}>
      <ListboxButton>
        {selectedItem?.text ?? prompt}
      </ListboxButton>
      <ListboxOptions>
        {items.map((item) => (
          <ListboxOption key={item.id} value={item} as={Fragment}>
            {({ active, selected }) => (
              <li>
                {active && "👉"}
                {selected && "✅"}
                {item.text}
              </li>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};