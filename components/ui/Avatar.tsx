import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";

const Avatar = ({
  image,
  size = 50,
}: {
  size?: number;
  image: ImageSourcePropType;
}) => {
  return (
    <View className="">
      <Image
        className="aspect-square rounded-full object-cover"
        style={{ width: size, height: size }}
        source={image}
      />
    </View>
  );
};

export default Avatar;
