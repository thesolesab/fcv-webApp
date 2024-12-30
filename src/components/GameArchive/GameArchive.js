import { useEffect, useState } from "react"
import useMainService from "../../services/MainService"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Spinner from "../Spinner/Spinner"
import { NavLink } from "react-router"

function GameArchive({ chatId }) {
    const [gameList, setGameList] = useState([])

    const { getAllGames, loading, error } = useMainService()

    useEffect(
        () => {
            getAllGames(chatId)
                .then(games => {
                    setGameList(games)
                })
        },
        []
    )

    function renderGameList(arr) {
        const items = arr.reverse().map(
            g => {
                const { date, _id } = g

                return (
                    <li className="GameDaysItem" key={_id}>
                        <NavLink
                            to={`/gameDay/${_id}`}
                        >
                            {date}
                        </NavLink>
                    </li>
                )
            }
        )
        return (
            <ul className="GameDaysList">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const games = renderGameList(gameList)

    return (
        <div className='container'>
            {spinner}
            {errorMessage}
            {games}
        </div>
    )
}

export default GameArchive