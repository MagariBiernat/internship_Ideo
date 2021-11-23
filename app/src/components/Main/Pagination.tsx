import React from "react"
import styled from "styled-components"

interface IProps {
  currentPage: number
  per_page?: number
  setPage: (value: number) => void
  searchResults: any
}
const Pagination = ({
  currentPage,
  per_page = 30,
  setPage,
  searchResults,
}: IProps) => {
  const [totalPages, setTotalPages] = React.useState(
    Math.ceil(Number(searchResults?.results?.total_count) / per_page)
  )

  React.useEffect(() => {
    setTotalPages(
      Math.ceil(Number(searchResults?.results?.total_count) / per_page)
    )
  }, [currentPage, searchResults?.results?.total_count, per_page])

  let maxLeft = currentPage - 2
  let maxRight = currentPage + 2

  if (maxLeft < 1) {
    maxLeft = 1
    maxRight = 5
  }

  if (maxRight > totalPages) {
    maxLeft = totalPages - 4

    if (maxLeft < 1) {
      maxLeft = 1
    }
    maxRight = totalPages
  }

  let pages = []

  for (var page = maxLeft; page <= maxRight; page++) {
    pages.push(page)
  }

  return (
    <PaginationWrapper>
      <p>
        {searchResults?.results?.total_count} {searchResults?.searchType}
      </p>
      <PaginationContainer>
        <PaginationButton
          disabled={currentPage <= 1}
          onClick={() => setPage(currentPage - 1)}
        >
          Previous page
        </PaginationButton>
        <PaginationContainer display={true}>
          {pages.map((item, index) => (
            <PaginationButton
              isActive={currentPage === item}
              key={index}
              onClick={() => setPage(item)}
            >
              {item}
            </PaginationButton>
          ))}
        </PaginationContainer>
        <PaginationButton
          disabled={currentPage >= totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          Next page
        </PaginationButton>
      </PaginationContainer>
    </PaginationWrapper>
  )
}

export default Pagination

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 900px;
  padding: 12px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(250, 250, 250, 0.3);

  @media (max-width: 928px) {
    flex-direction: column;

    > * {
      margin: 12px auto;
    }
  }
`

interface PaginationContainerProps {
  display?: boolean
}

const PaginationContainer = styled.div<PaginationContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 420px) {
    display: ${(props) => (props.display ? "none" : "flex")};
  }
`

interface ButtonProps {
  isActive?: boolean
}

const PaginationButton = styled.button<ButtonProps>`
  background: ${(props) =>
    props.isActive ? "rgb(56,109,227)" : "rgb(34, 38, 44)"};
  border: 1px solid rgba(230, 230, 230, 0);
  padding: 12px 16px;
  border-radius: 6px;
  color: rgb(240, 240, 240);
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 12px;
  cursor: pointer;
  white-space: none;

  &:not(:disabled) {
    transition: all 0.3s cubic-bezier(0.86, 0, 0.07, 1);
    &:hover {
      border: 1px solid rgba(240, 240, 240, 0.7);
    }
  }

  &:disabled {
    background: rgba(230, 230, 230, 0.3);
    color: rgba(240, 240, 240, 0.3);
    cursor: not-allowed;
  }
`
