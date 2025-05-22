import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { removeFromFavorites } from "../../features/favorites/favoritesSlice";
import favoritesStyles from "./Favorites.module.scss";

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(
    (state: RootState) => state.favorites.items
  );

  return (
    <div className={favoritesStyles.favoritesContainer}>
      <h2>Избранное</h2>
      {favoriteItems.length === 0 ? (
        <p>У вас нет избранных товаров</p>
      ) : (
        <div className={favoritesStyles.favoritesGrid}>
          {favoriteItems.map((item) => (
            <div key={item.id} className={favoritesStyles.favoriteItem}>
              <img
                src={item.image}
                alt={item.name}
                className={favoritesStyles.itemImage}
              />
              <div className={favoritesStyles.itemDetails}>
                <h3>{item.name}</h3>
                <p>{item.price} ₽</p>
                <button
                  onClick={() => dispatch(removeFromFavorites(item.id))}
                  className={favoritesStyles.removeButton}
                >
                  Удалить из избранного
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
