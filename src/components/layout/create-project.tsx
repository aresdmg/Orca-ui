"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "../ui/input"
import axios from "axios"
import { useEffect } from "react"
import api from "@/lib/api"

interface ICreateProject {
    onClose: () => void
}

export default function CreateProject({ onClose }: ICreateProject) {

    const getUserRepos = async () => {
        const res = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/repos`)
        console.log(res);
    }

    useEffect(() => {
        getUserRepos()
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 w-full h-screen backdrop-blur-2xl flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.15 }}>
                <motion.div
                    className="w-xl h-auto bg-zinc-900 border border-zinc-800 rounded-md p-5 flex justify-start items-center gap-2 flex-col"
                    initial={{ scale: 0.8, y: 40, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 40, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}>
                    <div className="w-full flex justify-start items-center">
                        <h1 className="text-xl font-medium">
                            Create your project
                        </h1>
                    </div>
                    <form className="w-full flex justify-center items-center flex-col mt-3 space-y-2.5">
                        <div className="w-full space-y-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input id="name" placeholder="e.g. SaaS Dashboard" autoComplete="off" className="focus-visible:ring-emerald-500" />
                        </div>

                        <div className="w-full space-y-2">
                            <Label>Plan</Label>
                            <Select defaultValue="free" >
                                <SelectTrigger className="w-full" >
                                    <SelectValue placeholder="Select a plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Free - $0/month</SelectItem>
                                    <SelectItem value="pro">Pro - $39/month</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full space-y-2">
                            <Label>Repository</Label>
                            <Select>
                                <SelectTrigger className="w-full" >
                                    <SelectValue placeholder="Select a repository" />
                                </SelectTrigger>
                                <SelectContent>

                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full space-y-2 flex items-center justify-between border border-zinc-800 rounded-md p-3">
                            <div className="space-y-0.5">
                                <Label>Private Project</Label>
                                <p className="text-xs text-zinc-500">
                                    Only invited members can access this project
                                </p>
                            </div>
                            <Switch />
                        </div>

                        <div className="w-full flex justify-end items-center space-x-2.5 ">
                            <Button type="button" variant={"secondary"} className="w-32 cursor-pointer" onClick={() => onClose()} >
                                Cancel
                            </Button>

                            <Button type="submit" className="w-32 cursor-pointer bg-emerald-700 hover:bg-emerald-800 text-white">
                                Create Project
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </>
    )
}