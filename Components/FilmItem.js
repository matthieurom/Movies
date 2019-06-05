import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {getImageFromApi} from '../API/TMDBApi'

class FilmItem extends React.Component {
    render() {
          const { film, displayDetailForFilm } = this.props
        return (
            <TouchableOpacity 
                style = {styles.globale}
                onPress = {() => displayDetailForFilm(film.id)}>
                <Image
                    style = {styles.image}
                    source = {{uri: getImageFromApi(film.poster_path)}}     
                 />
                                
                <View style = {styles.content}>
                    <View style = {styles.header}>
                        <Text style = {styles.header_title}>{film.title}</Text>
                        <Text style = {styles.header_note}>{film.vote_average}</Text>
                     </View>
                     <View style = {styles.description} >
                        <Text style= {styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style = {styles.date}>
                        <Text style={styles.date_text}>{film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    globale: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
         
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        margin: 5

    },
    header: {
        flex: 0.30,
        flexDirection: 'row',

    },
    header_title: {
        flex: 0.85,
        fontWeight: 'bold',
        fontSize: 20,
        flexWrap: 'wrap',
      
    },
    header_note: {
        flex: 0.15,
        fontSize: 26,
        color: '#666666'
    },
    description: {
        flex: 0.6,

    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    date_text: {
        fontSize: 14
    }
})

export default FilmItem