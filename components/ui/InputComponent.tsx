import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
interface propsT extends TextInputProps {
  label?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
  whiteBg?: boolean;
}
const InputComponent = ({
  label,
  setValue,
  error,
  setError,
  whiteBg,
  value,
  children,
  ...rest
}: propsT) => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <View className="space-y-2 py-1">
      {label && (
        <Pressable
          onPress={() => {
            inputRef.current && inputRef.current.focus();
          }}
        >
          <Text className="font-medium text-16 text-primary">{label}</Text>
        </Pressable>
      )}
      <KeyboardAvoidingView>
        <TextInput
          ref={inputRef}
          className={` border border-1 rounded-lg p-2 ${whiteBg && "bg-white"}`}
          value={value ? value : ""}
          onChangeText={(text) => {
            setValue && setValue(text);
            error && setError && setError("");
          }}
          {...rest}
        />
        {Boolean(error) && (
          <Text className=" text-danger font-regular text-[14px]">{error}</Text>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default InputComponent;
