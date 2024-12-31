import React, { useEffect, useState } from 'react'
import useMainService from '../../services/MainService'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Spinner from '../Spinner/Spinner'
import dayz from '../../helpers/dayz'
import { useShowPopup } from '@vkruglikov/react-telegram-web-app'

const Preferences = ({ chatId }) => {
  const [settings, setSettings] = useState(null)
  const [changed, setChanged] = useState(false)

  const showPopup = useShowPopup();

  const { getChatById, updateChat, loading, error } = useMainService()

  useEffect(
    () => {
      getChatById(chatId)
        .then(
          data => {
            setSettings(data)
          }
        )
    },
    [chatId]
  )

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (settings.settings[name] !== value || settings.settings[name] !== +value) {
      setSettings(
        (prevSettings) => ({
          ...prevSettings,
          settings: {
            ...prevSettings.settings,
            [name]: name === "gameTime" ? value : +value,
          },
        })
      )
      setChanged(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    changed && updateChat(chatId, JSON.stringify(settings))
      .then(
        () => {
          setChanged(false)
          showPopup({ message: 'Настройки применены' })
        }
      )
  }

  function renderSettings(data) {
    if (data) {
      const { settings: { gameDay, gameTime, maxPlayers } } = data
      return (
        <form className="pref">
          <div className="pref_item">
            <div className="form_radio_group">
              {dayz.map(
                (el, index) => (
                  <div className="form_radio_group-item" key={index}>
                    <input
                      id={`radio-${el.value}`}
                      type="radio"
                      name="gameDay"
                      value={el.value}
                      checked={el.value === gameDay}
                      onChange={handleChange}
                    />
                    <label htmlFor={`radio-${el.value}`}>{el.name}</label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="pref_item">
            <label htmlFor="gameTime" >Время начала матча: </label>
            <input
              type="time"
              name="gameTime"
              value={gameTime}
              onChange={handleChange}
            />
          </div>
          <div className="pref_item">
            <label htmlFor="maxPl">Максимум игроков: </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              name="maxPlayers"
              value={maxPlayers}
              onChange={handleChange}
            />
          </div>
          <div className="pref_item">
            <input
              type="submit"
              value="Сохранить"
              onClick={handleSubmit}
            />
          </div>
        </form>
      )
    }
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = renderSettings(settings)
  console.log(loading);


  return (
    <div className='container'>
      {spinner || errorMessage || content}
    </div>
  )
}

export default Preferences