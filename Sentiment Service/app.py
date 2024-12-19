from flask import Flask, request, jsonify
import speech_recognition as sr
import os

app = Flask(__name__)

# Route to handle audio file upload and transcription
@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']

    try:
        # Save the uploaded audio file temporarily
        temp_folder = "temp"
        if not os.path.exists(temp_folder):
            os.makedirs(temp_folder)  # Ensure temp folder exists

        audio_file_path = os.path.join(temp_folder, audio_file.filename)
        audio_file.save(audio_file_path)

        # Initialize recognizer
        recognizer = sr.Recognizer()

        # Load the audio file
        with sr.AudioFile(audio_file_path) as source:
            audio_data = recognizer.record(source)

        # Perform speech recognition
        text = recognizer.recognize_google(audio_data)

        # Clean up: Remove the temporary audio file
        os.remove(audio_file_path)

        # Optionally remove the temp folder if it's empty
        if not os.listdir(temp_folder):  # Check if folder is empty
            os.rmdir(temp_folder)

        # Return the transcription result
        return jsonify({'transcription': text})

    except Exception as e:
        # Clean up in case of an error
        if os.path.exists(audio_file_path):
            os.remove(audio_file_path)
        if os.path.exists(temp_folder) and not os.listdir(temp_folder):
            os.rmdir(temp_folder)  # Remove temp folder if empty
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
