import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Smile } from "lucide-react"

export function DropdownMenuDemo({ children }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">{children}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex w-full gap-2 justify-start" >
                        <Smile />
                        Profile

                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex w-full gap-2 justify-start" >
                        <Smile />
                        Billing

                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex w-full gap-2 justify-start" >
                        <Smile />
                        Settings

                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex w-full gap-2 justify-start" >
                        <Smile />
                        Keyboard shortcuts

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>


                    <DropdownMenuItem className="flex w-full gap-2 justify-start" >
                        <Smile />
                        New Team

                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="flex w-full gap-2 justify-start" >GitHub</DropdownMenuItem>
                <DropdownMenuItem className="flex w-full gap-2 justify-start" >Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex w-full gap-2 justify-start" >
                    <Smile />
                    Log out

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
