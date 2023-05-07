import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLoading } from "@src/hooks";
import { Pokemon } from "@src/interfaces";
import { http } from "@src/services/http";
import { pokemonService } from "@src/services/pokemon";
import { ActivityIndicator, Box, FlatList, Text } from "dripsy";
import { FC, useEffect, useState } from "react";
import { PokemonCard } from "./components";

type PokedexProps = NativeStackScreenProps<{}>;

export const Pokedex: FC<PokedexProps> = ({ navigation }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [params, setParams] = useState({
    offset: 0,
    limit: 20,
  });
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    if (isLoading || isFinished) return;
    startLoading();
    try {
      const data = await pokemonService.getAll(params);

      const pokemons = await Promise.all(
        (data?.results as Array<any>).map(async (pokemon) => {
          const { data } = await http.get(pokemon.url);
          return data;
        })
      );

      setPokemons((state) => [...state, ...pokemons]);
      if (data.next) {
        setParams((state) => ({
          offset: state.offset + 20,
          limit: state.limit,
        }));
      } else {
        setIsFinished(true);
      }
    } catch (error) {}
    stopLoading();
  };

  const goToDetails = (pokemon: Pokemon) => {
    navigation.navigate("PokemonDetails", pokemon);
  };

  return (
    <>
      <FlatList
        sx={{
          pb: 5,
          zIndex: 99999,
          backgroundColor: "transparent",
        }}
        data={pokemons}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.7}
        keyExtractor={(item) => (item as Pokemon).name}
        renderItem={({ item }) => (
          <PokemonCard
            item={item as any}
            onPress={() => goToDetails(item as Pokemon)}
          />
        )}
        ListFooterComponent={() =>
          !isLoading ? (
            <Box
              sx={{
                py: 20,
              }}
            >
              <ActivityIndicator />
            </Box>
          ) : null
        }
      />
    </>
  );
};
