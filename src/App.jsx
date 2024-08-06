import { useRef, useState } from "react";
import Icons from "./Icons";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);

  const inputRef = useRef(null);

  const groupedOptions = [
    {
      label: "Smartphone",
      options: [
        { value: "iPhone", label: "iPhone" },
        { value: "Samsung", label: "Samsung" },
        { value: "Google", label: "Google" },
        { value: "OnePlus", label: "OnePlus" },
        { value: "Xiaomi", label: "Xiaomi" },
        { value: "Oppo", label: "Oppo" },
        { value: "Sony", label: "Sony" },
        { value: "Nokia", label: "Nokia" },
        { value: "Asus", label: "Asus" },
        { value: "Realme", label: "Realme" },
      ],
    },
    {
      label: "Tws Buds",
      options: [
        { value: "AAirPods", label: "Apple" },
        { value: "SamsungBuds", label: "SamsungBuds" },
        { value: "SonyXM4", label: "SonyXM4" },
        { value: "JabraElite", label: "JabraElite" },
        {
          value: "AnkerAir",
          label: "AnkerAir",
        },
        {
          value: "PixelBuds",
          label: "PixelBuds",
        },
        { value: "Powerbeats", label: "Powerbeats" },
        { value: "JBL", label: "JBL" },
      ],
    },
  ];

  const filteredOptions = groupedOptions.map((group) => ({
    ...group,
    options: group.options.filter(
      (option) =>
        option.label
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase().trim()) &&
        !selected.includes(option.value)
    ),
  }));

  const isDisable =
    !query?.trim() ||
    selected.filter(
      (item) =>
        item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
    )?.length;

  return (
    <div className="kzui-bg">
      <div className="kzui-container">
        <h2 className="heading">Selectify Custom Select</h2>
        {selected?.length ? (
          <div className="kzui-selected-tags">
            {selected.map((tag) => {
              return (
                <div key={tag} className="kzui-selected-tags__item">
                  {tag}
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() =>
                      setSelected(selected.filter((i) => i !== tag))
                    }
                  >
                    <Icons.Close />
                  </div>
                </div>
              );
            })}
            <div className="kzui-selected-tags__clear">
              <span
                className="kzui-selected-tags__clear-button"
                onClick={() => {
                  setSelected([]);
                  inputRef.current?.focus();
                }}
              >
                Clear all
              </span>
            </div>
          </div>
        ) : null}
        <div className="kzui-input-container">
          <Icons.Search />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.trimStart())}
            placeholder="Find your dream Phone & TWS"
            className="kzui-input-container__input"
            onFocus={() => setMenuOpen(true)}
            onBlur={() => setMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isDisable) {
                setSelected((prev) => [...prev, query]);
                setQuery("");
                setMenuOpen(true);
              }
            }}
          />
          <button
            className="kzui-input-container__button"
            disabled={isDisable}
            onClick={() => {
              if (isDisable) {
                return;
              }
              setSelected((prev) => [...prev, query]);
              setQuery("");
              inputRef.current?.focus();
              setMenuOpen(true);
            }}
          ></button>
        </div>

        {menuOpen ? (
          <div className="kzui-menu">
            <ul className="kzui-menu__list">
              {filteredOptions?.length ? (
                filteredOptions.map((group, i) => (
                  <li key={i}>
                    <div className="kzui-menu__group-label">{group.label}</div>
                    <ul>
                      {group.options.map((option) => (
                        <li
                          key={option.value}
                          className="kzui-menu__item"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setMenuOpen(true);
                            setSelected((prev) => [...prev, option.value]);
                            setQuery("");
                          }}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : (
                <li className="kzui-menu__item--no-options">
                  No options available
                </li>
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
