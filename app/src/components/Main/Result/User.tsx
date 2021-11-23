import React from "react"
import styled from "styled-components"
import { RiGithubLine } from "react-icons/ri"
import { IUser } from "interfaces/IUser"
import { useNavigate } from "react-router"

interface IProps {
  user: IUser
}

const User = ({ user }: IProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/user/${user.login}`)
  }
  return (
    <UserWrapper>
      <img src={user.avatar_url} alt="" />
      <div>
        <h3>{user.login}</h3>
      </div>
      <button onClick={handleNavigate}>
        <RiGithubLine />
        <p>See profile</p>
      </button>
    </UserWrapper>
  )
}

export default User

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  padding: 8px 20px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(250, 250, 250, 0.1);

  > div {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    padding: 0px 20px;
    color: rgb(107, 174, 248);
  }
  h3 {
    @media (max-width: 520px) {
      font-size: 1rem;
    }
  }
  /* h4 {
    margin: 0 12px;
  } */

  > img {
    height: 52px;
    width: 52px;
    border-radius: 6px;

    @media (max-width: 520px) {
      height: 38px;
      width: 38px;
    }
  }

  > button {
    justify-self: flex-end;
    margin-left: auto;
    margin-right: 0;
    background: rgb(34, 38, 44);
    border: 0;
    padding: 12px 18px;
    border-radius: 6px;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.39, 0.575, 0.565, 1);

    &:hover {
      transform: translateY(-8px);
    }

    * {
      display: inline;
      vertical-align: middle;
    }

    p {
      font-size: 1rem;
      font-weight: 500;
      margin-left: 6px;
      color: rgb(240, 240, 240);
    }

    svg {
      height: 22px;
      width: 22px;
      color: #fafafa;
    }

    @media (max-width: 520px) {
      padding: 10px 14px;
      p {
        font-size: 0.9rem;
      }
      svg {
        height: 18px;
        width: 18px;
      }
    }
    /* align-self: flex-end; */
  }
`
