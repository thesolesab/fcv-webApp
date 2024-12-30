import { useLocation } from 'react-router'
import useMainService from '../../services/MainService.js'
import ErrorMessage from '../ErrorMessage/ErrorMessage.js'
import Spinner from '../Spinner/Spinner.js'
import GameDay from '../GameDay/GameDay.js'
import { useEffect, useState } from 'react'

const GameDayPage = () => {
    let { pathname } = useLocation()
    let GameId = pathname.split('/gameDay/')[1]
    const [data, setData] = useState(null)

    const { getGameById, loading, error } = useMainService()

    useEffect(
        () => {
            getGameById(GameId)
                .then(
                    game => {
                        setData(game)
                    }
                )
        },
        [GameId, getGameById]
    )

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    return (
        <div
            className='container'
        >
            {spinner}
            {errorMessage}
            {data ? <GameDay data={data} /> : null}
        </div>
    )
}

export default GameDayPage