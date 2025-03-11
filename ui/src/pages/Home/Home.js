import React, { useState } from 'react'
import './Home.css'
import axios from 'axios';
import languages from '../../images/languages.png'
import input from '../../images/input.png'
import translated from '../../images/translated.png'
import { Select } from 'antd';

export default function Home() {

    const [text, setText] = useState("")
    const [think, setThink] = useState("")
    const [status, setStatus] = useState("")
    const [textValue, setTextValue] = useState("")
    const languagesList = ["Afar", "Albanian", "Amharic", "Armenian", "Assamese", "Aymara", "Balochi", "Basque",
        "Belarusian", "Bengali", "Bislama", "Bosnian", "Breton", "Burmese", "Chamorro", "Chechen", "Cornish", "Corsican",
        "Czech", "Dzongkha", "Dutch", "English", "Estonian", "Fijian", "French", "Frisian", "Galician", "Georgian", "German",
        "Gilbertese", "Greek", "Gujarati", "Haitian Creole", "Hakka Chinese", "Hausa", "Hebrew", "Hindi", "Hungarian", "Igbo",
        "Inuktitut", "Irish Gaelic", "Italian", "Japanese", "Javanese", "Kannada", "Khmer", "Korean", "Kurdish", "Lao", "Latvian",
        "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malayalam", "Mandarin Chinese", "Manx", "Marathi", "Marshallese",
        "Maltese", "Māori", "Moldovan", "Mongolian", "Nauruan", "Nepali", "Odia", "Palauan", "Pashto", "Persian", "Polish",
        "Portuguese", "Punjabi", "Quechua", "Romanian", "Russian", "Samoan", "Sardinian", "Scottish Gaelic", "Serbian", "Sesotho",
        "Shona", "Sinhalese", "Slovak", "Slovenian", "Spanish", "Sundanese", "Swahili", "Tagalog", "Tamil", "Tatar", "Telugu", "Thai",
        "Tibetan", "Tok Pisin", "Tongan", "Tswana", "Twi", "Turkish", "Ukrainian", "Urdu", "Vietnamese", "Welsh", "Wu Chinese",
        "Xhosa", "Yoruba", "Zulu"]




    const handleTextValueChange = (e) => {
        setTextValue(e.target.value)
    }
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const handleLanguageChange = (value) => {
        setSelectedLanguage(value);
    };
    const handleTranslate = async () => {
        if (textValue && selectedLanguage) {
            try {
                setStatus("🚀 Processing... Hang tight!");


                const res = await axios.post(`${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}${process.env.REACT_APP_API_1}`,
                    {
                        "input": {
                            "language": selectedLanguage,
                            "text": textValue
                        },
                        "config": {},
                        "kwargs": {}
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );


                if (res?.data?.output) {

                    const r = res?.data?.output?.search('</think>');
                    const r1 = res?.data?.output?.search('<think>')



                    let y, y1;
                    if (r !== -1 && r1 !== -1) {
                        y = res?.data?.output?.slice(r + 8);
                        y1 = res?.data?.output?.slice(r1 + 8, r)

                        setText(y);
                        setThink(y1)
                    }
                    else {
                        setText("Translation not available")
                        setThink("Think not available")
                    }
                }
                else {
                    setText("Translation not available")
                    setThink("Think not available")
                }



                setStatus("✅ Translation successful!");
            } catch (err) {
                console.error("Translation API Error:", err);
                setStatus("❌ Translation failed. Please try again.");
            }
        } else {
            setStatus("⚠️ Please enter both text and language to translate.");
        }
    };

    const handleClear = () => {
        setTextValue("")
        setText("")
        setSelectedLanguage(null)
        setThink("")
        setStatus("Cleared the entered text and selected language")
    }

    return (
        <div className='home_main'>
            <div className='home_head_text'>
                <p className='home_head_text_1'>🌍 AI-Powered Language Translator</p>
                <p className='home_head_text_2'>Instantly translate text into any language with the power of AI!</p>
            </div>
            <div className='home_works'>
                <p className='home_works_head'>How it works:</p>
                <div className='home_works_cont'>
                    <img src={languages} alt='upload-gif' className='home_upload_gif' />
                    <p className='home_works_text'>1. Select the preferred language in which you want to translate the entered text.</p>
                </div>
                <div className='home_works_cont' style={{ justifyContent: 'flex-end' }}>
                    <p className='home_works_text' style={{ width: '50%' }}>2. Enter the text which you want to translate.</p>
                    <img src={input} alt='upload-gif' className='home_results_gif' />
                </div>
                <div className='home_works_cont'>
                    <img src={translated} alt='upload-gif' className='home_text_gif' />
                    <p className='home_works_text'>3. Get the translated text in your preferred language. </p>
                </div>
            </div>
            <div className='home_started'>
                <p className='home_started_head_text'>Use Tool</p>
                <div className='home_sub_started_1'>
                    <div className='home_sub_started_1_inputs_div'>
                        <div className='home_sub_started_1_input'>
                            <p>Select the preferred Language</p>
                            <Select
                                allowClear
                                showSearch
                                placeholder="Please Select Language"
                                className="antd-select-dropdown"
                                style={{
                                    width: "500px",
                                    borderRadius: '8px',
                                    border: 'solid 1px #dcdcdc',
                                    outline: 'none',
                                    backgroundColor: '#fff',
                                    fontFamily: 'Inter',
                                    fontSize: '16px',
                                    fontWeight: 'normal',
                                    fontStretch: 'normal',
                                    fontStyle: 'normal',
                                    lineHeight: '1.38',
                                    letterSpacing: 'normal',
                                    textAlign: 'left',
                                    color: '#232b39',
                                    margin: '0px',
                                    height: '50px'
                                }}
                                dropdownStyle={{ zIndex: 1300 }}
                                notFoundContent={null}
                                options={languagesList.map((item) => ({
                                    value: item,
                                    label: item,
                                }))}
                                value={selectedLanguage}
                                onChange={handleLanguageChange}
                            />
                        </div>
                        <div className='home_sub_started_1_input'>
                            <p>Enter the text</p>
                            <input type='text' placeholder='Place enter the text' value={textValue} onChange={handleTextValueChange} />
                        </div>
                    </div>
                    <div className='home_started_buttons'>
                        <button type='button' className='home_started_btn translate' onClick={handleTranslate}>Translate Now!</button>
                        <button type='button' className='home_started_btn clear' onClick={handleClear}>Clear Text</button>
                    </div>
                    <div className='home_started_output'>
                        <p className='home_started_output_text_1'>Translated Text:</p>
                        <p className='home_started_output_text'>{text}</p>
                    </div>
                    <div className='home_started_output'>
                        <p className='home_started_output_text_1'>Think process:</p>
                        <p className='home_started_output_text'>{think}</p>
                    </div>
                    <p className='home_started_response_text'>{status}</p>
                </div>
            </div>
        </div>
    )
}
