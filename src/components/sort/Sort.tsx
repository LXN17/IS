import React from "react";
import sortStyles from "./Sort.module.scss";
import { useDispatch } from "react-redux";
import { setSort } from "../../features/sort/sortSlice";

const Sort = () => {
  const dispatch = useDispatch();

  return (
    <div className={sortStyles.sort}>
      <span className={sortStyles.sortLabel}>Сортировка: </span>
      <select
        className={sortStyles.sortSelect}
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="title">По названию</option>
        <option value="priceASC">По цене (↑)</option>
        <option value="priceDESC">По цене (↓)</option>
      </select>
    </div>
  );
};

export default Sort;
