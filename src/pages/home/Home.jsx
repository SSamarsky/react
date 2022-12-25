import React from 'react'
import Skeleton from '../../components/pizzaBlock/Skeleton'
import { listSort, Sort } from "../../components/sort/Sort";
import { Categories, categories } from "../../components/categories/Categories";
import { PizzaBlock } from "../../components/pizzaBlock/PizzaBlock";
import { Pagination } from '../../components/pagination/Pagination';
import { SearchContext } from '../../App'
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';


export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);


  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const changeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page))
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(`https://639601bf90ac47c6807a740d.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      });
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
    window.scrollTo(0, 0);

    fetchPizzas();
    // if (!isSearch.current) {
    //   fetchPizzas();
    // }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const items = pizzas.map((pizza) => {
    return <PizzaBlock key={pizza.id} {...pizza}/>
  });

  const skeleton = [...new Array(8)].map((item, index) => {
    return <Skeleton key={index} />
  })

  return (
    <div>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={changeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      <div className="content__items">
        {isLoading ? skeleton : items}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
