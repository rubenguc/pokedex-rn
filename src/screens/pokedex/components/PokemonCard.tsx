import { Pokeball } from "@src/components/Pokeball";
import { pokemonTypeColor } from "@src/utils/styles";
import { Box, Text } from "dripsy";
import { FC, memo } from "react";
import { TouchableOpacity } from "react-native";
import { Pokemon } from "@src/interfaces";
import Animated from "react-native-reanimated";

interface PokemonCardProps {
  item: Pokemon;
  onPress: () => void;
}

export const PokemonCard: FC<PokemonCardProps> = memo(({ item, onPress }) => {
  return (
    <Box
      sx={{
        width: "50%",
        px: 1,
        py: 5.3,
      }}
    >
      <Box
        as={TouchableOpacity}
        // @ts-ignore
        activeOpacity={0.7}
        onPress={onPress}
        sx={{
          backgroundColor: pokemonTypeColor[item?.types?.[0]?.type?.name],

          borderRadius: 14,
          py: 10,
          pl: 3,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0,
          shadowRadius: 10,
          elevation: 5,
          overflow: "hidden",
        }}
      >
        <Text
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textTransform: "capitalize",
            mb: 1,
          }}
        >
          {item.name || ""}
        </Text>

        <Box
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
              gap: 1,
            }}
          >
            {item?.types?.map((type, index) => (
              <Text
                sx={{
                  color: "#fff",
                  backgroundColor: "#ddd6",
                  px: 1,
                  py: 0.7,
                  borderRadius: 99999,
                  minWidth: 60,
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
                key={index}
              >
                {type?.type?.name}
              </Text>
            ))}
          </Box>

          <Animated.Image
            source={{ uri: item?.sprites?.front_default || "" }}
            style={{
              width: 70,
              height: 60,
            }}
            resizeMode="contain"
            sharedTransitionTag={item.name}
          />
        </Box>

        <Pokeball
          fillColor="#fff5"
          width={120}
          height={110}
          style={{
            position: "absolute",
            right: -34,
            bottom: -20,
            zIndex: -1,
          }}
        />
      </Box>
    </Box>
  );
});
