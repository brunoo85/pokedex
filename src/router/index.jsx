import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { ProfilePage } from "../pages/Profile";
import { useState } from "react";

export const Router = () => {
  const [pokemonData, setPokemonData] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage setPokemonData={setPokemonData} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage pokemonData={pokemonData} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
