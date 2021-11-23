import React from "react"
import styled from "styled-components"
import { useNavigate, useParams } from "react-router"
import { RepositoryInterface } from "interfaces/IRepository"
import axios from "axios"
import Loader from "../Loader"
import ErrorNotFound from "components/ErrorNotFound"
import allColors from "constants/colors"
import { RiGitRepositoryLine } from "react-icons/ri"
import { AiOutlineStar } from "react-icons/ai"
import SlideComponent from "components/SlideComponent"
interface State {
  repos?: RepositoryInterface[]
  error?: string
}

interface Props {
  totalReposCount?: number
}

const per_page = 30

const UserRepos: React.FC<Props> = ({ totalReposCount }) => {
  const { name } = useParams()
  const [repos, setRepos] = React.useState<State>()
  const [page, setPage] = React.useState<number>(1)
  const [totalPages] = React.useState(
    Math.ceil(Number(totalReposCount) / per_page)
  )
  const navigate = useNavigate()

  React.useEffect(() => {
    setRepos({})
    axios(`/users/${name}/repos?page=${page}`)
      .then((res) => {
        setRepos({ repos: res.data })
      })
      .catch((err) => {
        if (err.response) {
          setRepos({ error: "Repositories not found" })
        }

        setRepos({ error: "Error while fetching data" })
      })
  }, [name, page])

  if (repos?.error) {
    return <ErrorNotFound message={repos?.error} />
  }

  if (!repos?.repos)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )

  return (
    <Wrapper>
      <ReposHeadingWithPagination>
        <h1>
          All repositories <span>{totalReposCount}</span>
        </h1>
        <Pagination>
          <button
            disabled={page <= 1}
            onClick={() => setPage((page) => page - 1)}
          >
            Newer
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((page) => page + 1)}
          >
            Older
          </button>
        </Pagination>
      </ReposHeadingWithPagination>
      <SlideComponent from="right">
        <ReposContainer>
          {repos?.repos.map((item, index) => (
            <RepoElement
              key={index}
              onClick={() => navigate(`/repo/${name}/${item.name}`)}
            >
              <h3>
                <RiGitRepositoryLine size={20} /> {item.name}
              </h3>
              <p>{item?.description}</p>
              <Details>
                {item?.language && (
                  <Language
                    colorValue={
                      allColors[item.language as keyof typeof allColors]?.color!
                    }
                  >
                    <div></div>
                    <p>{item.language}</p>
                  </Language>
                )}
                {item?.stargazers_count > 0 && (
                  <Star>
                    <AiOutlineStar /> {item?.stargazers_count}{" "}
                  </Star>
                )}
              </Details>
            </RepoElement>
          ))}
        </ReposContainer>
      </SlideComponent>
    </Wrapper>
  )
}

export default UserRepos

const Wrapper = styled.div`
  grid-column: span 5;
  width: 100%;
  padding: 6px 24px;

  @media (max-width: 620px) {
    padding: 6px 12px;
  }
`
const ReposHeadingWithPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 2px;

  h1 {
    font-size: 1.3rem;

    span {
      font-size: 1rem;
      margin-left: 12px;
      background: rgb(53, 57, 64);
      padding: 8px 12px;
      border-radius: 50%;
    }
  }

  @media (max-width: 620px) {
    flex-direction: column;

    > h1 {
      margin-bottom: 24px;
    }
  }
`

const Pagination = styled.div`
  button {
    background: rgba(34, 38, 44);
    border: 1px solid rgba(250, 250, 250, 0.1);
    padding: 8px 10px;
    color: #fafafa;
    font-weight: 700;
    font-size: 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
    margin-left: 12px;
    transition: all 0.3s cubic-bezier(0.77, 0, 0.175, 1);

    &:hover {
      color: rgb(88, 166, 255);
      border: 1px solid rgba(250, 250, 250, 0.5);
    }

    &:disabled {
      background: rgba(60, 60, 60);
      border: 1px solid rgba(250, 250, 250, 0.2);
      cursor: not-allowed;
      color: rgba(240, 240, 240, 0.3);
    }
  }
`

const ReposContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }

  svg {
    vertical-align: middle;
  }
`

const RepoElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  background: rgba(23, 27, 33, 0.3);
  border: 1px solid rgba(250, 250, 250, 0.1);
  padding: 12px 18px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;

  > p {
    font-weight: 200;
    font-size: 0.9rem;
    margin-bottom: 16px;
    justify-self: flex-start;
    word-break: break-all;
  }

  h3 {
    color: rgb(88, 166, 255);
    margin-bottom: 12px;
  }

  &:hover {
    background: rgba(23, 27, 33);
  }
`

const Details = styled.div`
  display: flex;
  align-items: center;
`

const Star = styled.p`
  font-size: 0.8rem;
  svg {
    font-size: 1rem;
  }
`

interface LanguageProp {
  colorValue?: string
}
const Language = styled.div<LanguageProp>`
  display: flex;
  align-items: center;
  margin-right: 12px;

  > div {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
    margin-top: 0px;
    background: ${(props) => props.colorValue};

    & ~ p {
      font-weight: 400;
      font-size: 0.8rem;
    }
  }
`
