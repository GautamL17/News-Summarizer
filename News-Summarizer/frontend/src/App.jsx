import React, { useState, useEffect } from "react";
import axios from "axios";
import TextToSpeech from "./components/TextToSpeech";

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("technology");
  const [country, setCountry] = useState("us");
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current news index

  // Fetch news from backend
  const fetchNews = () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/summary?category=${category}&country=${country}`)
      .then((response) => {
        setNews(response.data);
        setCurrentIndex(0); // Reset to first article
      })
      .catch((error) => console.error("Error fetching news:", error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Navigation functions
  const prevNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? news.length - 1 : prevIndex - 1));
  };

  const nextNews = () => {
    setCurrentIndex((prevIndex) => (prevIndex === news.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="w-[95%] mx-auto text-white">
      <h1 className="text-center my-5 font-mono text-3xl text-zinc-200">
        News Summarizer
      </h1>

      {/* Category Selection */}
      <div className="flex justify-between items-center mb-5">
        <div className="ml-10 flex gap-5 items-center">
          <div className=" bg-red-400 py-1 px-2 rounded-lg">
            <label>Category:</label>
            <select className="text-white focus:outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option className='text-black' value="technology">Technology</option>
              <option className='text-black' value="sports">Sports</option>
              <option className='text-black' value="business">Business</option>
              <option className='text-black' value="health">Health</option>
              <option className='text-black' value="entertainment">Entertainment</option>
            </select>
          </div>
        </div>
        <button className="bg-white text-black rounded-md px-2 py-1 cursor-pointer" onClick={fetchNews}>
          Get News
        </button>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-400"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
        </div>
      ) : (
        news.length > 0 && (
          <div className="relative w-[100%] mx-auto mb-3 rounded-lg p-5">

            <div className="relative w-[90%] h-[500px]  mx-auto mb-3 rounded-lg px-5 flex items-center justify-between">
              {/* Left Button */}
              <button
                className="bg-white text-black px-4 mx-3 py-2 rounded-md hover:bg-red-400 hover:text-white cursor-pointer"
                onClick={prevNews}
              >
                Prev
              </button>

              {/* News Content */}
              <div className="text-center flex-grow w-[80%] border-2 py-5 rounded-lg border-zinc-700 ">
                <a className='my-5' href={news[currentIndex].url} target="_blank" rel="noopener noreferrer">
                  <h2 className="text-xl font-bold">{news[currentIndex].title}</h2>
                  <p>{news[currentIndex].source.name}</p>
                  <p className="">{news[currentIndex].summary}</p>
                </a>
                  <TextToSpeech text={news[currentIndex].summary} />
              </div>

              {/* Right Button */}
              <button
                className="bg-white text-black mx-3 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white cursor-pointer"
                onClick={nextNews}
              >
                Next
              </button>
            </div>

          </div>
        )
      )}
    </div>
  );
}

export default App;
