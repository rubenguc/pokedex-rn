import { FC } from "react";
import { Move } from "@src/interfaces";
import { pokemonTypeColor } from "@src/utils/styles";
import { Box, ScrollView, Text } from "dripsy";

interface MovesProps {
  moves: Move[];
}

export const Moves: FC<MovesProps> = ({ moves }) => {
  // sort moves by name

  const sorterMoves = moves.sort((a, b) => {
    if (a.name === b.name) return 0;

    return a.name < b.name ? -1 : 1;
  });

  return (
    <Box
      sx={{
        flex: 1,
        py: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Text
            sx={{
              fontWeight: "bold",
              color: "#444",
            }}
          >
            name
          </Text>
        </Box>
        <Box
          sx={{
            flex: 0.3,
          }}
        >
          <Text
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#444",
            }}
          >
            Type
          </Text>
        </Box>
        <Box
          sx={{
            flex: 0.25,
          }}
        >
          <Text
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#444",
            }}
          >
            Power
          </Text>
        </Box>
        <Box
          sx={{
            flex: 0.2,
          }}
        >
          <Text
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#444",
            }}
          >
            Acc
          </Text>
        </Box>
        <Box
          sx={{
            flex: 0.2,
          }}
        >
          <Text
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#444",
            }}
          >
            PP
          </Text>
        </Box>
      </Box>
      <ScrollView>
        {sorterMoves.map((move) => (
          <Box
            key={move?.name}
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              py: 1,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc2",
            }}
          >
            <Box
              sx={{
                flex: 1,
              }}
            >
              <Text sx={{ color: "#444" }}>{move?.name}</Text>
            </Box>
            <Box
              sx={{
                flex: 0.3,
              }}
            >
              <Text
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: pokemonTypeColor[move?.type.name],
                  color: "white",
                  borderRadius: 6,
                  textAlign: "center",
                }}
              >
                {move?.type.name}
              </Text>
            </Box>
            <Box
              sx={{
                flex: 0.25,
              }}
            >
              <Text
                sx={{
                  textAlign: "center",
                  color: "#444",
                }}
              >
                {move?.power}
              </Text>
            </Box>
            <Box
              sx={{
                flex: 0.2,
              }}
            >
              <Text
                sx={{
                  textAlign: "center",
                  color: "#444",
                }}
              >
                {move?.accuracy}
              </Text>
            </Box>
            <Box
              sx={{
                flex: 0.2,
              }}
            >
              <Text
                sx={{
                  textAlign: "center",
                  color: "#444",
                }}
              >
                {move?.pp}
              </Text>
            </Box>
          </Box>
        ))}
      </ScrollView>
    </Box>
  );
};
