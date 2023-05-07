import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "dripsy";
import { Home, Search, Pokedex, PokemonDetails } from "./screens";
import FA5 from "react-native-vector-icons/FontAwesome5";

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "transparent",
        },
      }}
    >
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          contentStyle: {
            zIndex: 10,
          },
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={navigation.goBack}
              sx={{
                mr: 10,
              }}
            >
              <FA5 name="arrow-left" color="#000" />
            </Pressable>
          ),
        })}
      >
        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Pokedex" component={Pokedex} />
        <Stack.Screen
          options={{
            headerShown: false,
            headerLeft: () => null,
          }}
          name="Search"
          component={Search}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            animation: "fade_from_bottom",
          }}
          name="PokemonDetails"
          component={PokemonDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
