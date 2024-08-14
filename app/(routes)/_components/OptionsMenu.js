import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CustomDropdownMenu({ children, parentClass, menuData, id = "" }) {
    return (
        <DropdownMenu className="z-[1000]">
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={parentClass}>{children}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {Object.keys(menuData).map((group, index) => (
                    <div key={index}>
                        <DropdownMenuGroup>
                            {menuData[group].map((item, itemIndex) => (
                                <DropdownMenuItem
                                    key={itemIndex}
                                    className="flex w-full gap-2 justify-start py-2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        item.onClick(id)
                                    }}
                                >
                                    {item.icon && <item.icon size={16} />}
                                    {item.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                        {index < Object.keys(menuData).length - 1 && <DropdownMenuSeparator />}
                    </div>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
