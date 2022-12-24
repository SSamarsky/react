import React from 'react'

export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = ({ value, onClickCategory }) => {

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName, i) => {
                    return <li
                        key={i}
                        className={value === i ? 'active' : ''}
                        onClick={() => onClickCategory(i)}
                    >
                        {categoryName}
                    </li>
                })}
            </ul>
        </div>
    )
}
