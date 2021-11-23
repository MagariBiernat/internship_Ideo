import React from "react"
import axios from "axios"
import styled from "styled-components"
import Pagination from "./Pagination"

interface IProps {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  setSearchResults: (results: any) => void
  searchResults: any
  searchType?: string
}

const SearchForm: React.FC<IProps> = ({
  isLoading,
  setIsLoading,
  setSearchResults,
  searchResults,
  searchType,
}) => {
  const [selectOption, setSelectOption] = React.useState<string>("")
  const [searchValue, setSearchValue] = React.useState<string>("")
  const [sortBy, setSortBy] = React.useState("")
  const [order, setOrder] = React.useState("")
  const [page, setPage] = React.useState(1)

  const fetchData = async () => {
    if (!selectOption || !searchValue) {
      setSelectOption("")
      setSearchValue("")
      return
    }

    if (!isLoading) setIsLoading(true)
    axios(
      `/search/${selectOption}?q=${searchValue}${sortBy}${order}&page=${page}`
    )
      .then((res) => {
        if ((res.status = 200)) {
          setSearchResults?.({
            results: res.data,
            searchType: selectOption,
          })
        }
      })
      .then(() => {
        setTimeout(() => setIsLoading(false), 300)
      })
      .catch((err) => {
        if (err.response) {
          setSearchResults({ error: "Repositories not found" })
        }

        setSearchResults({ error: "Error while fetching data" })
      })
  }

  const handleSubmitForm = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    setPage(1)
    fetchData()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    fetchData()
  }, [page])

  return (
    <>
      <Form onSubmit={handleSubmitForm}>
        <Select
          onChange={(e) => setSelectOption(e.target.value)}
          value={selectOption}
        >
          <option value=""> - Select option - </option>
          <option value="users">Users</option>
          <option value="repositories">Repositories</option>
        </Select>
        {selectOption && (
          <>
            <Input
              type="search"
              placeholder="Search value..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {selectOption === "users" ? (
              <Select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="">Best match</option>
                <option value="&sort=followers">Followers</option>
                <option value="&sort=repositories">Repositories</option>
                <option value="&sort=joined">Joined</option>
              </Select>
            ) : (
              <Select
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="">Best match</option>
                <option value="&sort=stars">Stars</option>
                <option value="&sort=forks">Forks</option>
                <option value="&sort=help-wanted-issues">
                  Help wanted issues
                </option>
                <option value="&sort=updated">Updated</option>
              </Select>
            )}
          </>
        )}
        {sortBy && (
          <Select onChange={(e) => setOrder(e.target.value)} value={order}>
            <option value="">Descending</option>
            <option value="&order=asc">Ascending</option>
          </Select>
        )}
        {selectOption && searchValue && <button>Search</button>}
      </Form>
      {searchResults?.results && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          searchResults={searchResults}
        />
      )}
    </>
  )
}

export default SearchForm

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 12px auto;

  @media (max-width: 928px) {
    flex-direction: column;

    * {
      margin: 12px auto;
      width: 100%;
    }
  }

  button {
    background: rgb(40, 46, 56);
    border: 1px solid rgba(250, 250, 252, 1);
    color: #fff;
    padding: 10px 18px;
    border-radius: 6px;
    font-size: 1.1rem;
    /* margin: 6px 12px; */
    font-weight: 600;
  }
`

const Input = styled.input`
  background: rgb(14, 17, 22);
  border: 1px solid rgba(250, 250, 252, 0.5);
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  margin: 12px 12px;
  color: #fafafa;
  appearance: none;

  &:focus {
    outline: none;
  }
`

const Select = styled.select`
  background: rgb(14, 17, 22);
  border: 1px solid rgba(250, 250, 252, 0.5);
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 12px;
  color: #fafafa;
  appearance: none;

  &:focus {
    outline: none;
  }

  > option {
    border: 1px solid rgba(250, 250, 252, 0.5);
  }
`
