import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'

const SearchStackNavigator = createStackNavigator( {
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue

        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },

    FilmDetail: { // Encure une fois j'ai mis le même  nom que celui du composant mais libre à vous de choisir un nom different

        screen: FilmDetail
    }
})

export default createAppContainer(SearchStackNavigator)