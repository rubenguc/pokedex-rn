import { FC } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "dripsy";
import { Option } from "../Home";
import { Pokeball } from "@src/components/Pokeball";

interface CardProps {
  item: Option;
  onPress: () => void;
  isCoomingSoon?: boolean;
}

export const Card: FC<CardProps> = ({ item, onPress }) => {
  const isPressable = !item.isCoomingSoon;

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
        activeOpacity={isPressable ? 0.7 : 1}
        onPress={isPressable ? onPress : undefined}
        sx={{
          backgroundColor: item.color,
          borderRadius: 14,
          py: 22.5,
          px: 3,
          shadowColor: item.color,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0,
          shadowRadius: 10,
          elevation: 5,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {!isPressable && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#000a",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              sx={{
                color: "white",
                textAlign: "center",
                elevation: 1,
              }}
            >
              Cooming soon
            </Text>
          </Box>
        )}

        <Text
          sx={{
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          {item.name}
        </Text>

        <Box
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "#fff5",
            borderRadius: 9999,
            position: "absolute",
            top: -37,
            left: -30,
          }}
        />

        <Pokeball
          fillColor="#fff5"
          width={120}
          height={110}
          style={{
            position: "absolute",
            right: -34,
            top: -20,
          }}
        />
      </Box>
    </Box>
  );
};
