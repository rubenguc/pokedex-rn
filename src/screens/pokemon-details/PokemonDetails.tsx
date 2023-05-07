import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { pokemonTypeColor } from "@src/utils/styles";
import { Box, Text } from "dripsy";
import { FC, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {
  Move,
  Pokemon,
  PokemonEvolution,
  PokemonSpecie,
} from "@src/interfaces";
import { About } from "./About";
import { BaseStats } from "./BaseStats";
import { Evolution } from "./Evolution";
import { Moves } from "./Moves";
import { pokemonService } from "@src/services/pokemon";
import { http } from "@src/services/http";
import { Pokeball } from "@src/components";

interface Tabs {
  key: string;
  title: string;
}

const TABS: Tabs[] = [
  {
    key: "about",
    title: "about",
  },
  {
    key: "base_stats",
    title: "base stats",
  },
  {
    key: "evolution",
    title: "evolution",
  },
  {
    key: "moves",
    title: "moves",
  },
];

type PokemonDetailsProps = NativeStackScreenProps<{}>;

export const PokemonDetails: FC<PokemonDetailsProps> = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecie | null>(
    null
  );
  const [pokemonEvolution, setPokemonEvolution] =
    useState<PokemonEvolution | null>(null);

  const [pokemonMoves, setPokemonMoves] = useState<Move[]>([]);

  const pokemon = route.params as Pokemon;
  const pokemonColor = pokemonTypeColor[pokemon?.types?.[0]?.type?.name];

  const rotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${rotation.value}deg`,
        },
      ],
    };
  }, [rotation.value]);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1
    );
    return () => cancelAnimation(rotation);
  }, []);

  const renderScene = SceneMap({
    about: () => <About pokemon={pokemon} pokemonSpecie={pokemonSpecie} />,
    base_stats: () => <BaseStats pokemon={pokemon} />,
    evolution: () => (
      <Evolution pokemonEvolution={pokemonEvolution as PokemonEvolution} />
    ),
    moves: () => <Moves moves={pokemonMoves} />,
  });

  useEffect(() => {
    if (pokemon) {
      (async () => {
        const pokemonSpecie: PokemonSpecie = await pokemonService.getSpecieById(
          pokemon.id
        );

        const { data: evolutionChart } = await http.get(
          pokemonSpecie.evolution_chain.url
        );

        const moves = await Promise.all(
          pokemon.moves.map(async (move) => http.get(move.move.url))
        );

        setPokemonSpecie(pokemonSpecie);
        setPokemonEvolution(evolutionChart);
        setPokemonMoves(moves.map((move) => move.data));
      })();
    }
  }, [pokemon]);

  return (
    <>
      <Animated.View
        style={[styles.container, { backgroundColor: pokemonColor }]}
      >
        <Box
          sx={{
            px: 2,
          }}
        >
          <Text
            sx={{
              textTransform: "capitalize",
              color: "#fff",
              fontSize: 30,
              mb: 1,
            }}
          >
            {pokemon.name}
          </Text>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1,
            }}
          >
            {pokemon?.types?.map((type, index) => (
              <Text
                sx={{
                  color: "#fff",
                  backgroundColor: "#ddd6",
                  px: 1,
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
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            marginBottom: -40,
            marginTop: 30,
            zIndex: 20,
          }}
        >
          <Animated.Image
            source={{ uri: pokemon?.sprites?.front_default || "" }}
            style={{
              width: 160,
              height: 140,
              // backgroundColor: "red",
            }}
            resizeMode="cover"
            sharedTransitionTag={pokemon.name}
          />
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={[
              {
                position: "absolute",
                top: -110,
                zIndex: -1,
              },
              animatedStyles,
            ]}
          >
            <Pokeball fillColor="#ddd3" width={180} height={180} />
          </Animated.View>
        </Box>

        <Box
          sx={{
            width: "100%",
            flex: 1,
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
            paddingTop: 20,
            paddingHorizontal: 20,
            position: "relative",
          }}
        >
          <TabView
            navigationState={{ index, routes: TABS }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            style={{
              zIndex: 9999999999,
            }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: "#000" }}
                activeColor="#000"
                inactiveColor="#aaa"
                labelStyle={{
                  fontSize: 12,
                  padding: 0,
                  textTransform: "capitalize",
                }}
                style={{
                  backgroundColor: "transparent",
                  elevation: 0,
                }}
                android_ripple={{
                  radius: null,
                  borderless: null,
                  color: null,
                  foreground: null,
                }}
              />
            )}
          />
        </Box>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
  },
});
