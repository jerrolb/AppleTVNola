import React from 'react';
import {Image, View, Text, TouchableHighlight} from 'react-native';

class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      isFocused: false,
    };
  }

  focus() {
    this.props.setIsHeaderFocused(true);
    this.setState({isFocused: true});
  }
  blur() {
    this.setState({isFocused: false});
  }
  getScreen() {
    if (this.props.label === 'Watch Live') {
      return 'watchLive';
    }
    if (this.props.label === 'Sermons') {
      return 'home';
    }
    if (this.props.label === 'Giving') {
      return 'giving';
    }
    if (this.props.label === 'Contact') {
      return 'contact';
    }
    if (this.props.label === 'Search') {
      return 'search';
    }
  }

  render() {
    const styles = {
      textStyle: {
        marginTop: 37,
        fontSize: 32,
        color: this.props.screen === this.props.label ? '#88c4dd' : 'white',
        fontWeight:
          this.state.isFocused || this.props.screen === this.props.label
            ? 'bold'
            : 'normal',
        textDecorationLine: this.state.isFocused ? 'underline' : 'none',
      },
    };
    const screen = this.getScreen();
    const isSearch = this.props.label === 'Search';

    return (
      <TouchableHighlight
        underlayColor="none"
        ref={(e) => {
          this[this.props.label] = e;
        }}
        onFocus={() => this.focus()}
        onBlur={() => this.blur()}
        onPress={() => this.props.setScreen(screen)}
        hasTVPreferredFocus={this.props.screen === this.props.label}>
        {(isSearch && (
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                marginTop: 32,
                width: this.state.isFocused ? 60 : 50,
                height: this.state.isFocused ? 60 : 50,
              }}
              source={{
                uri:
                  this.props.screen === this.props.label
                    ? 'searchBlue.png'
                    : 'search.png',
              }}
            />
            <Text> </Text>
          </View>
        )) || (
          <Text style={styles.textStyle}>
            {this.props.label +
              `${this.props.label !== 'Contact' ? '     ' : ''}`}
          </Text>
        )}
      </TouchableHighlight>
    );
  }
}

export default Tab;
