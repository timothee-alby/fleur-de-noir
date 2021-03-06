import OError from '@overleaf/o-error'
import React from 'react'
import milou from '~/lib/milou'
import SocketHelper from '~/lib/socket-helper'
import { useAuth } from '~/components/auth/auth-context'
import RoomTutorialManager from '~/components/room/tutorial-manager'
import RoomPlayersList from '~/components/room/players-list'
import RoomActionsManager from '~/components/room/actions-manager'
import RoomNotificationsManager from '~/components/room/notifications-manager'
import RoomLeave from '~/components/room/leave'

const fetchData = async (
  userJwt,
  room,
  playerId,
  setRoomState,
  setMyTurns,
  setIsDirty,
  setError
) => {
  try {
    const rooms = await milou({
      url: `${process.env.API_URL}/rooms?id=eq.${room.id}&select=*,room_states(*)`,
      jwt: userJwt
    })
    const [{ room_states: roomStates }] = rooms
    const [roomState] = roomStates
    setRoomState(roomState)

    const turns = await milou({
      url: `${process.env.API_URL}/turns?player_id=eq.${playerId}`,
      jwt: userJwt
    })
    setMyTurns(turns)
    setIsDirty(false)
  } catch (error) {
    setError(
      OError.tag(error, 'cannot fetch room', {
        retryable: true
      })
    )
  }
}

const RoomContent = ({ room, player, roomState, setRoomState, setError }) => {
  const { userJwt, userId } = useAuth()
  const [playerJwt, setPlayerJwt] = React.useState()
  const [socketIsConnected, setSocketIsConnected] = React.useState()
  const [myTurns, setMyTurns] = React.useState([])
  const [notifications, setNotifications] = React.useState([])
  const [isDirty, setIsDirty] = React.useState(true)

  const playerId = player.id
  const mePlayerIsNext = roomState && playerId === roomState.next_player_id

  React.useEffect(() => {
    if (!playerId) return

    milou({
      method: 'POST',
      url: `${process.env.API_URL}/rpc/connect_player`,
      jwt: userJwt,
      body: {
        player_id: playerId
      }
    })
      .then(json => setPlayerJwt(json.jwt))
      .catch(error => {
        setError(
          OError.tag(error, 'cannot connect', {
            clientContextKey: 'connect',
            retryable: true
          })
        )
      })
  }, [userJwt, playerId, setError])

  React.useEffect(() => {
    if (!playerJwt) return

    const socketHelper = new SocketHelper(
      playerJwt,
      playerId,
      setSocketIsConnected,
      setNotifications,
      setRoomState,
      setIsDirty,
      setError
    )
    socketHelper.createSocket()
  }, [
    playerJwt,
    playerId,
    setSocketIsConnected,
    setNotifications,
    setRoomState,
    setIsDirty,
    setError
  ])

  React.useEffect(() => {
    // don't fetch the room state until the socket is connected to make sure
    // we're up-to-date
    if (!socketIsConnected) return

    if (!isDirty) return

    fetchData(
      userJwt,
      room,
      playerId,
      setRoomState,
      setMyTurns,
      setIsDirty,
      setError
    )
  }, [
    socketIsConnected,
    userJwt,
    room,
    playerId,
    isDirty,
    setRoomState,
    setMyTurns,
    setIsDirty,
    setError
  ])

  console.log('roomState', roomState)
  return (
    <>
      {roomState && !roomState.game_winner_player_id && (
        <>
          <RoomTutorialManager roomState={roomState} />
          <RoomPlayersList
            roomState={roomState}
            mePlayer={player}
            myTurns={myTurns}
            setError={setError}
          />
          <RoomActionsManager
            roomState={roomState}
            player={player}
            myTurns={myTurns}
            setMyTurns={setMyTurns}
            mePlayerIsNext={mePlayerIsNext}
            setError={setError}
          />
          {room.user_id !== userId && roomState.total_turns === 0 ? (
            <RoomLeave playerId={playerId} setError={setError} />
          ) : null}
        </>
      )}
      <RoomNotificationsManager
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </>
  )
}

export default RoomContent
