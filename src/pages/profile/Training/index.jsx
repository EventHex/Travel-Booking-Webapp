import React, { useState, useEffect } from "react";
import { Placeholder } from "../../../assets";
import instance from "../../../instance";

const VideoTutorials = () => {
  // const tutorials = [
  //   {
  //     id: 1,
  //     title: "How to apply for a visa?",
  //     thumbnail: "/api/placeholder/400/320",
  //     logo: "atlys",
  //     url: "business.atlys.com",
  //   },
  //   {
  //     id: 2,
  //     title: "How to load your wallet?",
  //     thumbnail: "/api/placeholder/400/320",
  //     logo: "atlys",
  //     url: "business.atlys.com",
  //   },
  //   {
  //     id: 3,
  //     title: "How to load your wallet?",
  //     thumbnail: "/api/placeholder/400/320",
  //     logo: "atlys",
  //     url: "business.atlys.com",
  //   },
  //   {
  //     id: 4,
  //     title: "How to load your wallet?",
  //     thumbnail: "/api/placeholder/400/320",
  //     logo: "atlys",
  //     url: "business.atlys.com",
  //   },
  //   {
  //     id: 5,
  //     title: "How to load your wallet?",
  //     thumbnail: "/api/placeholder/400/320",
  //     logo: "atlys",
  //     url: "business.atlys.com",
  //   },
  //   {
  //     id: 6,
  //     title: "How to load your wallet?",
  //     thumbnail: "/api/placeholder/400/320",
  //     logo: "atlys",
  //     url: "business.atlys.com",
  //   },
  // ];

  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      const response = await instance.get("/training");
      const data = await response.data;
      setTutorials(data?.response);
      console.log(data?.response);
    };
    fetchTutorials();
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full  mx-auto rounded-xl border border-gray-200 ">
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
      </div>
      <div className="flex justify-center flex-col md:flex-row mb-15 flex-wrap gap-4">
        {tutorials.map((tutorial) => (
          <div key={tutorial.id} className="flex flex-col">
            <div className="md:w-64 w-full flex flex-col justify-center items-center rounded-lg">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                {tutorial.title}
              </h3>
              <div className="border border-gray-200 rounded-lg">
                <img className="w-full" src={tutorial.thumbnail} alt="" />
                <iframe
                  width="100%"
                  height="200"
                  className="mt-2 rounded"
                  src={getYouTubeEmbedUrl(tutorial.videoUrl)}
                  title={tutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                {/* <div className="px-4 py-2 text-xs text-gray-600">
              Apply @{" "}
              <span className="text-indigo-600">{tutorial.videoUrl}</span>
            </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoTutorials;
