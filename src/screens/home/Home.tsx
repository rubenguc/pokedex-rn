import { FC } from "react";
import { Box, FlatList, Text, TextInput } from "dripsy";
import { Card } from "./components/Card";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import FA5 from "react-native-vector-icons/FontAwesome5";
import { SearchInput } from "@src/components";

export interface Option {
  name: string;
  color: string;
  redirectTo: string;
  isCoomingSoon: boolean;
}

const options: Option[] = [
  {
    name: "Pokedex",
    color: "#4fc1a6",
    redirectTo: "Pokedex",
    isCoomingSoon: false,
  },
  {
    name: "Moves",
    color: "#f7776a",
    redirectTo: "",
    isCoomingSoon: true,
  },
  {
    name: "Abilities",
    color: "#58a9f4",
    redirectTo: "",
    isCoomingSoon: true,
  },
  {
    name: "Items",
    color: "#ffce4d",
    redirectTo: "",
    isCoomingSoon: true,
  },
  {
    name: "Locations",
    color: "#7c528e",
    redirectTo: "",
    isCoomingSoon: true,
  },
  {
    name: "Type Charts",
    color: "#b1736d",
    redirectTo: "",
    isCoomingSoon: true,
  },
];

type HomeProps = NativeStackScreenProps<{}>;

export const Home: FC<HomeProps> = ({ navigation }) => {
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <Text
        sx={{
          fontWeight: "600",
          whiteSpace: "break-spaces",
          mb: 23,
          fontSize: 32,
          color: "#000",
        }}
      >
        {"What pokemon \nare you looking for?"}
      </Text>

      <SearchInput
        blocked={true}
        onPress={() => navigation.navigate("Search")}
        containerProps={{
          mb: 4,
        }}
      />

      <FlatList
        data={options}
        numColumns={2}
        ItemSeparatorComponent={() => (
          <Box
            sx={{
              width: 10,
            }}
          />
        )}
        renderItem={({ item }) => (
          <Card
            item={item as Option}
            onPress={() => navigation.navigate((item as Option).redirectTo)}
          />
        )}
      />
    </Box>
  );
};
