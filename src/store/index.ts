import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { curryGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { githubApi } from './github/github.api'

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer
  },
  middleware: curryGetDefaultMiddleware => curryGetDefaultMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)
