export function captureSpeech() {
  return new Promise((resolve, reject) => {
    // In some browsers, SpeechRecognition has a webkit prefix
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    // Stop listening once a phrase has been recognized
    recognition.continuous = false;

    // When we receive a result, resolve the Promise
    recognition.addEventListener('result', (event) => {
      const message = event.results[0][0].transcript;
      resolve(message);
    });

    recognition.addEventListener('error', event => {
      reject(new Error('Failed to capture speech'));
    });

    // Start listening for speech
    recognition.start();
  });
}

export function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}
