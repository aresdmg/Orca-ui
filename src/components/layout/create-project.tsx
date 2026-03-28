"use client"

import { motion } from "motion/react"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { Repository } from "@/types/repository.types"
import { Lock } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"

interface ICreateProject {
    onClose: () => void
}

export const createProjectSchema = z.object({
    name: z.string().min(3),
    fullName: z.string().min(3),
    isPrivate: z.boolean(),
    plan: z.enum(["free", "pro"]),
    repoUrl: z.string().min(1, "Select a repository"),
    cloneUrl: z.string().min(1),
    language: z.string().min(1)
})

export type CreateProjectFormData = z.infer<typeof createProjectSchema>

export default function CreateProject({ onClose }: ICreateProject) {
    const [env, setEnv] = useState("")
    const router = useRouter()
    const { handleSubmit, reset, formState: { errors }, control, setValue } = useForm<CreateProjectFormData>({
        resolver: zodResolver(createProjectSchema),
        mode: "onChange",
    })
    const [repos, setRepos] = useState<Repository[]>([])

    const getUserRepos = async () => {
        try {
            const res = await api.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/repos`, { withCredentials: true })
            if (res.status === 200) {
                setRepos(res.data?.repositories)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostProjectData = async (data: CreateProjectFormData) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/create`, { ...data, env }, { withCredentials: true })
            if (res.status === 201) {
                toast.success("Project created")
            }
            const id = res.data?.id
            router.push(`/console/${id}`)
        } catch (error) {
            console.log(error)
        } finally {
            reset()
            onClose()
        }
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
                            <Label>Repository</Label>
                            <Controller control={control} name="repoUrl" render={({ field }) => (
                                <Select value={field.value} onValueChange={(value) => {
                                    field.onChange(value)
                                    const selectedRepo = repos.find((r) => r.html_url === value)
                                    if (selectedRepo) {
                                        setValue("name", selectedRepo.name)
                                        setValue("fullName", selectedRepo.full_name)
                                        setValue("isPrivate", selectedRepo.private)
                                        setValue("cloneUrl", selectedRepo.clone_url)
                                        setValue("language", selectedRepo.language)
                                    }
                                }}>
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
                            {errors.repoUrl && (
                                <p className="text-red-500 text-sm">
                                    {errors.repoUrl.message}
                                </p>
                            )}
                        </div>

                        <div className="w-full space-y-2">
                            <Label>Plan</Label>
                            <Controller control={control} name="plan" render={({ field }) => (
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

                        <div className="w-full space-y-2 mt-2">
                            <Label>Enviornment variables</Label>
                            <Textarea value={env} onChange={(e) => setEnv(e.target.value)} className="w-full h-40 font-mono" placeholder={`KEY_1=VALUE_1
KEY_2=VALUE_2
KEY_3=VALUE_3`} />
                        </div>

                        <div className="w-full flex justify-end items-center space-x-2.5 ">
                            <Button type="button" variant={"secondary"} className="w-32 cursor-pointer" onClick={() => onClose()} >
                                Cancel
                            </Button>

                            <Button type="submit" className="w-32 cursor-pointer bg-primary hover:bg-primary/50 text-white">
                                Create Project
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </>
    )
}