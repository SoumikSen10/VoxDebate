from flask import Flask, request, jsonify
import speech_recognition as sr
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-pro")

app = Flask(__name__)

# Store conversation history in memory
conversation_history = []

# Helper function to preprocess user prompts
def preprocess_prompt(prompt):
    """
    Clean and format the user input to make it debate-focused.
    """
    prompt = prompt.strip()  # Remove leading/trailing whitespace
    if not prompt.endswith('?'):
        prompt += '?'  # Ensure the prompt ends with a question for debates
    return prompt

# Helper function to filter AI responses and make them concise
def filter_response(response_text):
    """
    Filter the AI response to remove unnecessary decorations and ensure conciseness.
    """
    response = response_text.strip()  # Remove leading/trailing whitespace
    response = response.replace("**", "").replace("*", "")  # Remove markdown decorations
    return response  # Do not truncate unless necessary

# Function to summarize older history if it gets too long
def summarize_history(history):
    if len(history) > 10:
        summarized = "Summary of earlier discussion: " + " ".join(history[:-10])
        return [summarized] + history[-10:]
    return history

# Function to get Gemini response with context
def get_gemini_response(question):
    global conversation_history
    try:
        # Add the user's question to the history
        conversation_history.append(f"User: {question}")
        
        # Summarize older history if needed
        conversation_history = summarize_history(conversation_history)
        
        # Build the context from the conversation history
        context = "\n".join(conversation_history)
        
        # Adjust prompt to focus on debate and conciseness
        prompt = (
            f"Let's debate. The response should be short and precise. Respond with direct counter-argument."
            f"Here is the conversation so far:\n{context}\n"
            f"User: {question}\n"
            f"AI:"
        )
        
        # Log the context for debugging
        print("Context sent to Gemini:", context)
        
        # Generate the response
        raw_response = model.generate_content(prompt)
        
        # Log the raw response for debugging
        print("Raw Response:", raw_response.text)
        
        # Filter and return the response
        ai_response = filter_response(raw_response.text)
        
        # Add the AI's response to the history
        conversation_history.append(f"AI: {ai_response}")
        
        return ai_response
    except Exception as e:
        return f"Error generating response: {str(e)}"

# Route to handle audio file upload and transcription
@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    try:
        # Save the uploaded audio file temporarily
        temp_folder = "temp"
        os.makedirs(temp_folder, exist_ok=True)
        audio_file_path = os.path.join(temp_folder, audio_file.filename)
        audio_file.save(audio_file_path)

        # Initialize recognizer
        recognizer = sr.Recognizer()

        # Load the audio file
        with sr.AudioFile(audio_file_path) as source:
            audio_data = recognizer.record(source)

        # Perform speech recognition
        user_text = recognizer.recognize_google(audio_data)

        # Clean up temporary files
        os.remove(audio_file_path)
        if not os.listdir(temp_folder):
            os.rmdir(temp_folder)

        # Get AI response
        ai_response = get_gemini_response(user_text)

        # Return transcription and AI response
        return jsonify({'transcription': user_text, 'reply': ai_response})

    except Exception as e:
        # Clean up in case of an error
        if os.path.exists(audio_file_path):
            os.remove(audio_file_path)
        if os.path.exists(temp_folder) and not os.listdir(temp_folder):
            os.rmdir(temp_folder)
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
