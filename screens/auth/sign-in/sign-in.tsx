import React from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components/ui";
import { ImageOverlay } from "./extra/image-overlay.component";
import {
  EyeIcon,
  EyeOffIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  TwitterIcon,
} from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";
import { Auth } from "aws-amplify";
import { validateEmail } from "../validation/validate";

export default ({ navigation }): React.ReactElement => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onSignInButtonPress = async (): Promise<void> => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email 😱",
        "Please review the email address you have entered."
      );
      return;
    }
    try {
      const user = await Auth.signIn(email, password).then(() => {
        console.log(user);
        return navigation && navigation.navigate("Home");
      });
    } catch (error) {
      console.log("error signing in", error);
      Alert.alert("😔",error.message)
    }
  };

  const onSignUpButtonPress = (): void => {
    navigation && navigation.navigate("signUp");
  };

  const onForgotPasswordButtonPress = (): void => {
    navigation && navigation.navigate("ForgotPassword");
  };

  const onPasswordIconPress = (): void => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require("./assets/image-background.jpg")}
      >
        <View style={styles.headerContainer}>
          <Text category="h1" status="control">
            Hello
          </Text>
          <Text style={styles.signInLabel} category="s1" status="control">
            Sign in to your account
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Input
            status="control"
            placeholder="Email"
            accessoryRight={PersonIcon}
            value={email}
            onChangeText={setEmail}
          />
          <Input
            style={styles.passwordInput}
            status="control"
            placeholder="Password"
            accessoryRight={passwordVisible ? EyeIcon : EyeOffIcon}
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            onIconPress={onPasswordIconPress}
          />
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordButton}
              appearance="ghost"
              status="control"
              onPress={onForgotPasswordButtonPress}
            >
              Forgot your password?
            </Button>
          </View>
        </View>
        <Button
          style={styles.signInButton}
          size="giant"
          onPress={onSignInButtonPress}
        >
          SIGN IN
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            Or Sign In using Social Media
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryRight={GoogleIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryRight={FacebookIcon}
            />
            <Button
              appearance="ghost"
              status="control"
              size="giant"
              accessoryRight={TwitterIcon}
            />
          </View>
        </View>
        <Button
          style={styles.signUpButton}
          appearance="ghost"
          status="control"
          onPress={onSignUpButtonPress}
        >
          Don't have an account? Sign Up
        </Button>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

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
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
});
