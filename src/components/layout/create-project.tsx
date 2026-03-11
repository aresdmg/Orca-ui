import { motion } from "motion/react"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "../ui/input"

interface ICreateProject {
    onClose: () => void
}

export default function CreateProject({ onClose }: ICreateProject) {

    return (
        <>
            <motion.div
                className="fixed top-0 w-full h-screen backdrop-blur-2xl flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.15 }}>
                <motion.div
                    className="w-5xl h-10/12 bg-zinc-900 border border-zinc-800 rounded-md p-5 flex justify-between items-center gap-2"
                    initial={{ scale: 0.8, y: 40, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, y: 40, opacity: 0 }}
                    transition={{ duration: 0.18, ease: "easeInOut" }}>
                    <div>

                    </div>
                    <div className="w-1/2 h-full" >
                        <div className=" flex justify-between items-center">
                            <h1 className="text-lg font-medium">
                                Create a project
                            </h1>
                            <Button className="cursor-pointer" variant={"outline"} onClick={() => onClose()}>
                                <X />
                            </Button>
                        </div>
                        <div className="w-full mt-4 ">
                            <form className="w-full space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Project Name</Label>
                                    <Input id="name" placeholder="e.g. SaaS Dashboard" autoComplete="off" className="focus-visible:ring-emerald-500" />
                                </div>

                                <div className="space-y-2">
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

                                <div className="space-y-2">
                                    <Label>Repository</Label>
                                    <Select>
                                        <SelectTrigger className="w-full" >
                                            <SelectValue placeholder="Select a repository" />
                                        </SelectTrigger>
                                        <SelectContent>

                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between border border-zinc-800 rounded-md p-3">
                                    <div className="space-y-0.5">
                                        <Label>Private Project</Label>
                                        <p className="text-xs text-zinc-500">
                                            Only invited members can access this project
                                        </p>
                                    </div>
                                    <Switch />
                                </div>

                                <Button type="submit" className="cursor-pointer w-full bg-emerald-700 hover:bg-emerald-800 text-white">
                                    Create Project
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}