import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CustomKeyboardAwareScrollView(
  props: React.ComponentProps<typeof KeyboardAwareScrollView>
) {
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      enableResetScrollToCoords={false}
      bounces={false}
      {...props}
    >
      {
        //@ts-ignore
        props.children
      }
    </KeyboardAwareScrollView>
  );
}
