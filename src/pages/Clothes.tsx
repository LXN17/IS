import React, { useEffect } from "react";
import data from "../../server/db.json";
import { setList } from "../features/list/listSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { selectSortedItems } from "../features/sort/selectors";
import ItemCard from "../components/itemCard/ItemCard";

const Clothes = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.search.value);
  const sortValue = useSelector((state: RootState) => state.sort.value);

  useEffect(() => {
    dispatch(setList(data.clothes));
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

export default Clothes;
