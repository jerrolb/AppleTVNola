import React from 'react';
import {Image, View} from 'react-native';
import {Header} from '../components';
import {COLORS, IMG} from '../Constants';

const Contact = () => {
  return (
    <View style={styles.fullscreen}>
      <Header />
      <Image style={styles.image} source={{uri: IMG.CONTACT}} />
    </View>
  );
};

export default Contact;

const styles = {
  image: {
    width: '100%',
    height: '100%',
    marginTop: -100,
  },
  fullscreen: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.BLACK,
  },
};
