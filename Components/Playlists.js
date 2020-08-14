import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View } from 'react-native';
import Playlist from './Playlist.js';

export default class Playlists extends React.Component {
    renderItem = ({item, index}) => {
        const ref = `playlist${index}`;
        const getFirstItem = () => {
            return index === this.props.position.colIndex ?
                this.props.position.rowIndex : 0;
        };
        return (
            <Playlist
                ref={(e) => { this[ref] = e; }}
                title={item.title}
                videos={item.videos}
                onSnapToItem={this.props.onSnapToItem}
                firstItem={getFirstItem()}
            />
        );
    }

    render () {
        return (
            <View style={{marginLeft: 30}}>
                <Carousel
                    ref={(e) => { this.playlistCol = e; }}
                    data={ this.props.playlists }
                    layout={"default"}
                    vertical={true}
                    activeSlideAlignment={'start'}
                    renderItem={this.renderItem}
                    sliderWidth={1920}
                    sliderHeight={1080}
                    itemWidth={1920}
                    itemHeight={315}
                    onSnapToItem={this.props.onSnapToItem}
                    firstItem={this.props.position.colIndex}
                />
            </View>
        );
    }
}