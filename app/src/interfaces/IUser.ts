export interface IUser {
  login: string
  id: number
  avatar_url: string
  name: string
  company: string
  email: string
  bio: string
  followers: number
  location?: string
  public_repos?: number
}

export default interface RootObject {
  total_count: number
  incomplete_results: boolean
  items: IUser[]
}
