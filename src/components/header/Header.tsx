import React, { useState, type ChangeEvent } from "react";
import headerStyles from "./Header.module.scss";
import { LuSearch, LuHeart, LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchHandler } from "../../features/search/searchSlice";
import type { RootState } from "../../app/store";

const Header = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  return (
    <div className={headerStyles.header}>
      <div className={headerStyles.headerLogo}>
        <Link to="/clothes">
          <img src="./Logo.png" alt="Logo" height="50px" width="50px" />
        </Link>
      </div>

      <button
        className={headerStyles.mobileMenuButton}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
      >
        ☰
      </button>

      <div
        className={`${headerStyles.headerCategories} ${
          menuIsOpen ? headerStyles.mobileMenuOpen : ""
        }`}
      >
        <ul className={headerStyles.headerCategoriesList}>
          <li>
            <Link to="/clothes">Одежда</Link>
          </li>
          <li>
            <Link to="/food">Еда</Link>
          </li>
          <li>
            <Link to="/electronics">Электроника</Link>
          </li>
        </ul>
      </div>

      <div
        className={
          searchIsOpen
            ? headerStyles.headerSearch
            : headerStyles.headerSearchClosed
        }
      >
        <input
          onChange={(event) => dispatch(searchHandler(event.target.value))}
          value={searchValue}
          type="search"
          placeholder={searchIsOpen ? "Поиск..." : ""}
        />
      </div>

      <div className={headerStyles.headerRight}>
        <ul className={headerStyles.headerRightList}>
          <li>
            <LuSearch
              onClick={() => {
                setSearchIsOpen((prev) => !prev);
              }}
            />
          </li>
          <li>
            <Link to="/favorites">
              <LuHeart />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <LuShoppingCart />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
