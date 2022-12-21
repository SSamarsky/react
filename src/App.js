import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Cart } from "./pages/cart/Cart";
import { Home } from "./pages/home/Home";
import { NotFound } from "./pages/notFound/NotFound";
import "./scss/app.scss";

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="" element={<Navigate to="home" />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
