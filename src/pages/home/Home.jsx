import React from 'react'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import { Sort } from "../../components/sort/Sort";
import { Categories } from "../../components/categories/Categories";
import { PizzaBlock } from "../../components/pizzaBlock/PizzaBlock";

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLOading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности (DESC)', sortProperty: 'rating' });

  React.useEffect(() => {
    setIsLOading(true);

    const category = categoryId > 0 ? "category=" + categoryId : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';

    fetch(
      `https://639601bf90ac47c6807a740d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => res.json()
      )
      .then((data) => {
        setPizzas(data);
        setIsLOading(false);
      })
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(10)].map((item, index) => {
            return <Skeleton key={index} />
          })
          : pizzas.map((pizza) => {
            return <PizzaBlock key={pizza.id} {...pizza} />
          })
        }
      </div>
    </div>
  )
}
