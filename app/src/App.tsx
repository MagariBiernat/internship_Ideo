import axios from "axios"
import Navigation from "./components/Navigation"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import Main from "pages/Main"
import NotFound from "pages/NotFound"
import User from "pages/User"
import Repo from "pages/Repo"

axios.defaults.baseURL = "https://api.github.com"

function App() {
  return (
    <MainWrapper>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Main />} />
          <Route path="/user/:name" element={<User />} />
          <Route path="/repo/:owner/:repo" element={<Repo />} />
        </Routes>
      </BrowserRouter>
    </MainWrapper>
  )
}

export default App

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
`
