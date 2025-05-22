import React, { useEffect, useState } from "react";
import data from "../../server/db.json";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ItemCard from "../components/itemCard/ItemCard";
import { selectSortedItems } from "../features/sort/selectors";
import { setList } from "../features/list/listSlice";

const Food = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setList(data.food));
  }, []);

  const searchValue = useSelector((state: RootState) => state.search.value);
  const sortValue = useSelector((state: RootState) => state.sort.value);

  const list = useSelector(selectSortedItems(sortValue));

  const filteredItems = list.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <div className="itemList">
        {filteredItems.map((item) => {
          return (
            <ItemCard
              key={item.id}
              id={item.id}
              image={item.image}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Food;
