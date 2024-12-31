import { useLocation } from 'react-router'
import useMainService from '../../services/MainService.js'
import ErrorMessage from '../ErrorMessage/ErrorMessage.js'
import Spinner from '../Spinner/Spinner.js'
import GameDay from '../GameDay/GameDay.js'
import { useEffect, useState } from 'react'

const GameDayPage = ({ chatId }) => {
    let { pathname } = useLocation()
    let GameId = pathname.split('/gameDay/')[1]
    const [data, setData] = useState(null)
    const [chat, setChat] = useState(null)


    const { getGameById, getChatById, loading, error } = useMainService()

    useEffect(
        () => {
            if (GameId) {
                getGameById(GameId)
                    .then(
                        game => {
                            setData(game)
                        }
                    )
            } else {
                getChatById(chatId)
                    .then(
                        chat => {
                            setChat(chat)
                            setData(chat.gameDays.at(-1))
                        }
                    )
            }

        },
        [GameId, chatId]
    )

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div
            className='container'
        >
            {spinner}
            {errorMessage}
            {data ? <GameDay data={data} next={!!!GameId} chat={chat} /> : null}
        </div>
    )
}

export default GameDayPage