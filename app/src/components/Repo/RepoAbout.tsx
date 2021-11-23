import axios from "axios"
import ErrorNotFound from "components/ErrorNotFound"
import SlideComponent from "components/SlideComponent"
import { IUser } from "interfaces/IUser"
import React from "react"
import { useNavigate, useParams } from "react-router"
import styled from "styled-components"
import languagesCount from "utils/languagesCount"

interface Props {
  description?: string
  languageUrl?: string
}

interface Language {
  name: string
  value: number
  colorValue?: string
}

interface Data {
  languages?: Language[]
  contributors?: IUser[]
  errors?: string
}

const RepoAbout: React.FC<Props> = ({ description }) => {
  const { owner, repo } = useParams()
  const [data, setData] = React.useState<Data>()
  const [totalNumbersOfContributors, setTotalNubmerOfContributors] =
    React.useState<number | string>()
  const navigate = useNavigate()

  React.useEffect(() => {
    Promise.all([
      axios(`/repos/${owner}/${repo}/languages`),
      axios(`/repos/${owner}/${repo}/contributors`),
      axios(`/repos/${owner}/${repo}/contributors?per_page=1&anon=true`),
    ])
      .then(async (response) => {
        const [languageResponse, contributorsResponse, totalContributors] =
          response

        if (
          languageResponse.status !== 200 ||
          contributorsResponse.status !== 200
        ) {
          setData({ errors: "Error while fetching data..." })
          return
        }

        if (totalContributors?.headers?.link)
          setTotalNubmerOfContributors(
            totalContributors?.headers?.link
              .split(",")[1]
              .split("&")[2]
              .slice(
                5,
                totalContributors?.headers?.link
                  .split(",")[1]
                  .split("&")[2]
                  .indexOf(">")
              )
          )

        setData({
          languages: languagesCount(languageResponse.data),
          contributors: contributorsResponse.data,
        })
      })
      .catch((err) => {
        if (err.response) {
          setData({ errors: "Repo data not found" })
          return
        }

        setData({ errors: "Error while fetching data" })
      })
  }, [owner, repo])

  return (
    <Wrapper>
      <SlideComponent>
        <Container>
          <div>
            <h1>About</h1>
          </div>
          {description ? (
            <p>{description}</p>
          ) : (
            <p>No description, website, or topics provided.</p>
          )}
        </Container>
        {data?.errors ? (
          <ErrorNotFound message={data?.errors} />
        ) : (
          <>
            <Container>
              <div>
                <h1>Contributors</h1>{" "}
                <p>
                  {totalNumbersOfContributors || data?.contributors?.length}
                </p>
              </div>
              {data?.contributors?.map((item, index) => (
                <Contributor
                  key={index}
                  onClick={() => navigate(`/user/${item?.login}`)}
                >
                  <img src={item.avatar_url} alt={`${item?.name}`} />
                  <p>{item?.login}</p>
                </Contributor>
              ))}
            </Container>
            <Container>
              <div>
                <h1>Languages</h1> <p>{data?.languages?.length}</p>
              </div>
              <LanguageContainer>
                {data?.languages?.map((item, index) => (
                  <div key={index}>
                    <LanguageColor colorValue={item?.colorValue} />
                    <strong>{item.name}</strong>
                    <p>{item.value}%</p>
                  </div>
                ))}
              </LanguageContainer>
            </Container>
          </>
        )}
      </SlideComponent>
    </Wrapper>
  )
}

export default RepoAbout

const Wrapper = styled.div`
  display: grid;
  grid-column: span 2;
  grid-auto-rows: minmax(min-content, max-content);
  padding: 24px;
`

const Container = styled.div`
  padding: 24px 0 24px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);

  h1 {
    font-size: 1.2rem;
    margin-top: -4px;
  }

  > p {
    font-style: italic;
    font-size: 1.1rem;
  }

  > div:nth-of-type(1) {
    display: flex;
    align-items: center;
    justify-content: space;
    margin-bottom: 24px;

    > p {
      font-size: 0.9rem;
      margin-left: 12px;
      background: rgb(53, 57, 64);
      padding: 4px 8px;
      border-radius: 50%;
    }
  }
`

const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

    * {
      margin-right: 8px;
    }

    strong {
      font-size: 1.1rem;
    }

    p {
      font-size: 1rem;
      font-weight: 200;
    }
  }
`

interface Color {
  colorValue?: string
}

const LanguageColor = styled.p<Color>`
  width: 11px;
  height: 11px;
  background: ${(props) => props.colorValue};
  border-radius: 50%;
`

const Contributor = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;

  > img {
    width: 33px;
    height: 33px;
    border-radius: 50%;
    margin-right: 24px;
    cursor: pointer;
  }

  > p {
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;

    &:hover {
      color: rgb(106, 164, 248);
    }
  }
`
