import React from 'react'

export const Categories = ({ value, onClickCategory }) => {

    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

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
