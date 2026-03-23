"use client"

import axios, { isAxiosError } from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { IUser } from "@/types/user"
import { Skeleton } from "../ui/skeleton"
import { useRouter } from "next/navigation"

export default function Navbar() {
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<IUser | null>(null)
    const router = useRouter()

    const getMe = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/me`, { withCredentials: true })
            setUserInfo(res.data)
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.message || "Server error")
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getMe()
    }, [])

    return (
        <>
            <div className="w-full h-14 border-b border-zinc-800 px-40 flex justify-between items-center" >
                <div>
                    <span className="text-xl font-semibold" >
                        ORCA
                    </span>
                </div>
                <div>
                    {
                        isLoading ?
                            (
                                <Skeleton className="size-8 rounded-full" />
                            ) : (
                                <button className="flex justify-between items-center space-x-1 cursor-pointer" onClick={() => router.push("/profile")} >
                                    <Avatar>
                                        <AvatarImage
                                            src={userInfo?.avatar}
                                            alt={`@${userInfo?.username}`}
                                        />
                                    </Avatar>
                                </button>
                            )
                    }
                </div>
            </div>
        </>
    )
}