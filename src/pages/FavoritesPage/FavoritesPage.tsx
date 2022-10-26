import { useAppSelector } from '../../hooks/redux'

export function FavoritesPage() {
  const { favorites } = useAppSelector(state => state.github)

  if (!favorites.length) return <p className="text-center">No favorites.</p>

  return (
    <div className="flex justify-center h-screen w-screen pt-10 mx-auto">
      <ul className="list-none">
        {favorites.map(item => (
          <li key={item}>
            <a href={item}>{item}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
