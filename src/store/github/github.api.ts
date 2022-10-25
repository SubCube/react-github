import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ServerResponse, User } from '../../models/user'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<Array<User>, string>({
      query: (search: string) => ({
        url: 'search/users',
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (res: ServerResponse) => res.items
    })
  })
})

export const { useSearchUsersQuery } = githubApi
