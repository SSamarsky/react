import React from 'react'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import { Sort } from "../../components/sort/Sort";
import { Categories } from "../../components/categories/Categories";
import { PizzaBlock } from "../../components/pizzaBlock/PizzaBlock";
import { Pagination } from '../../components/pagination/Pagination';


export const Home = ({ searchValue }) => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLOading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности (DESC)', sortProperty: 'rating' });
  const [currentPage, setCurrentPage] = React.useState(0);

  const items = pizzas.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza} />
  });

  const skeleton = [...new Array(8)].map((item, index) => {
    return <Skeleton key={index} />
  })

  React.useEffect(() => {
    setIsLOading(true);

    const category = categoryId > 0 ? "category=" + categoryId : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? "&search=" + searchValue : '';

    fetch(
      `https://639601bf90ac47c6807a740d.mockapi.io/items?page=${currentPage + 1}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => res.json()
      )
      .then((data) => {
        setPizzas(data);
        setIsLOading(false);
      })
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : items}
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </div>
  )
}
