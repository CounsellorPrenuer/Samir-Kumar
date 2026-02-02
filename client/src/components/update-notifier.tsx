import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function UpdateNotifier() {
    const [updateAvailable, setUpdateAvailable] = useState(false);

    useEffect(() => {
        // Check version every 30 seconds
        const interval = setInterval(checkForUpdate, 30000);
        // Also check on mount
        checkForUpdate();

        return () => clearInterval(interval);
    }, []);

    const checkForUpdate = async () => {
        try {
            // Add timestamp to prevent caching of the version file itself
            const response = await fetch(`/version.json?t=${new Date().getTime()}`);
            if (!response.ok) return;

            const remoteConfig = await response.json();

            // Get local build time from meta tag or hardcoded (using build time prop in future)
            // For now, we will simply compare with a stored value in localStorage
            const lastKnownBuildToken = localStorage.getItem('app_build_token');

            if (lastKnownBuildToken && lastKnownBuildToken !== remoteConfig.buildTime) {
                setUpdateAvailable(true);
            }

            // Store the current one as "latest seen" 
            // ideally we only update this AFTER reload, but for this simple version:
            // We need a way to know "I am running Old Code".
            // Code running in memory knows its own build time? No.

            // Simplified approach: 
            // If we verify a change, we show the button. 
            // The user clicks -> Reloads -> New Code loads -> New Code has new Token -> Match.
        } catch (e) {
            console.error("Version check failed", e);
        }
    };

    const handleReload = () => {
        // Clear cache capabilities
        if ('caches' in window) {
            caches.keys().then((names) => {
                names.forEach((name) => {
                    caches.delete(name);
                });
            });
        }
        window.location.reload();
    };

    if (!updateAvailable) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5">
            <div className="bg-blue-600 text-white p-4 rounded-xl shadow-2xl flex items-center gap-4 border border-blue-400">
                <div>
                    <h4 className="font-bold text-sm">Update Available</h4>
                    <p className="text-xs text-blue-100">New content is active.</p>
                </div>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleReload}
                    className="whitespace-nowrap"
                >
                    <RefreshCw className="w-3 h-3 mr-2" />
                    Refresh Now
                </Button>
            </div>
        </div>
    );
}
