import React from 'react'
import milou from '../lib/milou'
import { useAuth } from '../components/auth'
import Header from '../components/header'
import Content from '../components/content'
import RoomsList from '../components/rooms-list'
import RoomsListEmpty from '../components/rooms-list-empty'
import RoomCreate from '../components/room-create'
import RequestError from '../components/request-error'
import ContentLoading from '../components/content-loading'

const Rooms = () => {
  const { userJwt } = useAuth()
  const [rooms, setRooms] = React.useState(null)
  const [inFlight, setInFlight] = React.useState(true)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!userJwt) return

    milou({
      url: `${process.env.API_URL}/rooms`,
      jwt: userJwt
    })
      .then(setRooms)
      .catch(setError)
      .finally(() => setInFlight(false))
  }, [userJwt])

  return (
    <>
      <Header title="Rooms">
        <RoomCreate buttonVariant="outlined" />
      </Header>
      <Content>
        {inFlight && <ContentLoading />}
        {error && <RequestError />}
        {rooms && rooms.length === 0 && <RoomsListEmpty />}
        {rooms && rooms.length > 0 && <RoomsList rooms={rooms} />}
      </Content>
    </>
  )
}

export default Rooms
