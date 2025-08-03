import React, { useState } from 'react';
import Navbar from '../../component/Navbar/Navbar';

const ComponentLayout = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);


  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://router.huggingface.co/hf-inference/models/Falconsai/text_summarization',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: input,
          }),
        }
      );

      const data = await response.json();
      if (Array.isArray(data) && data[0]?.summary_text) {
        setOutput(data[0].summary_text);
      } else if (data?.error) {
        setOutput("Model is loading or error occurred: " + data.error);
      } else {
        setOutput("Unexpected response.");
      }
    } catch (error) {
      console.error(error);
      setOutput("An error occurred while summarizing.");
    }
    setLoading(false);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };


  return (
    <>
      <Navbar />
      <div className="w-full md:w-2/6 bg-gray-100 flex flex-col mx-auto p-4 mt-20 rounded shadow border border-gray-100">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Text Summarizer (Hugging Face)</h1>

        </div>

        <textarea
          rows="6"
          className="border p-2 w-full mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your long text here..."
        />
        <button
          className="w-1/4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>

        <div className="mt-4">
          <h2 className="font-semibold">Summary:</h2>
          <p>{output}</p>
        </div>

        <button
          className="w-1/4 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleClear}
          disabled={loading}
        >
          Clear
        </button>
      </div>
    </>
  );
};
export default ComponentLayout;
