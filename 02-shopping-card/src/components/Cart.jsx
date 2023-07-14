/* eslint-disable react/prop-types */
import React, { useId } from 'react'

import { useCart } from '../hooks/useCart'
import './Cart.css'
import { CartIcon, ClearCartIcon } from './Icons'

const CartItem = ({ thumbnail, price, title, quantity, addToCart, lessOne }) => {
  return (
        <li>
            <img
                src={thumbnail}
                alt={title}
            />
            <div>
                <strong>{title}</strong> - ${price}
            </div>

            <footer>
                <button onClick={lessOne}> - </button>
                <small >
                    Qty:{quantity}
                </small>
                <button onClick={addToCart}> + </button>
            </footer>
        </li>
  )
}

export const Cart = () => {
  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart, lessOneCartItem } = useCart()
  return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />

            <aside className="cart">
                <ul>
                    {cart.map(product => (
                        <CartItem
                            key={product.id}
                            addToCart={() => addToCart(product)}
                            lessOne={() => lessOneCartItem(product)}
                            quantity={product.quantity}
                            {...product}
                        />
                    ))}
                </ul>

                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
                <div style={{ marginBottom: '16px' }}>
                    <hr />
                    <h2> TOTAL ${cart.reduce((acc, item) => item.price * item.quantity + acc, 0)}</h2>
                </div>

            </aside>
        </>
  )
}
