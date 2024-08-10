"use client";

import { useInboxNotifications } from "@liveblocks/react/suspense";
import {
    InboxNotification,
    InboxNotificationList,
} from "@liveblocks/react-ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationBox() {
    const { inboxNotifications } = useInboxNotifications();

    const hasNotifications = inboxNotifications.length > 0;

    return (
        <Popover>
            <PopoverTrigger>
                <Bell className="text-gray-800 text-lg" />
            </PopoverTrigger>
            <PopoverContent className="w-72">
                {hasNotifications ? (
                    <InboxNotificationList>
                        {inboxNotifications.map((inboxNotification) => (
                            <InboxNotification
                                key={inboxNotification.id}
                                inboxNotification={inboxNotification}
                            />
                        ))}
                    </InboxNotificationList>
                ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">

                            </div>
                            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
                                <Bell className="text-pink-400 w-16 h-16" />
                            </div>
                        </div>
                        <p className="mt-4 text-gray-600 text-sm">
                            No Notifications Yet
                        </p>
                        <p className="mt-2 text-gray-500 text-xs text-center">
                            Please add your address for your better experience
                        </p>
                        <Button variant="outline" className="mt-4 ">
                            Refresh
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}