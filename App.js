/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {watchEvents} from 'react-native-watch-connectivity';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [receivedMessage, setReceivedMessage] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = watchEvents.on('message', (message, reply) => {
      console.log('received message from watch', message);
      setReceivedMessage(message);
      var something = Math.floor(Math.random() * Math.floor(10000));
      reply({text: something});
    });

    console.log('Should be listening....');

    return () => unsubscribe();
  }, [receivedMessage]); // i'm using `receivedMessage` as a way to trigger this effect to run every time it changes, you could try removing this and replacing it with an empty array to see if it will work without needing to re-fire the effect

  // another way to try would be seeing if you can get `addEventListener` up, although this isn't in the docs so it may not work
  // listeners are only documented with app context http://mtford.co.uk/react-native-watch-connectivity/docs/communication#application-context
  // so this may not work, but you could try it. you could also try utilizing app context, although i doubt thats an option
  //
  // React.useEffect(() => {
  //   watchEvents.addListener('message', (message, reply) => {
  //     console.log('received message from watch', message);
  //     const text = Math.floor(Math.random() * Math.floor(10000));
  //     reply({text});
  //   });

  //   return () => watchEvents.removeListener('message');
  // }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
