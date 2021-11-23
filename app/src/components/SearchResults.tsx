import React from "react"
import UserRepository, { IUser } from "interfaces/IUser"
import IRepository, { RepositoryInterface } from "interfaces/IRepository"
import User from "./Main/Result/User"

import styled from "styled-components"
import Repository from "./Main/Result/Repository"
import SlideComponent from "./SlideComponent"

interface IProps {
  results: UserRepository | IRepository
  type?: string
}

const SearchResults = ({ results, type }: IProps) => {
  return (
    <SlideComponent>
      {type === "users" ? (
        <ResultsWrapper>
          {results.items.map((item, index: number) => (
            <User user={item as IUser} key={index} />
          ))}
        </ResultsWrapper>
      ) : (
        <ResultsWrapper>
          {results.items.map((item, index: number) => (
            <Repository repo={item as RepositoryInterface} key={index} />
          ))}
        </ResultsWrapper>
      )}
    </SlideComponent>
  )
}

export default SearchResults

const ResultsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  width: 90%;
  max-width: 640px;
  margin: 32px auto;
  gap: 32px;
`
