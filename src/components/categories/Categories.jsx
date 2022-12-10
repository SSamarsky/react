import React from 'react'

export const Categories = () => {
    const [activeCategory, setActiveCategory] = React.useState('Все');

    const addClassActive = e => {
        setActiveCategory(e.target.textContent)
    };

    const categories =['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((item) => {
                    return <li
                                key={item}
                                className={activeCategory === item ? 'active' : ''}
                                onClick={(e) => addClassActive(e)}
                            >
                                {item}
                            </li>
                })}
            </ul>
        </div>
    )
}
