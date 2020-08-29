import React from "react";
import {
  ImageBackground,
  ListRenderItemInfo,
  ScrollView,
  View,
  YellowBox,
  Alert,
} from "react-native";
import {
  Avatar,
  Button,
  List,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { ImageOverlay } from "./extra/image-overlay.component";
import { ProfileSocial } from "./extra/profile-social.component";
import { PinIcon } from "./extra/icons";
import { Post, Profile } from "./extra/data";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { Auth } from "aws-amplify";

/*
 * Will warn because container view is ScrollView that contains 3 List components inside.
 * Better workaround depends on the user needs.
 */
YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

const profile: Profile = Profile.jenAustin();

const friends: Profile[] = [
  Profile.jenAustin(),
  Profile.jenniferGreen(),
  Profile.helenKuper(),
  Profile.jenAustin(),
  Profile.jenniferGreen(),
  Profile.helenKuper(),
];

const posts: Post[] = [
  Post.plant1(),
  Post.travel1(),
  Post.style1(),
  Post.style1(),
  Post.plant1(),
  Post.travel1(),
  Post.travel1(),
  Post.style1(),
  Post.plant1(),
];
const SettingsIcon = (props: any) => (
  <Icon name="settings-outline" {...props} />
);
const EditIcon = (props: any) => <Icon name="edit-2-outline" {...props} />;
export default ({ navigation }: any): React.ReactElement => {
  const styles = useStyleSheet(themedStyle);

  const onEditButtonPress = (): void => {
    navigation && navigation.navigate("editProfile");
  };

  async function signOut() {
    try {
      await Auth.signOut().then( navigation && navigation.navigate("signIn"));
    } catch (error) {
      console.log("error signing out: ", error);
      Alert.alert("Oops",error.message)
    }
  }

  const onSignOutButtonPress = (): void => {
    signOut();
  };
  const onSettingsButtonPress = (): void => {
    // navigation && navigation.navigate("Chat1");
  };

  const renderFriendItem = (
    info: ListRenderItemInfo<Profile>
  ): React.ReactElement => (
    <View style={styles.friendItem}>
      <Avatar source={info.item.photo} />
    </View>
  );

  return (
    <SafeAreaConsumer>
      {(insets) => (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "background-basic-color-2",
            paddingTop: insets?.top,
          }}
        >
          <ImageOverlay
            style={styles.header}
            source={require("./assets/image-background.jpg")}
          >
            <Avatar style={styles.profileAvatar} source={profile.photo} />
            <Text style={styles.profileName} category="h5" status="control">
              {profile.fullName}
            </Text>
            <View style={styles.locationContainer}>
              <PinIcon />
              <Text style={styles.location} status="control">
                {profile.location}
              </Text>
            </View>
            <View style={styles.profileButtonsContainer}>
              <Button
                style={styles.profileButton}
                accessoryRight={EditIcon}
                onPress={onEditButtonPress}
              >
                Edit
              </Button>
              <Button
                style={styles.profileButton}
                status="control"
                accessoryRight={SettingsIcon}
                onPress={onSettingsButtonPress}
              >
                Settings
              </Button>
            </View>
            <View style={styles.socialsContainer}>
              <ProfileSocial
                style={styles.profileSocial}
                hint="Followers"
                value={`${profile.followers}`}
              />
              <ProfileSocial
                style={styles.profileSocial}
                hint="Following"
                value={`${profile.following}`}
              />
              <ProfileSocial
                style={styles.profileSocial}
                hint="Posts"
                value={`${profile.posts}`}
              />
            </View>
          </ImageOverlay>
          <Text style={styles.sectionLabel} category="s1">
            About
          </Text>
          <Text style={styles.profileDescription} appearance="hint">
            {profile.description}
          </Text>
          <Text style={styles.sectionLabel} category="s1">
            Selfies
          </Text>
          <List
            contentContainerStyle={styles.friendsList}
            horizontal={true}
            data={friends}
            renderItem={renderFriendItem}
          />
            <View style={styles.profileButtonsContainer}>
              <Button
                style={styles.profileButton}
                status="control"
                onPress={onSignOutButtonPress}
              >
                Sign out 👋🏾
              </Button>
            </View>
        </ScrollView>
      )}
    </SafeAreaConsumer>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "background-basic-color-2",
  },
  header: {
    paddingVertical: 24,
    alignItems: "center",
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    marginVertical: 16,
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: "row",
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: "row",
    width: "75%",
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  },
  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
});
