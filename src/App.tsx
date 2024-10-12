import { useState } from 'react';
import './App.css';

function App() {
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target.result;

      // Example conversion: Reverse the text content (replace with actual logic)
      const convertedContent = fileContent.split('').reverse().join('');

      // Create a Blob for the converted file
      const blob = new Blob([convertedContent], { type: 'text/plain' });

      // Create a URL for the Blob to use as a downloadable link
      setConvertedFile(URL.createObjectURL(blob));
    };

    reader.readAsText(file);  // Adjust this depending on the file type
  };

  return (
    <div className="container">
      <h1>File Converter</h1>
      <input type="file" onChange={handleFileUpload} accept=".txt" />
      {convertedFile && (
        <a href={convertedFile} download="converted_file.txt" className="download-btn">
          Download Converted File
        </a>
      )}
    </div>
  );
}

export default App;
