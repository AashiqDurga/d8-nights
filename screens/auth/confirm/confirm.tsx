import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components/ui";
import { ImageOverlay } from "../sign-in/extra/image-overlay.component";
import { KeyboardAvoidingView } from "../sign-in/extra/3rd-party";
import { Auth } from "aws-amplify";

const Confirm =({ route, navigation }): React.ReactElement => {
  const [code, setCode] = useState<string>("");
  const { email } = route.params;

  async function onConfirmSignUpButtonPress() {
    try {
      await Auth.confirmSignUp(email, code);

      navigation && navigation.navigate("Home", { screen: "Home" });
    } catch (error) {
      console.log("error confirming sign up", error);
      Alert.alert("Is that the code we sent you? 👀", error.message);
    }
  }

  return (
      <ImageOverlay
        style={styles.container}
        source={require("../sign-in/assets/image-background.jpg")}
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Almost there 👏
          </Text>
          <Text style={styles.confirmLabel} category="s1" status="control">
            Enter the confirmation code we emailed to you 🕵🏽‍♀️
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Confirmation Code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
        </View>
        <Button
          style={styles.confirmButton}
          size="giant"
          onPress={onConfirmSignUpButtonPress}
        >
          Confirm
        </Button>
      </ImageOverlay>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  confirmLabel: {
    marginTop: 16,
  },
  confirmButton: {
    marginHorizontal: 16,
  },
});
