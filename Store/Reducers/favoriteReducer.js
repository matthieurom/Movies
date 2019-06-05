// Store/Reducers/favoriteReducer.js

const initialState = { favoriteFilm: [] } // Le state initial est la définition du state par défaut de votre reducer

function toggleFavorite(state = initialState, action) {
    let nextState
    switch(action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoriteFilm.findIndex(item => item.id == action.value.id)
            if(favoriteFilmIndex !== -1) {
                // Le film est déjà dans la liste, on le retire
                nextState = {
                    ...state,
                    favoriteFilm: state.favoriteFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            }

            else {
                // Le film n'est pas dans la liste, on l'ajoute
                nextState = {
                    ...state,
                    favoriteFilm: [...state.favoriteFilm, action.value]
                }
            }
            return nextState || state // renvoie l'objet nextState si celui-ci n'est pas undefined, sinon 
            //renvoie l'objet state => sécurité.
        default: 
            return state
    }
}

export default toggleFavorite