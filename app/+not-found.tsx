import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex flex-1 bg-background items-center justify-center">
      <Stack.Screen options={{ title: "Oops!" }} />
      <Text className="font-bold text-24 md:text-32 text-white">
        Page not found
      </Text>
      <Link
        href={"/"}
        className="font-bold text-16 md:text-24 text-white underline"
      >
        Go back Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
