import { Pokemon, PokemonEvolution } from "@src/interfaces";
import { Box, Image, Text } from "dripsy";
import { FC, useState, useEffect } from "react";
import { getChart, getNamesFromChart } from "@src/utils/pokemon";
import Icon from "react-native-vector-icons/FontAwesome";
import { pokemonService } from "@src/services/pokemon";

interface EvolutionProps {
  pokemonEvolution: PokemonEvolution;
}

export const Evolution: FC<EvolutionProps> = ({ pokemonEvolution }) => {
  const [chart, setChart] = useState([]);
  const [evolutionNames, setEvolutionNames] = useState<any>({});

  useEffect(() => {
    if (pokemonEvolution?.chain) {
      const chart = getChart(pokemonEvolution.chain, []);
      // console.log(chart);

      setChart(chart);
    }
    //
  }, [pokemonEvolution]);

  useEffect(() => {
    if (chart?.length > 0) {
      (async () => {
        const names = getNamesFromChart(chart);

        await Promise.all(
          Object.keys(names).map((name) =>
            pokemonService
              .getByName(name)
              .then(({ data }: { data: Pokemon }) => {
                names[name] = data.sprites.front_default;
              })
          )
        );

        setEvolutionNames(names);
      })();
    }
  }, [chart]);

  return (
    <Box
      sx={{
        px: 10,
        py: 2,
      }}
    >
      <Text>Evolution chart</Text>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 5,
          }}
        >
          {chart?.map((c, index) => (
            <Box
              key={index.toString()}
              sx={{
                display: "flex",
                gap: 3,
              }}
            >
              {c?.map((row, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "30%",
                    }}
                  >
                    {evolutionNames[row?.from] ? (
                      <Image
                        source={{ uri: evolutionNames[row?.from] }}
                        style={{
                          width: 70,
                          height: 60,
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Box
                        sx={{
                          backgroundColor: "#ddda",
                          width: 50,
                          height: 50,
                          borderRadius: 9999,
                        }}
                      />
                    )}
                    <Text>{row?.from}</Text>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon name="long-arrow-right" size={30} color="#ddda" />
                    {row?.requirements?.map((r) => (
                      <Text key={r} sx={{ fontSize: 10 }}>
                        {r}
                      </Text>
                    ))}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "30%",
                    }}
                  >
                    {evolutionNames[row?.to] ? (
                      <Image
                        source={{ uri: evolutionNames[row?.to] }}
                        style={{
                          width: 70,
                          height: 60,
                        }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Box
                        sx={{
                          backgroundColor: "#ddda",
                          width: 50,
                          height: 50,
                          borderRadius: 9999,
                        }}
                      />
                    )}

                    <Text>{row?.to}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
