import React from "react"
import styled from "styled-components"
import OctocateImage from "assets/Octocat.png"
import { useNavigate } from "react-router"

interface Props {
  message: string
  mainPage?: boolean
}

const ErrorNotFound: React.FC<Props> = ({ message, mainPage }) => {
  const navigate = useNavigate()
  return (
    <ErrorWrapper>
      <img src={OctocateImage} alt="" />
      <h1>{message}</h1>
      {!mainPage && (
        <button onClick={() => navigate("/")}>Go to main page</button>
      )}
    </ErrorWrapper>
  )
}

export default ErrorNotFound

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 64px;
  img {
    max-width: 260px;
  }

  h1 {
    margin: 36px auto;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }

  button {
    background: rgba(34, 38, 44);
    border: 1px solid rgba(250, 250, 250, 0.1);
    padding: 16px 24px;
    color: #fafafa;
    font-weight: 700;
    font-size: 1.2rem;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
      color: rgb(88, 166, 255);
    }
  }
`
