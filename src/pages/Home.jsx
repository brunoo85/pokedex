import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Container, Grid } from "@mui/material";
import axios from "axios";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (let i = 1; i <= 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => setPokemons(res));

    // axios
    //   .get("https://pokeapi.co/api/v2/pokemon?limit=50")
    //   .then((res) => {
    //     setPokemons(res.data.results);
    //     console.log(res.data.results);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching Pokémon data:", error);
    //   });
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {pokemons.map((pokemon, index) => (
            <Grid item key={index} size={2}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}

          {/* <Grid item size={3}>
            <PokemonCard />
          </Grid>
          <Grid item size={3}>
            <PokemonCard />
          </Grid>
          <Grid item size={3}>
            <PokemonCard />
          </Grid>
          <Grid item size={3}>
            <PokemonCard />
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};
