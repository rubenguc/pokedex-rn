import { FC, useEffect, useState } from "react";
import { SearchInput } from "@src/components";
import { pokemonService } from "@src/services/pokemon";
import { Pokemon } from "@src/interfaces";
import { ActivityIndicator, Box, Text } from "dripsy";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLoading } from "@src/hooks";

type SearchProps = NativeStackScreenProps<{}>;

export const Search: FC<SearchProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [pokemons, setPokemons] = useState<any>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const getData = setTimeout(async () => {
      startLoading();
      const { data }: { data: Pokemon } = await pokemonService.getByName(
        search
      );
      if (data.id) setPokemons([data]);
      else setPokemons([]);
      stopLoading();
    }, 1000);

    return () => clearTimeout(getData);
  }, [search]);

  return (
    <>
      <SearchInput
        value={search}
        onInputChange={setSearch}
        containerProps={{
          mx: 2,
          mt: 3,
          mb: 3,
        }}
        autoFocus
      />
      <Box
        sx={{
          px: 2,
        }}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            {pokemons.map((pokemon: Pokemon) => (
              <TouchableOpacity
                key={pokemon.id}
                activeOpacity={0.7}
                onPress={() => navigation.navigate("PokemonDetails", pokemon)}
              >
                <Box
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#ddd6",
                    borderRadius: 12,
                    py: 2,
                  }}
                >
                  <Animated.Image
                    source={{ uri: pokemon?.sprites?.front_default || "" }}
                    style={{
                      width: 80,
                      height: 42,
                    }}
                    resizeMode="cover"
                    sharedTransitionTag={pokemon.name}
                  />
                  <Text
                    sx={{
                      color: "#000",
                      fontSize: 16,
                      textTransform: "capitalize",
                    }}
                  >
                    {pokemon.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            ))}
          </>
        )}
      </Box>
    </>
  );
};
