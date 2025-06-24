
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
66
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function PokemonCard({ pokemon }) {
  console.log({ pokemon });
  const typerHandler = () => {
    if (pokemon.data.types[1]) {
      return (
        pokemon.data.types[0].type.name +
        " | " +
        pokemon.data.types[1].type.name
      );
    }
    return pokemon.data.types[0].type.name;
  };

  return (
    <Card sx={{ maxWidth: 360, width: 250 }}>
      <CardMedia
        sx={{ height: 200 }}
        image={`${pokemon.data.sprites.front_default}`}
        title="green iguana"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.data.name || "Pokemon Name"}
          </Typography>

          <Typography gutterBottom variant="caption" component="div">
            {typerHandler()}
          </Typography>
        </Box>

      </CardContent>
,
    </Card>
  );
}
