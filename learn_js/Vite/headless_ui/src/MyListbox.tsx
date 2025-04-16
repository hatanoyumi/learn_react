// 最小ケースのサンプル

import { useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

const people = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
];

export function MyListbox() {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>
      {/* Listbox.Buttonは非推奨→ListboxButtonに置き換え。以下Listbox.Optionsなども同じ */}
      <ListboxButton>{selectedPerson.name}</ListboxButton>
      <ListboxOptions>
        {people.map((person) => (
          <ListboxOption key={person.id} value={person}>
            {person.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}