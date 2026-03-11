"use client"

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter()

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col space-y-10" >
                <div className="flex justify-center items-center flex-col space-y-2.5">

                    <motion.h1 className="text-3xl font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0 }} >
                        Just focus on building
                    </motion.h1>

                    <motion.h1 className="text-3xl font-medium text-emerald-500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} >
                        we'll take care of shipping.
                    </motion.h1>

                </div>
                <div>
                    <Button className="min-w-60 cursor-pointer bg-emerald-700 " size={"default"} onClick={() => router.push('/auth/sign-in')} >
                        <span>
                            Get started
                        </span>
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    );
}
