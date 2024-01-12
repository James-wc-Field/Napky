'use client'
import React from "react";
import dynamic from 'next/dynamic'
import '@tldraw/tldraw/tldraw.css'
export default function Page({ params }: { params: { projectID: string } }) {
    const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, { ssr: false })

    return (
        <div style={{position: 'fixed', inset: 0}}>
            <Tldraw/>
        </div>  
    );
}