import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectedItems = (state: RootState) => state.list.value;

export const selectSortedItems = (
  sortValue: "title" | "priceASC" | "priceDESC"
) =>
  createSelector([selectedItems], (items: any[]) =>
    [...items].sort((a, b) =>
      sortValue === "priceASC" ? a.price - b.price : b.price - a.price
    )
  );
