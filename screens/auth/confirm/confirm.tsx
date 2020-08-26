import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  Divider,
  Layout,
  TopNavigation,
  Input,
  Button,
} from "@ui-kitten/components";
import { Auth } from "aws-amplify";

const confirm = ({ route, navigation }) => {
  const [code, setCode] = useState<string>("");
  const { email } = route.params;

  async function onConfirmSignUpButtonPress() {
    try {
      await Auth.confirmSignUp(email, code);

      navigation && navigation.navigate("Home", { screen: "Home" });
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="D8 Nights" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">D8's</Text>
        <Input onChangeText={setCode}></Input>
        <Button
          onPress={onConfirmSignUpButtonPress}
          accessibilityLabel="Confirm"
        >
          Confirm
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
export default confirm;
