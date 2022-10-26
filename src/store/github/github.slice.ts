import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GithubState {
  favorites: Array<string>
}

const initialState: GithubState = {
  favorites: []
}

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload)
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(item => item !== action.payload)
    }
  }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer
