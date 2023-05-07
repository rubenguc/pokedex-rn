import Main from "./src/Main";
import { Box, DripsyProvider, makeTheme, SafeAreaView } from "dripsy";
import { Pokeball } from "@src/components";

const theme = makeTheme({});

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <SafeAreaView
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <Box
          sx={{
            flex: 1,
            zIndex: 0,
            backgroundColor: "transparent",
          }}
        >
          <Main />
        </Box>
        <Pokeball
          fillColor="#ddd3"
          width={260}
          height={260}
          style={{
            position: "absolute",
            right: -95,
            top: -69,
            zIndex: -1,
          }}
        />
      </SafeAreaView>
    </DripsyProvider>
  );
}
