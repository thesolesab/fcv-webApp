import { useState } from "react";
import useMainService from "../../services/MainService";
import { useShowPopup } from "@vkruglikov/react-telegram-web-app";

import capImg from './cap.png';

function GameDay({ data }) {

    const [gameDay, setGameDay] = useState(data)
    const showPopup = useShowPopup();


    const { date, players, games, legioners, teams, updatedAt, createdAt } = gameDay
    const arrPlayers = players.concat(legioners)

    const { updateGameDay } = useMainService()


    const handleChangeScore = (e) => {
        const scoreId = +e.target.getAttribute('data-score-id');
        const gameIndex = +e.target.getAttribute('data-game-index');
        const newScore = +e.target.value;
        if (!isNaN(newScore)) {
            setGameDay(prevState => {
                // Создаём копию состояния
                const updatedGames = [...prevState.games];
                // Копируем конкретную игру
                const updatedGame = { ...updatedGames[gameIndex] };
                // Копируем счёт
                const updatedScore = [...updatedGame.score];

                // Обновляем нужное значение
                updatedScore[scoreId] = newScore;

                // Собираем обновлённую игру
                updatedGame.score = updatedScore;

                // Обновляем массив игр
                updatedGames[gameIndex] = updatedGame;

                // Возвращаем новое состояние
                return {
                    ...prevState,
                    games: updatedGames,
                };
            });
        }
    };

    const handleBlur = async () => {
        updateGameDay(JSON.stringify(gameDay))
            .then(
                () => {
                    showPopup({ message: 'Имя успешно сохранено' }).then(buttonId => console.log(buttonId));
                }
            )
    };

    function renderGame(game, index) {
        return (
            <div className="gameItem" key={index}>
                {game.score.map(
                    (s, i) => (
                        <div className={`team`} key={i}>
                            <div className="name">
                                {teams.find(el => el._id === game.teams[i]).colour}
                            </div>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={s}
                                data-score-id={i}
                                data-game-index={index}
                                onChange={handleChangeScore}
                                onBlur={handleBlur}
                            />
                        </div>
                    )
                )}
            </div>
        )
    }

    function renderTeam(team, index) {
        return (
            <div className="teams_item" key={index}>
                <h3 className="name">{team.colour}</h3>
                <div className="players">
                    <div className="captain">
                        {arrPlayers.find(el => el._id === team.captain).name}
                        <img src={capImg} alt="C" />
                    </div>
                    {team.players.map(
                        (player, i) => {
                            let item = arrPlayers.find(el => el._id === player)

                            return (
                                <div key={i}>
                                    {item.name}
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }

    const dateTime = new Date(updatedAt ? updatedAt : createdAt)
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    return (
        <div className="gameDay">
            <h2>{date}</h2>
            <hr />
            <div className="games">
                {games.map(renderGame)}
            </div>
            <div className="teams">
                {teams.map(renderTeam)}
            </div>
            <hr />
            <div className="signature">
                {gameDay.whoCreate && <a href={gameDay.whoCreate.link}>{gameDay.whoCreate.name}</a>}
                {dateTime.toLocaleDateString(undefined, options)}
            </div>
        </div >
    )
}

export default GameDay