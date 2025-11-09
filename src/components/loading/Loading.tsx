import { useState, useEffect } from 'react';
import { Progress } from '../retroui/Progress';
import './loading.css';

interface LoadingProps {
    onLoadingComplete: () => void;
}

export const Loading = ({ onLoadingComplete }: LoadingProps) => {
    const [progress, setProgress] = useState(0);
    const [loadingSound] = useState(() => {
        const audio = new Audio('/sounds/load.mp3');
        audio.loop = false;
        return audio;
    });

    useEffect(() => {
        // Start loading sound
        loadingSound.play().catch(e => console.log('Loading sound failed:', e));

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    loadingSound.pause();
                    loadingSound.currentTime = 0;
                    // Call the completion callback after a short delay
                    setTimeout(() => {
                        onLoadingComplete();
                    }, 300);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // Completes in ~3 seconds

        return () => {
            clearInterval(interval);
            loadingSound.pause();
            loadingSound.currentTime = 0;
        };
    }, [loadingSound, onLoadingComplete]);

    return (
        <div
            className="w-full h-screen flex flex-col items-center justify-center bg-black"
            style={{
                backgroundImage: 'url(/loading.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FA812F] mt-4"
                style={{
                    fontFamily: 'Sixtyfour, cursive',
                }}
            >
                SHAASTRA 2026
            </h1>

            <div className="w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 px-4">
                <Progress
                    value={progress}
                    className="h-6 bg-gray-800 border-white"
                />
                <p
                    className="text-white text-center mt-4 text-lg sm:text-xl"
                    style={{
                        fontFamily: 'Silkscreen, monospace',
                    }}
                >
                    {progress}%
                </p>
            </div>
        </div>
    );
};
