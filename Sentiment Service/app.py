from flask import Flask, request, jsonify
from emotion_recognition import detect_emotion  # Example function for emotion detection

app = Flask(__name__)

def detect_emotion(audio):
    # Function to detect emotion from audio file using dl model's h5 file
    return 'neutral'

@app.route('/emotion-detection', methods=['POST'])
def emotion_detection():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    # Assuming emotion_recognition.detect_emotion takes the audio file and returns an emotion
    emotion = detect_emotion(audio_file)
    
    return jsonify({'emotion': emotion})

if __name__ == '__main__':
    app.run(debug=True)
