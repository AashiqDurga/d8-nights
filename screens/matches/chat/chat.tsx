import React from "react";
import { ImageSourcePropType, Keyboard, Platform } from "react-native";
import {
  Button,
  Input,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { KeyboardAvoidingView } from "./extra/keyboard-avoiding-view.component";
import { Chat } from "./extra/chat.component";
import { AttachmentsMenu } from "./extra/attachments-menu.component";
import { Message } from "./extra/data";
import { SafeAreaConsumer } from "react-native-safe-area-context";

const initialMessages: Message[] = [
  Message.howAreYou(),
  Message.imFine(),
  Message.imFineToo(),
  Message.walkingWithDog(),
  Message.imageAttachment1(),
  Message.imageAttachment2(),
  Message.canIJoin(),
  Message.sure(),
];

const galleryAttachments: ImageSourcePropType[] = [
  require("./assets/image-attachment-1.png"),
  require("./assets/image-attachment-2.jpg"),
  require("./assets/image-attachment-1.png"),
  require("./assets/image-attachment-2.jpg"),
];

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

const PlusIcon = (props: any) => <Icon name="plus-circle-outline" {...props} />;
const MicIcon = (props: any) => <Icon name="mic-outline" {...props} />;
const PaperPlaneIcon = (props: any) => (
  <Icon name="paper-plane-outline" {...props} />
);
export default (): React.ReactElement => {
  const styles = useStyleSheet(themedStyles);

  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [message, setMessage] = React.useState<string>(null);
  const [attachmentsMenuVisible, setAttachmentsMenuVisible] = React.useState<
    boolean
  >(false);

  const sendButtonEnabled = (): boolean => {
    return message && message.length > 0;
  };

  const toggleAttachmentsMenu = (): void => {
    setAttachmentsMenuVisible(!attachmentsMenuVisible);
  };

  const onSendButtonPress = (): void => {
    setMessages([...messages, new Message(message, "now", true, null)]);
    setMessage(null);
    Keyboard.dismiss();
  };

  const renderAttachmentsMenu = (): React.ReactElement => (
    <AttachmentsMenu
      attachments={galleryAttachments}
      onSelectPhoto={toggleAttachmentsMenu}
      onSelectFile={toggleAttachmentsMenu}
      onSelectLocation={toggleAttachmentsMenu}
      onSelectContact={toggleAttachmentsMenu}
      onAttachmentSelect={toggleAttachmentsMenu}
      onCameraPress={toggleAttachmentsMenu}
      onDismiss={toggleAttachmentsMenu}
    />
  );

  return (
    <React.Fragment>
      <SafeAreaConsumer>
        {(insets) => (
          <Chat
            style={{ flex: 1, paddingTop: insets?.top }}
            contentContainerStyle={styles.listContent}
            followEnd={true}
            data={messages}
          />
        )}
      </SafeAreaConsumer>
      <KeyboardAvoidingView
        style={styles.messageInputContainer}
        offset={keyboardOffset}
      >
        <Button
          style={[styles.iconButton, styles.attachButton]}
          onPress={toggleAttachmentsMenu}
          accessoryLeft={PlusIcon}
        />
        <Input
          style={styles.messageInput}
          placeholder="Message..."
          value={message}
          onChangeText={setMessage}
          accessoryRight={MicIcon}
        />
        <Button
          appearance="ghost"
          style={[styles.iconButton, styles.sendButton]}
          accessoryRight={PaperPlaneIcon}
          disabled={!sendButtonEnabled()}
          onPress={onSendButtonPress}
        />
      </KeyboardAvoidingView>
      {attachmentsMenuVisible && renderAttachmentsMenu()}
    </React.Fragment>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  messageInputContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "background-basic-color-1",
  },
  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  sendButton: {
    marginRight: 4,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
});
