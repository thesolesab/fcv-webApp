import { useEffect, useState } from "react"
import useMainService from "../../services/MainService"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Spinner from "../Spinner/Spinner"
import { NavLink } from "react-router"
import dictionary from "../../helpers/dictionary"

function GameArchive({ chatId }) {
    const [gameList, setGameList] = useState([])

    const { getChatById, loading, error } = useMainService()

    useEffect(
        () => {
            getChatById(chatId)
                .then(data => {
                    setGameList(data.gameDays)
                })
        },
        [chatId]
    )

    function renderGameList(arr) {
        if (arr.length === 0) {
            return (
                <h2>
                    Похоже игр еще не было!
                </h2>
            )
        }

        const items = arr.reverse().map(
            (g) => {
                const { date, _id } = g
                const now = Date.now()
                const gameDay = date.split(' ')
                gameDay.shift()
                gameDay.pop()
                const gameDayDate = new Date(gameDay.map(
                    el => {
                        if (dictionary.indexOf(el) >= 0) {
                            return dictionary.indexOf(el) + 1
                        }
                        return el
                    }
                ).reverse().join()
                )

                if (now > gameDayDate) {
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
                return null
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
            {spinner || errorMessage || games}
        </div>
    )
}

export default GameArchive