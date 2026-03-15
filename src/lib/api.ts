import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface RetryAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry: boolean;
}

const api = axios.create({
    url: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
})

api.interceptors.response.use(
    (res: AxiosResponse): AxiosResponse => res,
    async (error: AxiosError) => {
        const originalReq = error.config as RetryAxiosRequestConfig

        if (error.response?.status === 401 && originalReq && !originalReq._retry) {
            originalReq._retry = true
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`, {}, { withCredentials: true })
                return api(originalReq)
            } catch (error) {
                if (typeof window !== "undefined") {
                    window.location.href = "/auth/sign-in";
                }

                return Promise.reject(error)
            }
        }
    }
)

export default api