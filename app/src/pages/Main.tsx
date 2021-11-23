import React from "react"
import styled from "styled-components"
import SearchForm from "components/Main/SearchForm"
import SearchResults from "components/SearchResults"
import Loader from "components/Main/Loader"
import IUser from "interfaces/IUser"
import IRepository from "interfaces/IRepository"
import ErrorNotFound from "components/ErrorNotFound"

interface ISearchResults {
  results?: IUser | IRepository
  searchType?: string
  error?: string
}

const Main: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<ISearchResults>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  return (
    <MainWrapper>
      <SearchForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSearchResults={setSearchResults}
        searchType={searchResults?.searchType}
        searchResults={searchResults}
      />
      {!isLoading && !searchResults && (
        <ErrorNotFound
          message={"Nothing to display. Use search form !"}
          mainPage={true}
        />
      )}
      {isLoading ? (
        <Loader />
      ) : (
        searchResults?.results &&
        searchResults?.results?.items?.length > 0 && (
          <SearchResults
            results={searchResults.results}
            type={searchResults?.searchType}
          />
        )
      )}
    </MainWrapper>
  )
}

export default Main

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
`
