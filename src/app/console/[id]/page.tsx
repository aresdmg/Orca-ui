'use client'

import { useParams } from "next/navigation"

export default function DynamicConsole() {
    const params = useParams();
    const jobId = params.id;

    return (
        <>
            <p>Dynamic console</p>
            <p>Job ID: {jobId}</p>
        </>
    );
}