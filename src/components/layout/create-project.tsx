"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Repository } from "@/types/repository.types"
import { Lock } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface ICreateProject {
    onClose: () => void
}

export const createProjectSchema = z.object({
    name: z.string().min(3, "Project name is required").max(50, "Project name is too long"),
    plan: z.enum(["free", "pro"]),
    repository: z.string().min(1, "Select a repository"),
    isPrivate: z.boolean(),
})

export type CreateProjectFormData = z.infer<typeof createProjectSchema>

export default function CreateProject({ onClose }: ICreateProject) {
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectSchema),
        mode: "onChange",
    })
    const [repos, setRepos] = useState<Repository[]>([])

    const getUserRepos = async () => {
        try {
            const res = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/repos`, { withCredentials: true })
            console.log(res);
            if (res.status === 200) {
                setRepos(res.data?.repositories)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostProjectData = (data: CreateProjectFormData) => {
        console.log(data);
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
                    <form onSubmit={handleSubmit(handlePostProjectData)} className="w-full flex justify-center items-center flex-col mt-3 space-y-2.5">
                        <div className="w-full space-y-2">
                            <Label htmlFor="name">Project Name</Label>
                            <Input id="name" placeholder="e.g. SaaS Dashboard" autoComplete="off" className="focus-visible:ring-emerald-500" {...register("name")} />
                            {errors.name && (
                                <p className="text-red-400 text-sm">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <Label>Plan</Label>
                            <Controller control={control} name="plan" defaultValue="free" render={({ field }) => (
                                <Select onValueChange={field.onChange} value={field.value} >
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="Select a plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="free">Free - $0/month</SelectItem>
                                        <SelectItem value="pro">Pro - $39/month</SelectItem>
                                    </SelectContent>
                                </Select>
                            )} />
                            {errors.plan && (
                                <p className="text-red-500 text-sm">
                                    {errors.plan.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <Label>Repository</Label>
                            <Controller control={control} name="repository" render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange} >
                                    <SelectTrigger className="w-full" >
                                        <SelectValue placeholder="Select a repository" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full">
                                        {repos.map((r) => (
                                            <SelectItem key={r.id} value={r.html_url} className="w-full" >
                                                <div className="flex justify-start items-center space-x-2" >
                                                    <p>
                                                        {r.full_name}
                                                    </p>
                                                    <p>
                                                        {
                                                            r.private ?
                                                                <span>
                                                                    <Lock size={12} className="text-zinc-500" />
                                                                </span>
                                                                : null
                                                        }
                                                    </p>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )} />
                            {errors.repository && (
                                <p className="text-red-500 text-sm">
                                    {errors.repository.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full space-y-2 flex items-center justify-between border border-zinc-800 rounded-md p-3">
                            <div className="space-y-0.5">
                                <Label>Private Project</Label>
                                <p className="text-xs text-zinc-500">
                                    Only invited members can access this project
                                </p>
                            </div>
                            <Controller control={control} name="isPrivate" render={({ field }) => (
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            )} />
                            {errors.isPrivate && (
                                <p className="text-red-500 text-sm">
                                    {errors.isPrivate.message}
                                </p>
                            )}
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