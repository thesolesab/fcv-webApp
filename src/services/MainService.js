import useHttp from "../hooks/useHttp";


const useMainService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp();

    const _apiBase = `http://localhost:5000`

    const getUserById = async (id) => {
        const res = await request(`${_apiBase}/user/${id}`);
        return res
    }

    const changeUser = async (id, data) => {
        const res = await request(`${_apiBase}/user/${id}`, "PUT", data)
        return res
    }

    const getAllGames = async (chatId) => {
        const res = await request(`${_apiBase}/game/all/${chatId}`)
        return res
    }

    const getGameById = async (id) => {
        const res = await request(`${_apiBase}/game/${id}`)
        return res
    }

    const updateGameDay = async (id, data) => {
        const res = await request(`${_apiBase}/game/${id}`, "PUT", data)
        return res
    }

    const getSettings = async (id) => {
        const res = await request(`${_apiBase}/pref/${id}`)
        return res
    }

    const updatedSettings = async (id, data) => {
        const res = await request(`${_apiBase}/pref/${id}`, "PUT", data)
        return res
    }

    return {
        loading,
        error,
        process,
        setProcess,
        clearError,
        getUserById,
        changeUser,
        getAllGames,
        getGameById,
        updateGameDay,
        getSettings,
        updatedSettings
    }
}

export default useMainService