import { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import { Skeletons } from "../components/Skeletons";
import { useNavigate } from "react-router-dom";

export const HomePage = ({ setPokemonData }) => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const observerRef = useRef();
  const lastPokemonRef = useRef();

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = useCallback(() => {
    setLoading(true);
    var endpoints = [];
    for (let i = offset + 1; i <= offset + 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setPokemons((prev) => [...prev, ...res]);
        setOffset((prev) => prev + 50);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [offset]);

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setPokemons(filteredPokemons);
  };

  const pokemonPickHandler = (pokemonData) => {
    setPokemonData(pokemonData);
    navigate("/profile");
  };

  useEffect(() => {
    getPokemons();
  }, [getPokemons]);

  useEffect(() => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getPokemons();
      }
    });

    if (lastPokemonRef.current) {
      observerRef.current.observe(lastPokemonRef.current);
    }
  }, [loading, getPokemons]);

  return (
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3} id="teste">
          {pokemons.length === 0 ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, index) => {
              if (index === pokemon.length - 1) {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={2}
                    ref={lastPokemonRef}
                  >
                    <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                      <PokemonCard pokemon={pokemon} />
                    </Box>
                  </Grid>
                );
              } else {
                return (
                  <Grid key={index} item xs={12} sm={6} md={2}>
                    <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                      <PokemonCard pokemon={pokemon} />
                    </Box>
                  </Grid>
                );
              }
            })
          )}
          {loading && <Skeletons />}
        </Grid>
      </Container>
    </div>
  );
};
