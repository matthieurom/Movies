import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi,getImageFromApi } from '../API/TMDBApi'

class FilmDetail extends React.Component {

    state = {
        film: undefined, //Pour l'instant on n'a pas les infos du film, on initialise donc à undefined
        isLoading: true // A l'ouverture de la vue, on affiche el chargement, le temps de récup le détail du film
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            //  this.props.navigation.state.params.idFilm = this.props.navigation.getParam('idFilm') : equivalent
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayLoading() {
        if(this.state.isLoading) {
            return (
                // Si isLoading vaut true, on affiche le chargement à l'écran
                <View style = {styles.loading_container}>
                    <ActivityIndicator size ='large'/>
                </View>
            )
        }
    }

    _getGenre() {
        let genreFinal = ''  
        let genres = this.state.film.genres
        genres.forEach((element) => {
            genreFinal = genreFinal.concat(element.name+' / ')  
        });
       
        return genreFinal.substring(0,genreFinal.length-2);
    }

    _getCompanie() {
        let genreFinal = ''  
        let genres = this.state.film.production_companies
        genres.forEach((element) => {
            genreFinal = genreFinal.concat(element.name+' / ')  
        });

        return genreFinal.substring(0,genreFinal.length-2);
    }

    _displayFilm() {
        if(this.state.film != undefined) {
            return (
                <ScrollView style = {styles.scrollview_container}>
                   
                     <Image
                        style = {styles.image}
                        source = {{uri: getImageFromApi(this.state.film.backdrop_path)}} 
                    />
                    <View style={styles.content}>
                        <View styles={styles.title}>
                            <Text style = {styles.title_text}>{this.state.film.title}</Text>
                        </View>
                        <View style = {styles.description}>
                            <Text style = {styles.description_text}>{this.state.film.overview}}</Text>
                        </View>

                        <View style = {styles.detail}>
                            <Text>Sorti le {this.state.film.release_date}</Text>
                            <Text>Note : {this.state.film.vote_average} / 10</Text>
                            <Text>Nombre de vote : {this.state.film.vote_count}</Text>
                            <Text>Budget : {this.state.film.budget}</Text>
                            <Text>Genre(s) : {this._getGenre()} </Text>
                            <Text>Companie(s) : {this.state.film.production_companies.map((company) => company.name ).join(" / ")} </Text>
                        </View>
                    </View>
                    
                </ScrollView>
            )
        }
    }
    render() {
       console.log(this.state.film)
        return (
            <View style = {styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollview_container : {
       // flex: 1
    },
    content: {
       flex: 1
    },
    image: {
        width: 405,
        height: 160,
        margin: 5,
    },
   title: {
       flex: 0.3,
       backgroundColor: 'blue'
   },
   title_text: {
       fontSize: 36,
       fontWeight: 'bold',
       textAlign: 'center',
       margin: 10
   },
   description: {
       flex: 0.4,
   },   
   description_text: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#666666',
        margin: 5
   },
   detail: {
       flex: 0.3,
       marginTop: 15,
       marginRight: 5,
       marginLeft: 5
   }
})

export default FilmDetail