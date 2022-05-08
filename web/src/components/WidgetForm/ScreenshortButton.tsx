import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";


interface ScreenshortButtonProps{
    onScreenshortTook: (screenshort:string | null) => void
    screenshort: string | null
}

export function ScreenshortButton({screenshort,onScreenshortTook}:ScreenshortButtonProps){
    
    const [isTakingScreenshort, setIsTakingScreenshort] = useState(false);


    async function handleTakeScreenshot(){
        setIsTakingScreenshort(true);
        const canvas = await html2canvas(document.querySelector('html')!)

        const base64image = canvas.toDataURL('image/png');

        onScreenshortTook(base64image);
        setIsTakingScreenshort(false);

    }
    
    if(screenshort){
        return (
            <button
                type="button"
                onClick={() => onScreenshortTook(null)}
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors "
                style={{
                    backgroundImage: `url(${screenshort})`,
                    backgroundPosition:'right bottom',
                    backgroundSize: 180
                }}
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return(
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
        >
            {isTakingScreenshort ? <Loading/> : <Camera className="w-6 h-6"/>}
        </button>
    )
}