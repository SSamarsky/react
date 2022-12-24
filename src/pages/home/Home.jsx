import React from 'react'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import { Sort } from "../../components/sort/Sort";
import { Categories } from "../../components/categories/Categories";
import { PizzaBlock } from "../../components/pizzaBlock/PizzaBlock";
import { Pagination } from '../../components/pagination/Pagination';
import { SearchContext } from '../../App'
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import axios from 'axios';



export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLOading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const changeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  };

  const items = pizzas.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza} />
  });

  const skeleton = [...new Array(8)].map((item, index) => {
    return <Skeleton key={index} />
  })

  React.useEffect(() => {
    setIsLOading(true);
    const category = categoryId > 0 ? "category=" + categoryId : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? "&search=" + searchValue : '';

    axios.get(`https://639601bf90ac47c6807a740d.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}&${search}`)
    .then(res => {
      setPizzas(res.data);
      setIsLOading(false);
    })
    

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={changeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : items}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
