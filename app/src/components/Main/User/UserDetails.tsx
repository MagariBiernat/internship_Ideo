import React from "react"
import styled from "styled-components"
import { MdLocationCity, MdOutlineLocationOn } from "react-icons/md"
import { useParams } from "react-router"
import SlideComponent from "components/SlideComponent"

interface Props {
  avatar_url?: string
  name?: string
  bio?: string
  company?: string
  location?: string
}

const UserDetails: React.FC<Props> = ({
  avatar_url,
  name,
  bio,
  company,
  location,
}) => {
  const { name: userName } = useParams()
  return (
    <DetailsWrapper>
      <SlideComponent>
        <div>
          <img src={avatar_url} alt="" />
          <h1>{name}</h1>
          <Bio>{bio}</Bio>
          <UserName>{userName}</UserName>
          {company && (
            <p>
              <MdLocationCity size={22} />
              {company}
            </p>
          )}

          {location && (
            <p>
              <MdOutlineLocationOn size={22} />
              {location}
            </p>
          )}
        </div>
      </SlideComponent>
    </DetailsWrapper>
  )
}

export default UserDetails

const DetailsWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 6px 24px;

  > div {
    border-bottom: 1px solid rgba(250, 250, 250, 0.1);
  }

  div {
    width: 90%;
    > * {
      margin-bottom: 16px;
    }

    img {
      max-width: 220px;
      width: 90%;
      min-width: 120px;
      border-radius: 50%;

      border: 3px solid rgba(46, 50, 56, 1);
    }

    p {
      font-size: 1.1rem;
      svg {
        vertical-align: middle;
        margin-right: 8px;
      }
    }

    @media (max-width: 520px) {
      img {
        max-width: 160px;
      }
    }
  }
`

const Bio = styled.p`
  font-weight: 300;
  font-size: 0.9rem !important;
`

const UserName = styled.p`
  font-weight: 200;
  font-size: 1.2rem;
`
