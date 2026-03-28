"use client"

import CreateProject from "@/components/layout/create-project";
import Navbar from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/repository.types";
import axios, { isAxiosError } from "axios";
import { ChevronRight, LayoutGrid, List, Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Console() {
    const [showCreateProject, setShowCreateProject] = useState(false)
    const [isList, setIsList] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])

    const getUserProjects = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/projects`, { withCredentials: true })
            setProjects(res.data.projects)
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.message || "Server error")
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserProjects()
    }, [showCreateProject, setShowCreateProject])

    return (
        <>
            {
                <AnimatePresence>
                    {
                        showCreateProject &&
                        <CreateProject onClose={() => setShowCreateProject(e => !e)} />
                    }
                </AnimatePresence>
            }
            <div className="w-full h-screen flex justify-start items-center flex-col">
                <Navbar />
                <div className="min-w-7xl h-14 flex justify-end items-center pt-10 px-10 space-x-1.5" >
                    <Button className="cursor-pointer" disabled={true} variant={"secondary"} onClick={() => setIsList(e => !e)} >
                        {
                            isList ? <List /> : <LayoutGrid />
                        }
                    </Button>
                    <Button className="cursor-pointer" onClick={() => setShowCreateProject(e => !e)} >
                        <Plus />
                        <span>
                            Create a project
                        </span>
                    </Button>
                </div>
                <div className="min-w-7xl p-10 grid grid-cols-3 gap-6">
                    {isLoading ? (
                        <>
                            <Skeleton className="w-full h-40" />
                            <Skeleton className="w-full h-40" />
                            <Skeleton className="w-full h-40" />
                        </>
                    ) : (
                        projects.map((p) => (
                            <Link href={`/console/${p.id}`} key={p.id} className="w-full bg-zinc-900/50 hover:bg-zinc-900/60 h-40 border-zinc-700 border rounded-lg p-4 shadow">
                                <div className="w-full flex justify-between items-center px-2" >
                                    <div className="flex justify-center items-center space-x-1.5" >
                                        <h2 className="font-semibold text-lg">{p.name}</h2>
                                        <Badge className="rounded-sm px-1 text-xs text-zinc-300" >
                                            {String(p.plan).toLowerCase() == "free" ? "NANO" : "MACRO"}
                                        </Badge>
                                    </div>
                                    <div className="cursor-pointer" >
                                        <ChevronRight className="size-5 text-zinc-500" />
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}