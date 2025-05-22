import React, { useState } from "react";
import itemCardStyles from "./ItemCard.module.scss";
import { LuHeart } from "react-icons/lu";
import ItemModal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import type { RootState } from "../../app/store";

interface Props {
  image: string;
  name: string;
  price: number;
  id: number;
  description?: string;
}

const ItemCard: React.FC<Props> = ({ image, name, price, id, description }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ id, name, price, image, description }));
  };
  return (
    <>
      <div className={itemCardStyles.itemCard} onClick={handleCardClick}>
        <LuHeart
          className={`${itemCardStyles.heartIcon} ${
            isFavorite ? itemCardStyles.active : ""
          }`}
          onClick={handleToggleFavorite}
        />
        <div className={itemCardStyles.itemImg}>
          <img src={image} alt={name} />
        </div>
        <div className={itemCardStyles.itemName}>{name}</div>
        <div className={itemCardStyles.itemPrice}>{price} ₽</div>
      </div>

      {isModalOpen && (
        <ItemModal
          image={image}
          name={name}
          price={price}
          id={id}
          description={description}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ItemCard;
