export interface Owner {
  login: string
}

export interface License {
  name: string
}

export interface RepositoryInterface {
  id: number
  name: string
  full_name: string
  owner: Owner
  description: string
  url: string
  languages_url: string
  language?: any
  forks_count: number
  public_repos?: number
  stargazers_count: number
  watchers_count: number
  watchers: number
  topics: string[]
  subscribers_count: number
  network_count: number
  license: License
}

export default interface IRepository {
  total_count: number
  incomplete_results: boolean
  items: RepositoryInterface[]
}
