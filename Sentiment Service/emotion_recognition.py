import numpy as np

def detect_emotion(text):
    detected_emotion = SentimentAnalysis(text)
    return detected_emotion if detected_emotion else "neutral"
