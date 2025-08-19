import { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { fetchData } from "../../component/Api/axios";
import { Base_Url } from "../../component/Api/BaseUrl";
import { Summary_Middle_Point } from "../../component/Api/MiddlePoint";
import { Summary_Get_End_Point } from "../../component/Api/EndPoint";

const Summary = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0); 

  const getSummaries = async () => {
    try {
      const url = Base_Url + Summary_Middle_Point + Summary_Get_End_Point;
      const method = "GET";
      const response = await fetchData(url, method);

      if (response.status === 200) {
        setSummaries(response.data);
      } else {
        setError(response.data.error || "Failed to fetch summaries.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching summaries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSummaries();
  }, []);

  const handleNext = () => {
    if (currentPage < summaries.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const url = Base_Url + Summary_Middle_Point + Summary_Delete_End_Point.replace(":id", id);
  //     const method = "DELETE";
  //     const response = await fetchData(url, method);
  //     if (response.status === 200) {
  //       // remove from local state
  //       const newSummaries = summaries.filter((s) => s._id !== id);
  //       setSummaries(newSummaries);
  //       setCurrentPage((prev) => Math.min(prev, newSummaries.length - 1));
  //     } else {
  //       alert(response.data.error || "Failed to delete summary.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error deleting summary.");
  //   }
  // };

  if (loading) return <p className="mt-20 text-center">Loading summaries...</p>;
  if (error) return <p className="mt-20 text-center text-red-500">{error}</p>;
  if (summaries.length === 0) return <p className="mt-20 text-center">No summaries found.</p>;

  const summary = summaries[currentPage];

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center mt-2">Your Summaries</h1>

        <div className="p-4 border rounded shadow bg-gray-50">
          <h2 className="font-semibold mb-2">Original Text:</h2>
          <p className="mb-2">{summary.originalText}</p>

          <h2 className="font-semibold mb-2">Summary:</h2>
          <p>{summary.summarizedText}</p>

          <p className="text-sm text-gray-400 mt-2">
            Created at: {new Date(summary.createdAt).toLocaleString()}
          </p>

          <button
            className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            // onClick={() => handleDelete(summary._id)}
          >
            Delete
          </button>
        </div>

        <div className="flex gap-5 justify-center mt-4">
          <button
            className={`px-4 py-2 rounded ${currentPage === 0 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 mt-2">
            {currentPage + 1} of {summaries.length}
          </span>
          <button
            className={`px-4 py-2 rounded ${currentPage === summaries.length - 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            onClick={handleNext}
            disabled={currentPage === summaries.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Summary;
