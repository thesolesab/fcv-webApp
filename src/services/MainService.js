import { _apiBase } from "../constants/constants";
import useHttp from "../hooks/useHttp";


const useMainService = () => {
    const { loading, request, error, clearError, process, setProcess } = useHttp();

    // User Service
    const getUserById = async (id) => {
        const res = await request(`${_apiBase}/user/${id}`);
        return res
    }

    const changeUser = async (id, data) => {
        const res = await request(`${_apiBase}/user/${id}`, "PUT", data)
        return res
    }

    const updateMany = async (data) => {
        const res = await request(`${_apiBase}/user/updateMany`, "PUT", data)
        return res
    }

    // Game Service
    const getGameById = async (id) => {
        const res = await request(`${_apiBase}/game/${id}`)
        return res
    }

    const updateGameDay = async (data) => {
        const res = await request(`${_apiBase}/game/update`, "PUT", data)
        return res
    }

    // Settings Service
    const getChatById = async (id) => {
        const res = await request(`${_apiBase}/chat/${id}`)
        return res
    }

    const updateChat = async (id, data) => {
        const res = await request(`${_apiBase}/chat/${id}`, "PUT", data)
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
        updateMany,
        getGameById,
        updateGameDay,
        getChatById,
        updateChat
    }
}

export default useMainService