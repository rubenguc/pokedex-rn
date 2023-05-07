import { Box, SxProp, TextInput } from "dripsy";
import { FC, useEffect, useRef } from "react";
import FA5 from "react-native-vector-icons/FontAwesome5";
import Animated from "react-native-reanimated";

interface SearchInputProps {
  containerProps?: SxProp;
  blocked?: boolean;
  onPress?: () => void;
  onInputChange?: (text: string) => void;
  value?: string;
  autoFocus?: boolean;
}

export const SearchInput: FC<SearchInputProps> = ({
  containerProps,
  blocked,
  onPress,
  onInputChange,
  value,
  autoFocus,
}) => {
  const inputRef = useRef<typeof TextInput>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 600);
    }
  }, [autoFocus]);

  return (
    <Box
      as={Animated.View}
      sx={{
        backgroundColor: "#f6f6f6",
        borderRadius: 20,
        display: "flex",
        flexDirection: "row",
        px: 2,
        gap: 1,
        alignItems: "center",
        ...containerProps,
      }}
      onTouchStart={onPress}
      onRest={(a) => console.log("rest", a)}
      sharedTransitionTag="searchInput"
    >
      <FA5 name="search" size={16} color="#aaa" />
      <TextInput
        ref={inputRef}
        autoFocus={autoFocus}
        editable={!blocked}
        onChangeText={onInputChange}
        value={value}
        placeholder="Search pokemon"
        sx={{
          flex: 1,
          height: 37,
        }}
      />
    </Box>
  );
};
