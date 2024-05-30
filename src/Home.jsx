import React , {useEffect, useState} from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import  'regenerator-runtime/runtime'
import MicImg from "./assets/mic.png"
import AiResponse from './AiResponse';

const Home = () => {

    // speech to text
      // user audio to text
   const [userInputText , setUserInputText] = useState("")
   

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
      if (!browserSupportsSpeechRecognition) {
        console.log("no mic")
        return <span>Browser doesn't support speech recognition.</span>;
      }
       

      
   const startListening = () =>  SpeechRecognition.startListening({ continuous: true , language : 'en-IN' })
   //  const stopListning = SpeechRecognition.stopListening()
 
     const handleMic = () => {
          if( listening === true){
             SpeechRecognition.stopListening()
     }else{
         startListening()
     }
 }


useEffect(() => {
    if (transcript !== "") {
        setUserInputText(transcript); // Update speech input
    }
}, [transcript]);
 

  return (
    <>
        <div className='bg-home flex items-center flex-col'>
        {/* header */}
            <h1 className='text-[24px] pt-2  text-center text-white'>Voice-GPT</h1>

            {/* mic */}
            <div  className='hero relative mt-11  w-[80%] flex items-center gap-8'>
               <div onClick={handleMic} className={`${listening ? ' mic-div-border-listening ' : " mic-div-border " } cursor-pointer`}>
               <img className='h-[100px] w-[100px] ' src={MicImg} alt="" />
               </div>

                <div className='text-white text-[20px] p-3 w-[85%]'>{transcript}</div>

               { transcript && <button onClick={resetTranscript} className='bg-slate-500 text-white text-[17px] p-1 rounded-md absolute  bottom-0 right-0 mt-9'>reset</button>}
            </div>

              <AiResponse userInputText={userInputText} transcript={transcript}></AiResponse>
        </div>
    </>
  )
}

export default Home