import React from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Typography } from "@mui/material";

export const ProfilePage = ({ pokemonData }) => {
  const { name, sprites } = pokemonData;
  console.log(pokemonData);
  return (
    <>
      <Navbar hideSearch />
      <Container maxWidth="md">
        <Typography variant="h5" component="h1" gutterBottom>
          {name}
        </Typography>
        <Box component="img" src={sprites?.front_default} width="50%" />
      </Container>
    </>
  );
};
