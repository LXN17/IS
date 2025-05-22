import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import {
  removeFromCart,
  deleteFromCart,
  clearCart,
  addToCart,
} from "../../features/cart/cartSlice";
import styles from "./Cart.module.scss";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart?.items || []);

  const totalPrice = useSelector((state: RootState) =>
    (state.cart?.items || []).reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    )
  );

  if (cartItems.length === 0) {
    return (
      <div className={styles.cartEmpty}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары, чтобы сделать заказ</p>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Ваша корзина</h2>

      <div className={styles.cartItems}>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img src={item.image} alt={item.name} />
            </div>

            <div className={styles.itemInfo}>
              <h3>{item.name}</h3>
              {item.description && (
                <p className={styles.itemDescription}>{item.description}</p>
              )}
            </div>

            <div className={styles.itemQuantity}>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                disabled={(item.quantity || 1) <= 1}
              >
                −
              </button>
              <span>{item.quantity || 1}</span>
              <button onClick={() => dispatch(addToCart(item))}>+</button>
            </div>

            <div className={styles.itemPrice}>
              {item.price * (item.quantity || 1)} ₽
            </div>

            <button
              className={styles.itemRemove}
              onClick={() => dispatch(deleteFromCart(item.id))}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className={styles.cartSummary}>
        <div className={styles.totalPrice}>
          <span>Итого:</span>
          <span>{totalPrice} ₽</span>
        </div>

        <div className={styles.cartActions}>
          <button
            className={styles.clearButton}
            onClick={() => dispatch(clearCart())}
          >
            Очистить корзину
          </button>

          <button className={styles.checkoutButton}>Оформить заказ</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
