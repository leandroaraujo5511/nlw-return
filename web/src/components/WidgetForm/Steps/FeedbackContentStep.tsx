import { ArrowLeft} from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { api } from "../../lib/api";
import { Loading } from "../../Loading";
import { ScreenshortButton } from "../ScreenshortButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType,
    onFeedbackRestartRequest: () => void;
    onFeedbackSent:() => void;
}


export function FeedbackContentStep({
    feedbackType, onFeedbackRestartRequest,onFeedbackSent}:FeedbackContentStepProps
    ){


    const [screenshort, setScreenshort] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const feedbackTypeInfo = feedbackTypes[feedbackType];
    const [isSendingFeedback, setIsSeedingFeedback] = useState(false);

    async function handleSubmitFeedback(event: FormEvent){
        event.preventDefault();
        setIsSeedingFeedback(true)

        console.log(screenshort)
        
        await api.post('/feedback',{
           type: feedbackType,
           comment,
           screenshot: screenshort
        })
        setIsSeedingFeedback(false)
        onFeedbackSent()
    }


    return(
        <>

        <header >
            <button 
                className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100" 
                title="Voltar feedback"
                onClick={onFeedbackRestartRequest}
            >
                
                <ArrowLeft weight="bold" className="w-4 h-4" />
            </button>
            <span className="text-xl leading-6 flex items-center  gap-2">
                <img className="w-6 h-6" src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
                {feedbackTypeInfo.title}
            </span>
            <CloseButton/>
        </header>
        
        <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
            <textarea 
                className="min-w-[304px] min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-x-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                placeholder="Conte com detalhes o que est?? acontecendo..."
                onChange={event => setComment(event.target.value)}
            />

            <footer className="flex gap-2 mt-2" >
                <ScreenshortButton
                    screenshort={screenshort}
                    onScreenshortTook={setScreenshort}
                />
                <button 
                    type="submit"
                    disabled={comment.length === 0 || isSendingFeedback}
                    className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:c focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
                             
                </button>
            </footer>
        </form>

        </>
    );
}