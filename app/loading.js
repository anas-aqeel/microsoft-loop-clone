import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="w-full h-screen flex flex-col">
            <div className="flex-1 p-3 flex flex-col items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="flex justify-center">
                        <Loader2 size={32} className="text-blue-700 animate-spin" />
                    </div>
                    <h1 className="mt-6 text-3xl font-bold text-gray-900"><span className='invisible'>...</span>Loading...</h1>
                    <p className="my-2 text-sm text-gray-600">Please wait while we load the content.</p>
                </div>
            </div>
        </div>
    )
}
