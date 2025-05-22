import "./App.css";
import Header from "./components/header/Header";
import Sort from "./components/sort/Sort";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clothes from "./pages/Clothes";
import Food from "./pages/Food";
import Favorites from "./pages/Favorites";
import CartPage from "./pages/CartPage";
import Electronics from "./pages/Electronics";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={
              <>
                <Sort />
                <Routes>
                  <Route path="/clothes" element={<Clothes />} />
                  <Route path="/food" element={<Food />} />
                  <Route path="/electronics" element={<Electronics />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/" element={<Clothes />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
