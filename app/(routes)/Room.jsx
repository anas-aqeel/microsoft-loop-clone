"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_MPsN6HkLoxHnJLs_0wfse_2ZAHExM-Q7IjObHD7fA6vnRsE40Cnnkh7HoC4up1SB"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}