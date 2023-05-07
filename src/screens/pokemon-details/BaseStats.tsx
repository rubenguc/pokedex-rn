import { getStatPercent } from "@src/utils/units";
import { Box, Text } from "dripsy";
import { FC, useEffect } from "react";
import { Pokemon } from "../../interfaces";
import Animated from "react-native-reanimated";

interface StatProps {
  label: string;
  value: number;
  max: number;
}

const Stat: FC<StatProps> = ({ label, value, max }) => {
  const statPercent = getStatPercent(value, max);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text sx={{ width: "20%" }}>{label}</Text>
      <Text sx={{ width: "10%" }}>{value}</Text>
      <Box
        sx={{
          height: 3,
          width: "70%",
          backgroundColor: "#ddd",
          borderRadius: 99,
          position: "relative",
        }}
      >
        <Box
          as={Animated.View}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${statPercent}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </Box>
    </Box>
  );
};

interface BaseStatsProps {
  pokemon: Pokemon;
}

export const BaseStats: FC<BaseStatsProps> = ({ pokemon }) => {
  const pokemonStats = pokemon.stats || [];

  const total = pokemonStats.reduce((a, b) => a + b.base_stat, 0);

  return (
    <Box
      sx={{
        px: 10,
        py: 2,
        display: "flex",
        gap: 2,
      }}
    >
      <Stat label="HP" value={pokemonStats[0].base_stat} max={255} />
      <Stat label="Attack" value={pokemonStats[1].base_stat} max={190} />
      <Stat label="Defense" value={pokemonStats[2].base_stat} max={250} />
      <Stat label="Sp. Atk" value={pokemonStats[3].base_stat} max={194} />
      <Stat label="Sp. Def" value={pokemonStats[4].base_stat} max={250} />
      <Stat label="Speed" value={pokemonStats[5].base_stat} max={250} />
      <Stat label="Total" value={total} max={1125} />
    </Box>
  );
};
