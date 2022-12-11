import React from "react";
import { Categories } from "./components/categories/Categories";
import { Header } from "./components/header/Header";
import { PizzaBlock } from "./components/pizzaBlock/PizzaBlock";
import Skeleton from "./components/pizzaBlock/Skeleton";
import { Sort } from "./components/sort/Sort";
import "./scss/app.scss";

function App() {
  const skeleton = [0,1,2,3,4,5,6,7];
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
      .catch((err) => console.error("ERROR: ", err));
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? skeleton.map((item, index) => {
                  return <Skeleton key={index} />
                })
              : pizzas.map((pizza) => {
                  return <PizzaBlock key={pizza.id} {...pizza} />
                })
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
