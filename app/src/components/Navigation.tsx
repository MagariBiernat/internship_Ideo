import React from "react"
import styled from "styled-components"
import { FaGithub } from "react-icons/fa"
import { useNavigate } from "react-router"
const Navigation: React.FC = () => {
  const navigate = useNavigate()

  return (
    <NavigationWrapper>
      <Logo onClick={() => navigate("/")}>
        <FaGithub />
      </Logo>
    </NavigationWrapper>
  )
}

export default Navigation

const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  background: rgb(23, 27, 33);
  color: #fff;
  box-shadow: 2px 0px 126px -34px rgba(250, 250, 250, 0.35);
`

const Logo = styled.div`
  svg {
    height: 42px;
    width: 42px;
    cursor: pointer;
    transition: all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      fill: rgba(240, 240, 240, 0.7);
    }
  }
`
