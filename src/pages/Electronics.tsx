import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSortedItems } from "../features/sort/selectors";
import type { RootState } from "../app/store";
import { setList } from "../features/list/listSlice";
import data from "../../server/db.json";
import ItemCard from "../components/itemCard/ItemCard";

const Electronics = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.search.value);
  const sortValue = useSelector((state: RootState) => state.sort.value);

  useEffect(() => {
    dispatch(setList(data.electronics));
  }, []);

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

export default Electronics;
