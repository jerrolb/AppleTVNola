import React from 'react';
import { View } from 'react-native';
import { Header, Info, Highlight, Playlists } from '../Components';
import { BODY } from '../Styles.js';

export default class Home extends React.Component {    
    render() {
        return (
            <View style={BODY}>
            <Header/>
            <Info/>
            <Highlight/>
            <Playlists
                ref={(e) => { this.playlists = e; }}
                playlists={this.props.playlists}
                onSnapToItem={this.props.onSnapToItem}
                position={this.props.position}
            />
            </View>
        );
    }
};