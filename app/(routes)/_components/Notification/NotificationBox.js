"use client";

import { useInboxNotifications, useUnreadInboxNotificationsCount, useUpdateRoomNotificationSettings } from "@liveblocks/react/suspense";
import {
    InboxNotification,
    InboxNotificationList,
} from "@liveblocks/react-ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export function NotificationBox() {

    const { inboxNotifications } = useInboxNotifications();
    const updateRoomNotificationSettings = useUpdateRoomNotificationSettings();
    const { count, error, isLoading } = useUnreadInboxNotificationsCount();
    const hasNotifications = inboxNotifications.length > 0;

    useEffect(() => {
        updateRoomNotificationSettings({ threads: 'all' })
        console.log(count)
    }, [count])


    return (
        <Popover>
            <PopoverTrigger>

                <div className="relative">
                    <Bell className="text-gray-800 text-lg" />
                    {Number(count) > 0 && !isLoading && !error && inboxNotifications.length > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {count}
                    </span>}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-96">
                {hasNotifications ? (
                    <InboxNotificationList className="inbox-list z-50">
                        {inboxNotifications.map((inboxNotification) => (
                            <InboxNotification

                                className="notification z-50"
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
