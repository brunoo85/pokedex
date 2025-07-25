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
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);
  const navigate = useNavigate();
  const lastPokemonRef = useRef();

  const getPokemons = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    var endpoints = [];

    for (let i = offset + 1; i <= offset + 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    try {
      const responses = await axios.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );

      setPokemons((prev) => [...prev, ...responses]);
      setOffset((prev) => prev + 50);

      if (offset + 50 >= 1000) {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  const pokemonFilter = (name) => {
    if (name === "") {
      setPokemons([]);
      setOffset(0);
      setHasMore(true);
      setInitialLoad(false);
      return;
    }

    var filteredPokemons = [];
    for (var i in pokemons) {
      if (pokemons[i].data.name.toLowerCase().includes(name.toLowerCase())) {
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
    if (!initialLoad && pokemons.length === 0 && offset === 0) {
      setInitialLoad(true);
      getPokemons();
    }
  }, [initialLoad, pokemons.length, offset, getPokemons]);

  useEffect(() => {
    if (loading || !hasMore || !initialLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          getPokemons();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    const currentLastElement = lastPokemonRef.current;
    if (currentLastElement) {
      observer.observe(currentLastElement);
    }

    return () => {
      if (currentLastElement) {
        observer.unobserve(currentLastElement);
      }
    };
  }, [pokemons.length, loading, hasMore, getPokemons]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3} sx={{justifyContent: "center"}} style={{display:"flex"}} >
          {pokemons.length === 0 && !loading ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, index) => {
              const isLast = index === pokemons.length - 1;

              return (
                <Grid
                  key={`${pokemon.data.id}-${index}`}
                  item
                  xs={12}
                  sm={6}
                  md={2}
                  ref={isLast ? lastPokemonRef : null}
                >
                  <Box onClick={() => pokemonPickHandler(pokemon.data)}>
                    <PokemonCard pokemon={pokemon} />
                  </Box>
                </Grid>
              );
            })
          )}
          {loading && <Skeletons />}
        </Grid>
      </Container>
    </div>
  );
};
