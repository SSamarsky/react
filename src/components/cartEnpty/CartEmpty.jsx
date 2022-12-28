import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../assets/img/empty-cart.png'

const emojis = ['😕', '😢', '😔', '😟', '😞', '😩'];

export const CartEmpty = () => {

    const randomEmoji = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }
    const emoji = randomEmoji(emojis);

    return (
        <div className="cart cart--empty">
            <h2>Корзина пустая <span>{emoji}</span></h2>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу.
                <br />Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCartImg} alt="Empty cart" />
            <Link to="/home" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
    )
}