"use client"

import CreateProject from "@/components/layout/create-project";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export default function Console() {
    const [showCreateProject, setShowCreateProject] = useState(false)

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
            <Button className="cursor-pointer" onClick={() => setShowCreateProject(e => !e)} >
                <Plus />
                <span>
                    Create a project
                </span>
            </Button>
        </>
    )
}