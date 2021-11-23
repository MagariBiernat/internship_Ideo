import React from "react"
import styled from "styled-components"
import ICommit from "interfaces/ICommit"
import { IUser } from "interfaces/IUser"
import { useNavigate, useParams } from "react-router"
import axios from "axios"
import ErrorNotFound from "components/ErrorNotFound"
import Loader from "components/Main/Loader"
import SlideComponent from "components/SlideComponent"

interface State {
  commits?: ICommit[]
  collaborators?: IUser
  error?: string
}

const RepoCommits = () => {
  const [data, setData] = React.useState<State>()
  const { owner, repo } = useParams()
  const navigate = useNavigate()
  React.useEffect(() => {
    axios(`/repos/${owner}/${repo}/commits`)
      .then(async (response) => {
        setData({
          commits: response.data,
        })
      })
      .catch((err) => {
        if (err.response) {
          setData({ error: "Repositories not found" })
        }

        setData({ error: "Error while fetching data" })
      })
  }, [owner, repo])

  const returnDate = (date: Date) => {
    const data = new Date(date)
    const month = data.toLocaleString("en-GB", { month: "short" })
    return (
      <span>
        commited on {data.getDate()} {month}
      </span>
    )
  }

  if (data?.error) return <ErrorNotFound message={data?.error} />

  if (!data?.commits)
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    )
  return (
    <Wrapper>
      <SlideComponent>
        {data?.commits?.map((item, index) => (
          <CommitElement key={index}>
            <Flex>
              <h6>{item?.commit?.message.slice(0, 100)}</h6>
            </Flex>
            <Flex>
              <Flex>
                {item?.author?.avatar_url && (
                  <img src={item?.author?.avatar_url} alt="" />
                )}
                <p onClick={() => navigate(`/user/${item?.author?.login}`)}>
                  {item?.author?.login}
                </p>
              </Flex>
              <Flex>{returnDate(item?.commit?.committer?.date)}</Flex>
            </Flex>
          </CommitElement>
        ))}
      </SlideComponent>
    </Wrapper>
  )
}

export default RepoCommits

const Wrapper = styled.div`
  grid-column: span 4;
  width: 100%;
  min-height: 400px;
  padding: 24px;
`

const CommitElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  background: rgba(23, 27, 33, 0.3);
  padding: 8px 18px;
  border-radius: 12px;
  margin-bottom: 18px;
  border: 1px solid rgba(250, 250, 250, 0.05);

  &:hover {
    background: rgba(23, 27, 33);
  }
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  h6 {
    font-size: 1rem;
    margin-bottom: 12px;
    margin-right: 24px;

    @media (max-width: 620px) {
      font-size: 0.9rem;
    }
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 12px;
  }

  p {
    margin-right: 12px;
    font-weight: 600;
    font-size: 0.9rem;

    &:nth-of-type(1) {
      &:hover {
        cursor: pointer;

        color: rgb(88, 166, 255);
      }
    }
  }

  span {
    font-size: 0.8rem;
    font-weight: 300;
  }

  @media (max-width: 620px) {
    margin-bottom: 12px;
  }
`
