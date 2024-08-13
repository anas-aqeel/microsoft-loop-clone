import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export function ShareDialog({ link, close }) {


    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    console.log('Link copied to clipboard');
                    setIcon(Check)
                    toast({
                        title: 'Link copied to clipboard',
                        variant: 'success',
                    })
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        } else {
            console.warn('Clipboard API not supported');
        }
    };
    let [Icon, setIcon] = useState(CopyIcon)
    return (
        <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-md">
            <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <div className="text-lg font-semibold leading-none tracking-tight">Share link</div>
                <p className="text-sm text-muted-foreground">
                    Anyone who has this link will be able to view this.
                </p>
            </div>
            <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                        Link
                    </Label>
                    <Input
                        id="link"
                        defaultValue={link}
                        readOnly
                    />
                </div>
                <Button type="submit" onClick={handleCopy} size="sm" className="px-3 group">
                    <span className="sr-only">Copy</span>
                    <Icon className="h-4 w-4 text-black group-hover:text-white" />
                </Button>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:space-x-2 sm:justify-start">
                <Button onClick={() => { close() }} type="button" variant="secondary">
                    Close
                </Button>
            </div>
        </div>
    )
}
