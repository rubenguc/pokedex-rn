import { FC } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Ellipse, G, NumberProp, Path, Svg } from "react-native-svg";

interface PokeballProps {
  fillColor: string;
  style?: StyleProp<ViewStyle>;
  width: NumberProp;
  height: NumberProp;
}

export const Pokeball: FC<PokeballProps> = ({
  fillColor = "#fff",
  style,
  width,
  height,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 21590 27940" style={style}>
      <G>
        <Path
          fill={fillColor}
          d="M0 13359c1890,9 3779,18 5669,26 256,-2142 1320,-3400 2705,-4307 1535,-798 3063,-813 4597,-59 1522,802 2553,2170 2910,4313 1903,0 3805,0 5708,0 -391,-3975 -2023,-6910 -4743,-8910 -3934,-2662 -7793,-2848 -12369,152 -2984,2408 -4352,5635 -4478,8784z"
        />
        <Path
          fill={fillColor}
          d="M0 14620c1889,4 3777,9 5666,13 214,1325 642,2629 2130,3830 1989,1410 3987,1363 5993,-13 1181,-965 1884,-2237 2077,-3837 1908,0 3816,0 5725,0 -324,3996 -2132,7620 -6148,9790 -2767,1368 -5806,1649 -9313,53 -4227,-2464 -5783,-5925 -6129,-9836z"
        />
        <Ellipse fill={fillColor} cx="10757" cy="13982" rx="3924" ry="4253" />
      </G>
    </Svg>
  );
};
