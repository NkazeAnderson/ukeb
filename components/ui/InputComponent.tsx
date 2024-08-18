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
}
const InputComponent = (props: propsT) => {
  const inputRef = useRef<TextInput | null>(null);
  return (
    <KeyboardAvoidingView className="space-y-2 py-1">
      {props.label && (
        <Text
          onPress={() => {
            inputRef.current && inputRef.current.focus();
          }}
          className="font-medium text-16 text-primary"
        >
          {props.label}
        </Text>
      )}

      <TextInput
        ref={inputRef}
        className=" border border-1 rounded-lg p-2"
        value={props.value ? props.value : ""}
        onChangeText={(text) => {
          props.setValue && props.setValue(text);
          props.error && props.setError && props.setError("");
        }}
      />
      {props.error && (
        <Text className=" text-danger font-regular text-[14px]">
          {props.error}
        </Text>
      )}
    </KeyboardAvoidingView>
  );
};

export default InputComponent;
