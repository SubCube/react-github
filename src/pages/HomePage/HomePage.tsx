import { useEffect, useState } from 'react'
import { RepositoryCard } from '../../components/RepositoryCard'
import { useDebounce } from '../../hooks/debounce'
import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../../store/github/github.api'

export const HomePage = () => {
  const [search, setSearch] = useState('')
  const [dropDown, setDropDown] = useState(false)

  const debounced = useDebounce(search, 500)

  const { isError, isLoading, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })

  const [fetchRepos, { isError: isFetchReposError, isLoading: isReposLoading, data: repos }] =
    useLazyGetUserReposQuery()

  function onRowClick(userName: string) {
    fetchRepos(userName)
    setDropDown(false)
  }

  useEffect(() => {
    setDropDown(debounced.length >= 3 && data?.length! > 0)
  }, [debounced, data])
  return (
    <div className="flex justify-center h-screen w-screen pt-10 mx-auto">
      {isError && <p className="text-center text-red-600">Smth went wrong</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 mb-2 w-full h-[42px]"
          placeholder="Search for Github username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {dropDown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll ">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map(user => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => onRowClick(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}

        <div className="container">
          {isReposLoading && <p className="text-center">Repos are loading</p>}
          {repos?.map(repo => (
            <RepositoryCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
