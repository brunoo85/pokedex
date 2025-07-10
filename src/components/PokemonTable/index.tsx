import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { typerHandler } from "../../utis/TypeHandles";

export default function PokemonTable({ pokemonData }) {
  const { height, weight, types } = pokemonData;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="a dense table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>{"Weight"}</TableCell>
            <TableCell>{weight}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>{"Height"}</TableCell>
            <TableCell>{height}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>{"Tipos"}</TableCell>
            <TableCell>{typerHandler(types)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
