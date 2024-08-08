"use client";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";
import { MessageCircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

const CommentBox = ({ show, setShow }) => {
    const { threads } = useThreads();

    return (
        <div className={`h-[520px] flex w-full flex-col relative`}>
            <Button onClick={() => setShow(!show)} className="absolute -top-6 -right-5 z-50 text-white rounded-full h-14 w-14 p-0 flex justify-center items-center">
                <MessageCircleX />
            </Button>
            <div className="flex-1 w-full overflow-y-auto custom-scrollbar">
                {threads.map((thread) => (
                    <Thread key={thread.id} thread={thread} />
                ))}
            </div>
            <Composer />
        </div>
    );
}

export default CommentBox;
