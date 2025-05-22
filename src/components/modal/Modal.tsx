import React, { useState } from "react";
import modalStyles from "./Modal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../../features/favorites/favoritesSlice";
import type { RootState } from "../../app/store";
import { addToCart } from "../../features/cart/cartSlice";

interface Props {
  image: string;
  name: string;
  price: number;
  id: number;
  description?: string;
  onClose: () => void;
}

const ItemModal: React.FC<Props> = ({
  image,
  name,
  price,
  id,
  description,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state: RootState) => state.cart?.items || []);
  const isInCart = cartItems.some((item) => item.id === id);

  const favorites = useSelector(
    (state: RootState) => state.favorites?.items || []
  );
  const isFavorite = favorites.some((item) => item.id === id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id,
        name,
        price,
        image,
        description,
        quantity,
      })
    );
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ id, name, price, image, description }));
    onClose();
  };

  return (
    <div className={modalStyles.modalOverlay} onClick={onClose}>
      <div
        className={modalStyles.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={modalStyles.closeButton} onClick={onClose}>
          &times;
        </button>

        <div className={modalStyles.modalImage}>
          <img src={image} alt={name} />
        </div>

        <div className={modalStyles.modalInfo}>
          <h2>{name}</h2>
          <p className={modalStyles.price}>{price} ₽</p>
          {description && (
            <p className={modalStyles.description}>{description}</p>
          )}

          <div className={modalStyles.modalActions}>
            <button
              disabled={isInCart}
              onClick={handleAddToCart}
              className={modalStyles.addToCart}
            >
              {isInCart ? "Товар в корзине" : "Добавить в корзину"}
            </button>
            {!isFavorite && (
              <button
                className={modalStyles.favoriteButton}
                onClick={handleToggleFavorite}
              >
                В избранное
              </button>
            )}
            <div className={modalStyles.quantitySelector}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
