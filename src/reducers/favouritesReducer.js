export const initialFavouritesState = {
  favourites: []
};

export function favouritesReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const photo = action.payload;
      const exists = state.favourites.find((p) => p.id === photo.id);

      if (exists) {
        return {
          ...state,
          favourites: state.favourites.filter((p) => p.id !== photo.id)
        };
      }

      return {
        ...state,
        favourites: [...state.favourites, photo]
      };
    }

    default:
      return state;
  }
}
