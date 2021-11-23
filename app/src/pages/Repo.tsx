import axios from "axios"
import React from "react"
import styled from "styled-components"
import { useParams } from "react-router"
import RepoHeader from "components/Repo/RepoHeader"
import { RepositoryInterface } from "interfaces/IRepository"
import RepoAbout from "components/Repo/RepoAbout"
import Loader from "components/Main/Loader"
import ErrorNotFound from "components/ErrorNotFound"
import RepoCommits from "components/Repo/RepoCommits"

interface IState {
  repo?: RepositoryInterface
  error?: string
}

const Repo = () => {
  const { owner, repo } = useParams()
  const [repoData, setRepoData] = React.useState<IState>()
  React.useEffect(() => {
    axios(`/repos/${owner}/${repo}`)
      .then((res) => {
        if (res.status === 200) {
          setRepoData({ repo: res.data })
        }
      })
      .catch((err) => {
        if (err.response) {
          setRepoData({ error: "Repository not found" })
          return
        }

        setRepoData({ error: "Error while fetching data" })
      })
  }, [owner, repo])

  if (repoData?.error) {
    return (
      <RepositoryWrapper>
        <ErrorNotFound message={repoData?.error} />
      </RepositoryWrapper>
    )
  }

  if (!repoData?.repo) return <Loader />
  return (
    <RepositoryWrapper>
      <RepoHeader
        owner={repoData?.repo?.owner?.login}
        repoName={repoData?.repo?.name}
        watchersCount={repoData?.repo?.watchers_count}
        starsCount={repoData?.repo?.stargazers_count}
        forksCount={repoData?.repo?.forks_count}
      />
      <RepoDetails>
        <RepoCommits />
        <RepoAbout description={repoData?.repo?.description} />
      </RepoDetails>
    </RepositoryWrapper>
  )
}

export default Repo

const RepositoryWrapper = styled.div`
  max-width: 1440px;
  width: 90%;
  margin: 0 auto;
`

const RepoDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin: 0 auto;
  padding: 24px;

  @media (max-width: 928px) {
    grid-template-columns: 1fr;
  }
`
