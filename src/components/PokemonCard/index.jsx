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
      sx={{ maxWidth: 360, width: 250, position: "relative" }}
      style={{
        boxShadow: "none",
        border: "1px black solid",
        borderRadius: "16px",
      }}
      className="cardPokemon"
    >
      <Box
        height={200}
        display={"flex"}
        justifyContent="center"
        alignItems="center"
      >
        <Box
           sx={{
    display: "block",
    width: "12%",
    height: "13%",
    borderRadius: "58% 42% 64% 36% / 47% 45% 55% 53%",
    backgroundColor: "#123456",
    position: "absolute",
    top: "12%",
    left: "27%",

  }}
        />
        <CardMedia
          sx={{ height: 150, width: 150, position: "relative" }}
          image={`${sprites.other["official-artwork"].front_default}`}
          title="green iguana"
     
        />
      </Box>
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
