'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Button } from "@/components/ui/button";
import Header from "./(routes)/_components/Header";

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="flex-1 p-3 flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="flex justify-center">
                        <img src="https://ouch-cdn2.icons8.com/7VvFyC515Y1E1JaSOZBcvEq2iUjaKaojSlBhtCHHmRA/rs:fit:608:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzU2/LzdjYjEyM2Q1LWQz/NjItNDI3NS1iYjk5/LWNiMDE2Zjk3ODQ3/ZS5zdmc.png" alt="Error Illustration" className="w-64 h-auto" />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold text-gray-900">Something went wrong!</h1>
                    <p className="my-2 text-sm text-gray-600">We encountered an error. Please try again.</p>
                    <div className="no-underline m-0 mt-3 p-0">
                        <Button onClick={() => { }}>
                            Try again
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
