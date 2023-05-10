import { dmToM, hgToKg } from "@src/utils/units";
import { Box, Text } from "dripsy";
import { FC } from "react";
import { Pokemon, PokemonSpecie } from "../../interfaces";

interface RowProps {
  label: string;
  content: string | string[] | undefined;
}

const Row: FC<RowProps> = ({ label, content }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Text
        sx={{
          width: "25%",
          color: "#444",
        }}
      >
        {label}
      </Text>
      <Text sx={{ color: "#444" }}>{content}</Text>
    </Box>
  );
};

interface AboutProps {
  pokemon: Pokemon;
  pokemonSpecie: PokemonSpecie | null;
}

export const About: FC<AboutProps> = ({ pokemon, pokemonSpecie }) => {
  return (
    <Box
      sx={{
        px: 10,
        py: 2,
        display: "flex",
        gap: 2,
      }}
    >
      <Row label="Height" content={`${dmToM(pokemon.height)} m`} />
      <Row label="Weight" content={`${hgToKg(pokemon.weight)} kg`} />
      <Row
        label="Abilities"
        content={pokemon?.abilities.map(
          (ab, index) =>
            ab.ability.name +
            (index === pokemon?.abilities.length - 1 ? "" : ", ")
        )}
      />
      <Row
        label="Egg groups"
        content={pokemonSpecie?.egg_groups.map(
          (egg, index) =>
            egg.name +
            (index === pokemonSpecie?.egg_groups.length - 1 ? "" : ", ")
        )}
      />
    </Box>
  );
};
