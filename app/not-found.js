import { Button } from "@/components/ui/button";
import Header from "./(routes)/_components/Header";

export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div class="flex-1 p-3 flex flex-col items-center justify-center bg-gray-50">
                <div class="text-center">
                    <div class="flex justify-center">
                        <img src="https://hostkro.com/wp-content/uploads/2024/01/saly-2.webp" alt="404 Illustration" class="w-64 h-auto" />
                    </div>
                    <h1 class="mt-6 text-3xl font-bold text-gray-900">Page not found</h1>
                    <p class="my-2 text-sm text-gray-600">Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
                    <a href="/dashboard" className="no-underline m-0 mt-3 p-0">
                        <Button>
                            Go back home
                        </Button>
                    </a>
                </div>
            </div>
        </div>

    )
}