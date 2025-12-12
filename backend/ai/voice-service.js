// backend/ai/voice-service.js

import axios from "axios";
import FormData from "form-data";
import { Readable } from 'stream';

// Uses the same key as OpenRouter for convenience, which is already set up in index.js
const OPENAI_API_KEY = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY; 

if (!OPENAI_API_KEY) {
    console.warn("⚠️ OPENAI_API_KEY is not set for voice service.");
}

/**
 * Converts audio to text using OpenAI's Whisper API.
 * @param {Buffer} audioBuffer - The audio file buffer from the user.
 * @param {string} mimeType - The MIME type of the audio (e.g., 'audio/webm').
 * @returns {Promise<string>} The transcribed text.
 */
async function transcribeAudio(audioBuffer, mimeType) {
    if (!OPENAI_API_KEY) throw new Error("OpenAI API Key is missing.");

    const formData = new FormData();
    
    // Create a readable stream from the buffer
    const audioStream = Readable.from(audioBuffer);
    
    formData.append('file', audioStream, {
        filename: 'audio_input.webm', 
        contentType: mimeType,
        knownLength: audioBuffer.length,
    });
    formData.append('model', 'whisper-1');
    formData.append('language', 'hi'); // Hint for Hindi/English mix support
    
    try {
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
        });

        return response.data.text;
    } catch (error) {
        const errorDetails = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error("OpenAI Whisper API Error:", errorDetails);
        throw new Error(`Failed to transcribe audio. Details: ${errorDetails}`);
    }
}

/**
 * Converts text to speech using OpenAI's TTS API.
 * @param {string} text - The text to synthesize.
 * @returns {Promise<Buffer>} The MP3 audio file buffer.
 */
async function synthesizeSpeech(text) {
    if (!OPENAI_API_KEY) throw new Error("OpenAI API Key is missing.");

    try {
        const response = await axios.post('https://api.openai.com/v1/audio/speech', {
            model: 'tts-1', // High quality TTS model
            input: text,
            voice: 'nova', // A helpful female voice
            response_format: 'mp3',
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            responseType: 'arraybuffer', // Get binary data
        });

        return Buffer.from(response.data);
    } catch (error) {
        const errorDetails = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error("OpenAI TTS API Error:", errorDetails);
        throw new Error(`Failed to synthesize speech. Details: ${errorDetails}`);
    }
}

export { transcribeAudio, synthesizeSpeech };