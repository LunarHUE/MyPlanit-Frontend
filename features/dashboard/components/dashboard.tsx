"use client";

import React from 'react'
import {Card, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'

export default function Dashboard() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Class</CardTitle>
                <CardDescription>This is a static class card.</CardDescription>
            </CardHeader>
        </Card>
    )
}