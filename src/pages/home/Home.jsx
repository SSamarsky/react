import React from 'react'
import Skeleton  from '../../components/pizzaBlock/Skeleton'
import { Sort } from "../../components/sort/Sort";
import { Categories } from "../../components/categories/Categories";
import { PizzaBlock } from "../../components/pizzaBlock/PizzaBlock";

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLOading] = React.useState(true);

  React.useEffect(() => {
    setIsLOading(true);
    fetch("https://639601bf90ac47c6807a740d.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => {
        setPizzas(data);
        setIsLOading(false);
      })
      window.scrollTo(0,0);
  }, []);

    return (
        <div>
            <div className="content__top">
                <Categories />
            <Sort />
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
