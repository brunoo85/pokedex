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
  const navigate = useNavigate();

  const lastPokemonRef = useRef();

  // useEffect(() => {
  //   getPokemons();
  // }, []);

  const getPokemons = useCallback(async () => {
    if(loading || !hasMore) return;

    setLoading(true);
    var endpoints = [];

    for (let i = offset + 1; i <= offset + 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    try{
      const responses = await axios.all(endpoints.map((endpoint) => axios.get(endpoint)));
      setPokemons((prev) => [...prev, ...responses]);
    setOffset((prev) => prev + 50);

    if(offset+50 >= 1000){
      setHasMore(false);
    }
    } catch (err){
      console.error(err);
    } finally {
      setLoading(false);
    }
  //   axios
  //     .all(endpoints.map((endpoint) => axios.get(endpoint)))
  //     .then((res) => {
  //       setPokemons((prev) => [...prev, ...res]);
  //       setOffset((prev) => prev + 50);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  }, [offset, loading, hasMore]);

  const pokemonFilter = (name) => {
    // var filteredPokemons = [];
    if (name === "") {
      setPokemons([]);
      setOffset(0);
      setHasMore(true);
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
    if (pokemons.length === 0 && offset === 0) {
      getPokemons();
    }
  }, []);



useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          getPokemons();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
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
    <div>
      <Navbar pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        <Grid container spacing={3} >
          {pokemons.length === 0 && !loading ? (
            <Skeletons />
          ) : (
            pokemons.map((pokemon, index) => {
              const isLast = index === pokemon.length-1;
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
              )
            })
          )}
          {loading && <Skeletons />}
        </Grid>
      </Container>
    </div>
  );
};
