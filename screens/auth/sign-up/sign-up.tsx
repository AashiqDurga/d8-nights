import React, { useState } from "react";
import { View, Alert } from "react-native";
import {
  Button,
  CheckBox,
  Divider,
  Input,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import {
  ArrowForwardIconOutline,
  FacebookIcon,
  GoogleIcon,
  HeartIconFill,
  TwitterIcon,
} from "./extra/icons";
import { KeyboardAvoidingView } from "./extra/3rd-party";

import { Auth } from "aws-amplify";
import { validateEmail, validatePassword } from "../validation/validate";

const signUp = async (email: string, password: string) => {
  try {
    const { user } = await Auth.signUp({
      username: email,
      password,
    });
    console.log(user);
    return true;
  } catch (error) {
    console.log("error signing up:", error);
  }
};

export default ({ navigation }): React.ReactElement => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = (): void => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email 😱",
        "Please review the email address you have entered."
      );
      return;
    }

    if (!validatePassword(email)) {
      Alert.alert(
        "Insecure Password 🔒",
        "Please ensure you have the minimum password requirements."
      );
      return;
    }
    signUp(email, password).then((hasSignedUp) => {
      if (hasSignedUp) {
        navigation && navigation.navigate("confirm",{email});
      }
    });
  };

  const onSignInButtonPress = (): void => {
    navigation && navigation.navigate("signIn");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require("./assets/image-background.jpg")}
      >
        <Button
          style={styles.evaButton}
          appearance="ghost"
          status="control"
          size="large"
          accessoryRight={HeartIconFill}
        >
          D8
        </Button>
        <View style={styles.signUpContainer}>
          <Text style={styles.signInLabel} category="h4" status="control">
            SIGN UP
          </Text>
          <Button
            style={styles.signInButton}
            appearance="ghost"
            status="control"
            size="giant"
            accessoryRight={ArrowForwardIconOutline}
            onPress={onSignInButtonPress}
          >
            Sign In
          </Button>
        </View>
      </ImageOverlay>
      <View style={styles.socialAuthContainer}>
        <Text style={styles.socialAuthHintText}>
          Sign with a social account
        </Text>
        <View style={styles.socialAuthButtonsContainer}>
          <Button
            appearance="ghost"
            size="giant"
            status="basic"
            accessoryRight={GoogleIcon}
          />
          <Button
            appearance="ghost"
            size="giant"
            status="basic"
            accessoryRight={FacebookIcon}
          />
          <Button
            appearance="ghost"
            size="giant"
            status="basic"
            accessoryRight={TwitterIcon}
          />
        </View>
      </View>
      <View style={styles.orContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.orLabel} category="h5">
          OR
        </Text>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.emailSignLabel}>Sign up with Email</Text>
      <View style={[styles.container, styles.formContainer]}>
        <Input
          style={styles.formInput}
          placeholder="ally.watsan@gmail.com"
          label="EMAIL"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.formInput}
          label="PASSWORD"
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <CheckBox
          style={styles.termsCheckBox}
          checked={termsAccepted}
          onChange={(checked: boolean) => setTermsAccepted(checked)}
        >
          By creating an account, I agree to the D8 nights Terms of Use and
          Privacy Policy
        </CheckBox>
      </View>
      <Button
        style={styles.signUpButton}
        size="large"
        onPress={onSignUpButtonPress}
      >
        SIGN UP
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  evaButton: {
    maxWidth: 72,
    paddingHorizontal: 0,
  },
  signInLabel: {
    flex: 1,
  },
  signInButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  socialAuthIcon: {
    tintColor: "text-basic-color",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 52,
  },
  divider: {
    flex: 1,
  },
  orLabel: {
    marginHorizontal: 8,
  },
  emailSignLabel: {
    alignSelf: "center",
    marginTop: 8,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    color: "text-hint-color",
  },
});
