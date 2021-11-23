import React from "react"
import styled from "styled-components"
import { RiGitRepositoryLine } from "react-icons/ri"
import { BsEye } from "react-icons/bs"
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai"
import { useNavigate } from "react-router"

interface IProps {
  owner: string
  repoName: string
  watchersCount: number
  starsCount: number
  forksCount: number
}
const RepoHeader: React.FC<IProps> = ({
  owner,
  repoName,
  watchersCount,
  starsCount,
  forksCount,
}) => {
  const navigate = useNavigate()

  return (
    <RepoHeaderWrapper>
      <Heading>
        <RiGitRepositoryLine size={22} />
        <H1 onClick={() => navigate(`/user/${owner}`)}>{owner} </H1>
        <span> / </span> <H1> {repoName}</H1>
      </Heading>
      <Flex>
        <Element>
          <BsEye size={18} />
          <p>Watchers: {watchersCount}</p>
        </Element>
        <Element>
          <AiOutlineStar size={18} />
          <p>Stars: {starsCount}</p>
        </Element>
        <Element>
          <AiOutlineFork size={18} />
          <p>Forks: {forksCount}</p>
        </Element>
      </Flex>
    </RepoHeaderWrapper>
  )
}

export default RepoHeader

const RepoHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  width: 100%;
  margin: 0px auto;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);

  @media (max-width: 928px) {
    flex-direction: column;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;

  @media (max-width: 620px) {
    margin-bottom: 24px;
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  @media (max-width: 928px) {
    margin-bottom: 24px;
  }

  @media (max-width: 620px) {
    flex-direction: column;
  }
`

const H1 = styled.h1`
  color: rgb(88, 166, 255);
  font-size: 1.4rem;
  cursor: pointer;
  margin: 0 12px;

  &:hover {
    text-decoration: underline;
  }

  span {
    color: #fafafa;
  }
`

const Element = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-right: 24px;
  background-color: rgb(34, 38, 44);
  border: 1px solid rgba(250, 250, 250, 0.1);
  padding: 8px 12px;
  border-radius: 10px;

  svg {
    vertical-align: middle;
    margin-right: 6px;
  }

  @media (max-width: 620px) {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 12px;
    justify-content: center;
    * {
      white-space: nowrap;
    }
    font-size: 1.1rem;
  }
`
