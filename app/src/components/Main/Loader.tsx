import React from "react"
import styled, { keyframes } from "styled-components"
const Loader = () => {
  return (
    <LoadingWrapper>
      <Circle delay={0} />
      <Circle delay={0.3} />
      <Circle delay={0.6} />
    </LoadingWrapper>
  )
}

export default Loader

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 44px auto;
  min-height: 100px;
`
const loadingAnimation = keyframes`
  0% { transform:translateY(0) }
  50% { transform:translateY(-26px) }
  100% { transform:translateY(0) }
 `

interface CircleProps {
  delay: number
}

const Circle = styled.div<CircleProps>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin-right: 8px;
  border: 2px solid rgba(250, 250, 250);
  background: #fff;
  animation-name: ${loadingAnimation};
  animation-duration: 1.3s;
  animation-delay: ${(props) => `${props.delay}s`};
  animation-iteration-count: infinite;
`
