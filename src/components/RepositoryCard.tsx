import { Repository } from '../models/repos'

export const RepositoryCard = ({ repo }: { repo: Repository }) => {
  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="font-thin text-sm">{repo?.description}</p>
      </a>
    </div>
  )
}
