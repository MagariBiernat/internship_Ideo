export interface Author {
  name: string
  email: string
  date: Date
}

export interface Committer {
  name: string
  email: string
  date: Date
}

export interface Commit {
  url: string
  author: Author
  committer: Committer
  message: string
}

export interface Author2 {
  login: string
  avatar_url: string
  repos_url: string
}

export default interface RootObject {
  url: string
  commit: Commit
  author: Author2
}
