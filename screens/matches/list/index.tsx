import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Input, Layout, List, StyleService, useStyleSheet } from '@ui-kitten/components';
import { MessageItem } from './extra/message-item.component';
import { SearchIcon } from './extra/icons';
import { Message } from './extra/data';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

const initialMessages: Message[] = [
  Message.howAreYou(),
  Message.canYouSend(),
  Message.noProblem(),
];

export default ({ navigation }): React.ReactElement => {

  const styles = useStyleSheet(themedStyles);
  const [searchQuery, setSearchQuery] = React.useState<string>();


  const onItemPress = (index: number): void => {
    navigation && navigation.navigate('chat');
  };

  const renderItem = (info: ListRenderItemInfo<Message>): React.ReactElement => (
    <MessageItem
      style={styles.item}
      message={info.item}
      onPress={onItemPress}
    />
  );

  const renderHeader = (): React.ReactElement => (
    <Layout
      style={styles.header}
      level='1'>
      <Input
        placeholder='Search'
        value={searchQuery}
        icon={SearchIcon}
      />
    </Layout>
  );

  return (
    <SafeAreaConsumer>
    {insets => 
    <List
      style={{flex: 1, paddingTop: insets?.top}}
      data={initialMessages}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
    />
}
  </SafeAreaConsumer>
  );
};

const themedStyles = StyleService.create({

  list: {
    flex: 1,
  },
 
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
});
