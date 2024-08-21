import {
  View,
  Text,
  TextInput,
  TextInputProps,
  KeyboardAvoidingView,
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
  ...rest
}: propsT) => {
  const inputRef = useRef<TextInput | null>(null);

  return (
    <KeyboardAvoidingView className="space-y-2 py-1">
      {label && (
        <Text
          onPress={() => {
            inputRef.current && inputRef.current.focus();
          }}
          className="font-medium text-16 text-primary"
        >
          {label}
        </Text>
      )}

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
      {error && (
        <Text className=" text-danger font-regular text-[14px]">{error}</Text>
      )}
    </KeyboardAvoidingView>
  );
};

export default InputComponent;
