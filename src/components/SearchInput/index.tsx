//---------------------Basic imports-----------------------
import React from "react";
import "./SearchInput.scss";

//--------------------Libraries----------------------------
import clsx from "clsx";

//--------------------Assets----------------------------
import ICONS from "../../assets/icons";

interface ISearchInputProps {
  value: string;
  onChange: (value: any) => void;
  placeholder?: string;
  name: string;
  type?: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({
  value,
  onChange = () => {},
  placeholder,
  name,
  type = "text",
}) => {
  //---------------------Handlers--------------------

  const changeHandler = (e: any) => onChange(e.target.value);

  //---------------------Layout-----------------------

  return (
    <div className={clsx("searchInput", value && "searchInput-active")}>
      <input
        type={type}
        className="searchInput__inputArea"
        name={name}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder}
      />
      <button>
        <img src={ICONS.utils.searchIcon} alt="" />
      </button>
    </div>
  );
};

export default SearchInput;
