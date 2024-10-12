import { useState } from 'react';
import './App.css';

function App() {
  // State for holding the converted file URL
  const [convertedFile, setConvertedFile] = useState<string | null>(null);

  // Handle file upload event with the correct type
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];  // Check for files array and get the first file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const fileContent = e.target?.result;  // Ensure result is not null
      if (typeof fileContent === 'string') {
        // Example conversion: Reverse the text content
        const convertedContent = fileContent.split('').reverse().join('');

        // Create a Blob for the converted file
        const blob = new Blob([convertedContent], { type: 'text/plain' });

        // Create a URL for the Blob to use as a downloadable link
        setConvertedFile(URL.createObjectURL(blob));
      }
    };

    reader.readAsText(file);  // Assuming you're working with a text file
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
