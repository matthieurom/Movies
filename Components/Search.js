import React from 'react'
import {StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi' // import {} car c'est un export nommé dans TMDBApi.js


class Search extends React.Component {
    searchedText = ''
    page = 0 // Compteur pour connaitre la page courante
    totalPages = 0
    state = {
        films: [],
        isLoading: false
       
    }
    _loadFilms() {
        
        if(this.searchedText.length > 0 ) {
            this.setState({isLoading: true}) // lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [... this.state.films, ...data.results], // equivalent à film.concat(data)
                    isLoading: false // arret du chargement
                }) 
              })
           }
     }

     _displayLoading() {
         if(this.state.isLoading) {
             return (
             <View style = {styles.loading_container}>
                <ActivityIndicator size='large'/>
             </View>
             )

         }
     }

     _searchFilms() {
         this.page = 0
         this.totalPages = 0
         this.setState({
             films: []
             }, () => {
                console.log('page : ' + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
                this._loadFilms()
             }
         )

     }

     _searchedTextInputChanged(text) {
         this.searchedText= text
     }

     _displayDetailForFilm = (idFilm) => {
         console.log('Display film with id ' + idFilm)
         this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
     }


    render() {
        console.log("RENDER")
        return (
          <View style={styles.main_container}>
            <TextInput 
                style={styles.textinput}
                placeholder='Titre du film'
                onChangeText = {(text) => this._searchedTextInputChanged(text)}
                onSubmitEditing = {() => this._searchFilms()}/> 
            <Button  title='Rechercher' onPress={() => this._searchFilms()}/>
                      
            <FlatList
                data={this.state.films}
                keyExtractor = {(item) => item.id.toString()}
                renderItem={({item}) => <FilmItem film={item} displayDetailForFilm = {this._displayDetailForFilm}/>}
                onEndReachedThreshold={0.5}
                onEndReached = {() => {
                    if(this.page < this.totalPages) {
                        this._loadFilms()
                    }
                }}
            />
            {this._displayLoading()}
          </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
      
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


export default Search