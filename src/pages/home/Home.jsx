import React from 'react'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import { listSort, Sort } from "../../components/sort/Sort";
import { Categories, categories } from "../../components/categories/Categories";
import { PizzaBlock } from "../../components/pizzaBlock/PizzaBlock";
import { Pagination } from '../../components/pagination/Pagination';
import { SearchContext } from '../../App'
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { fetchPizzas } from '../../redux/slices/pizzasSlice';
import { NotFound } from '../notFound/NotFound';


export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue } = React.useContext(SearchContext);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const { items, status } = useSelector(state => state.pizzas)
  
  const changeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage
    }));

    window.scrollTo(0, 0);
  }
    

  // Если изменили параметры и был первый рендер, то вшивай в адресную строку параметры
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);


  // Если был первый рендер, то проверяем URL параметры и сохраняем их в redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = listSort.find(obj => obj.sortProperty === params.sortProperty)

      dispatch(setFilters({
        ...params,
        sort
      }))
    }

    isSearch.current = true;
  }, []);

  // нужно ли был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  if (status === 'loading') {
    return [...new Array(8)].map((item, index) => {
      return <Skeleton key={index} />
    })
  } else if (status === 'error') {
    return <NotFound />
  } else {
    return (
      <div>
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={changeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">{categories[categoryId]} пиццы</h2>
        <div className="content__items">
          { items.map((pizza) => {
            return <PizzaBlock key={pizza.id} {...pizza} />
          })}
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    )
  }
}
