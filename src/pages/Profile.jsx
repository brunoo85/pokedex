import React from "react";
import Navbar from "../components/Navbar";

export const ProfilePage = ({ pokemonData }) => {
  console.log(pokemonData);
  return (
    <>
      {" "}
      <Navbar hideSearch />
    </>
  );
};
