import React from "react"
import styled from "styled-components"
import { RepositoryInterface } from "interfaces/IRepository"
import { useNavigate } from "react-router"
import { RiGitRepositoryLine } from "react-icons/ri"
import { AiOutlineStar } from "react-icons/ai"
import starCount from "utils/starCount"
import allColors from "constants/colors"

interface IProps {
  repo: RepositoryInterface
}

const Repository = ({ repo }: IProps) => {
  const navigate = useNavigate()
  const stars = starCount(repo?.stargazers_count)
  const handleNavigate = () => {
    navigate(`/repo/${repo.full_name}`)
  }
  return (
    <RepoWrapper>
      <RiGitRepositoryLine onClick={handleNavigate} />
      <div>
        <FullName onClick={handleNavigate}>
          <p>{repo.full_name}</p>
        </FullName>
        <div>
          <p>{repo.description}</p>
        </div>
        <Topics>
          {repo?.topics.map((item: string, index: number) => (
            <p key={index}> {item} </p>
          ))}
        </Topics>
        <Details>
          <div>
            <AiOutlineStar />
            {stars}
          </div>
          {repo?.language && (
            <Language
              color={allColors[repo?.language as keyof typeof allColors].color!}
            >
              <span></span>
              <p>{repo?.language}</p>
            </Language>
          )}
          <div>
            <p>{repo?.license?.name}</p>
          </div>
        </Details>
      </div>
    </RepoWrapper>
  )
}

export default Repository

const RepoWrapper = styled.div`
  display: inline-flex;
  width: 95%;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.3);

  > svg {
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    margin-right: 12px;
    margin-top: 6px;
    cursor: pointer;

    @media (max-width: 520px) {
      width: 22px !important;
      height: 22px !important;
      min-width: 22px !important;
      min-height: 22px !important;
    }
  }

  > div {
    display: flex;
    flex-direction: column;

    > div {
      margin-bottom: 12px;
    }
  }
`

const FullName = styled.div`
  p {
    color: rgb(88, 166, 255);
    font-size: 1.6rem;
    cursor: pointer;

    @media (max-width: 520px) {
      font-size: 1.2rem;
    }
  }
`

const Topics = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  > p {
    padding: 4px 10px;
    color: rgb(240, 246, 252);
    font-size: 16px;
    line-height: 22px;
    font-weight: 500;
    background: rgb(31, 111, 235);
    margin-right: 6px;
    border-radius: 24px;
    margin-bottom: 4px;

    @media (max-width: 520px) {
      font-size: 14px;
      line-height: 18px;
    }
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  > div {
    margin: 4px 16px;
    margin-left: 0;
    display: flex;
    align-items: center;
  }
  svg {
    width: 22px;
    height: 22px;
    margin-right: 6px;
    vertical-align: middle;
  }
`

interface LangaugeProp {
  color?: string
}
const Language = styled.div<LangaugeProp>`
  span {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background: ${(props) => props.color};
    margin-right: 8px;
  }
`
