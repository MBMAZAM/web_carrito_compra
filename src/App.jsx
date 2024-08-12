import { useState } from "react";

import { Guitar } from "./components/Guitar";
import { Header } from "./components/Header";

import { db } from "./data/db-guitar";

function App() {
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    //find - retorna el primer elemento que cumple con la condición || si no existe retorna undefined
    //Retorna la posición del elemento en el array || si no existe retorna -1
    const itemExists = cart.findIndex((idCart) => idCart.id === item.id);

    if (itemExists >= 0) {
      console.log("El producto ya existe en el carrito");
      const updateCart = [...cart];
      updateCart[itemExists].cantidad++;
      setCart(updateCart);
    } else {
      console.log("El producto no existe en el carrito");

      item.cantidad = 1;
      // setCart((prevCart) => [...prevCart, item]);
      setCart([...cart, item]);
    }
  };

  return (
    <>
      <Header 
        cart={cart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
