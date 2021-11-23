import React from "react"
import axios from "axios"
import styled from "styled-components"
import { IUser } from "interfaces/IUser"
import { useParams } from "react-router"
import ErrorNotFound from "components/ErrorNotFound"
import Loader from "components/Main/Loader"
import UserRepos from "components/Main/User/UserRepos"
import UserDetails from "components/Main/User/UserDetails"
interface IState {
  user?: IUser
  error?: string
}

const User: React.FC = () => {
  const { name } = useParams()
  const [userData, setUserData] = React.useState<IState>({})

  console.log(userData)
  React.useEffect(() => {
    axios(`/users/${name}`)
      .then((res) => {
        setUserData({ user: res.data })
      })
      .catch((err) => {
        if (err.response) {
          setUserData({ error: "User not found" })
        }

        setUserData({ error: "Error while fetching data" })
      })
  }, [name])

  if (userData?.error) {
    return <ErrorNotFound message={userData?.error} />
  }

  if (!userData?.user) return <Loader />

  return (
    <UserWrapper>
      <UserDetails
        avatar_url={userData?.user?.avatar_url}
        name={userData?.user?.name}
        bio={userData?.user?.bio}
        company={userData?.user?.company}
        location={userData?.user?.location}
      />
      <UserRepos totalReposCount={userData?.user?.public_repos} />
    </UserWrapper>
  )
}

export default User

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: 0 auto;
  max-width: 1440px;
  width: 90%;
  padding: 42px 22px;

  @media (max-width: 928px) {
    grid-template-columns: 1fr;
  }
`
