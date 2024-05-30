import React, { useEffect, useState } from 'react'
import axios from 'axios'
import API_URL from './helper'

const AiResponse = ({ userInputText , transcript }) => {
    useEffect(() => {

        console.log(userInputText)

    }, [userInputText])
 
    const [aiResonseAns , setAiResponseAns] = useState("")

    useEffect(() => {
        if(!transcript){
            setAiResponseAns("")
        }
    }, [transcript])
    


    // const handleSend = async () => {
    //     const response = await axios.post(
    //         "https://api.openai.com/v1/completions",
    //         {
    //             prompt: `${userInputText}`,

    //             model: 'gpt-3.5-turbo-instruct',
    //             temperature: 0.5,
    //             max_tokens: 356,
    //             // top_p: 1,
    //             // frequency_penalty: 0,
    //             // presense_penalty: 0
    //         },
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: "Bearer " + (import.meta.env.VITE_REACT_APP_OPENAI_API_KEY),
    //             },
    //         }
    //     );

    //     setAiResponseAns(response.data.choices[0].text)
    //    // console.log("the user input text is : " + userInputText)

    //    // return response.data.choices[0].text;
    // };

    const handleSend = async () => {
        try {

            const response = await axios.post(`${API_URL}ai` , {prompt : userInputText})

            // setAiResponseAns(response)
            console.log(response.data.result)
            setAiResponseAns(response.data.result)

            
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            { transcript && <div className=' mt-28 w-screen flex items-center justify-center'>

                {/* response div */}
                <div className='ai-div w-[80%] flex flex-col items-center justify-center'>
                    <button onClick={handleSend} class="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full mt-4">
                        Get Result
                    </button>

                    <p className='text-white text-[22px] p-8'>{aiResonseAns}</p>
                </div>

            </div>}
        </>
    )
}

export default AiResponse