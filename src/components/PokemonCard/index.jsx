import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
66;
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { typerHandler } from "../../utis/TypeHandles";

export default function PokemonCard({ pokemon }) {
  const { name, sprites, types } = pokemon.data;

  return (
    <Card
      sx={{ maxWidth: 360, width: 250 }}
      style={{
        boxShadow: "none",
        border: "1px black solid",
        borderRadius: "16px",
      }}
      className="cardPokemon"
    >
      <CardMedia
        sx={{ height: 200 }}
        image={`${sprites.other["official-artwork"].front_default}`}
        title="green iguana"
      />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {name || "Pokemon Name"}
          </Typography>

          <Typography gutterBottom variant="caption" component="div">
            {typerHandler(types)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
