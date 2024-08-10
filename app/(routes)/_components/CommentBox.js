"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import { MessageCircleX, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CommentBox = ({ show, setShow }) => {
    const { threads } = useThreads();

    const hasThreads = threads.length > 0;

    return (
        <div className="h-[520px] flex w-full flex-col relative bg-white rounded-lg pb-4">
            <Button
                onClick={() => setShow(!show)}
                className="absolute -top-6 -right-5 z-50 text-white rounded-full h-14 w-14 p-0 flex justify-center items-center bg-black"
            >
                <MessageCircleX />
            </Button>
            <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
                {hasThreads ? (
                    threads.map((thread) => (
                        <Thread key={thread.id} thread={thread} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4">
                        <div className="relative">

                            <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center">
                                <MessageSquareText className="text-yellow-400 w-24 h-24" />
                            </div>
                        </div>
                        <p className="mt-8 text-black text-2xl font-bold">
                            No Comments Yet
                        </p>
                        <p className="mt-2 text-gray-500 text-base text-center">
                            Be the first to leave a comment.
                        </p>
                    </div>
                )}
            </div>
            <Separator />

            <Composer />
        </div>
    );
}

export default CommentBox;
