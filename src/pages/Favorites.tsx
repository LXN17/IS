import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import ItemModal from "../components/modal/Modal";
import { selectSortedItems } from "../features/sort/selectors";
import {
  removeFromFavorites,
  toggleFavorite,
} from "../features/favorites/favoritesSlice";

const Favorites: React.FC = () => {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const sortValue = useSelector((state: RootState) => state.sort.value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    image: string;
    name: string;
    price: number;
    id: number;
    description?: string;
  } | null>(null);

  const dispatch = useDispatch();
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );

  const sortedFavorites = selectSortedItems(sortValue)({
    list: { value: favoriteItems },
    sort: { value: sortValue },
  });

  const filteredItems = sortedFavorites.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCardClick = (item: {
    image: string;
    name: string;
    price: number;
    id: number;
    description?: string;
  }) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="container">
      <div className="favorites-header">
        <h2 className="favorites-title">Избранное</h2>
      </div>

      {filteredItems.length === 0 ? (
        <p className="favorites-empty">
          {searchValue ? "Ничего не найдено" : "У вас нет избранных товаров"}
        </p>
      ) : (
        <div className="favorites-grid">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="favorites-card"
              onClick={() => handleCardClick(item)}
            >
              <img
                src={item.image}
                alt={item.name}
                className="favorites-image"
              />
              <div className="favorites-content">
                <h3 className="favorites-name">{item.name}</h3>
                <p className="favorites-price">{item.price} ₽</p>
                <button
                  className="favorites-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(removeFromFavorites(item.id));
                  }}
                >
                  Удалить из избранного
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedItem && (
        <ItemModal
          image={selectedItem.image}
          name={selectedItem.name}
          price={selectedItem.price}
          id={selectedItem.id}
          description={selectedItem.description}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Favorites;
