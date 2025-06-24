import React, { useEffect, useState } from "react";

const VideoList = ( videoDirectoryUrls ) => {
    const [videoUrls,set_videoUrls]=useState([]);
    useEffect(() => {
        
      }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {/* {videoDirectoryUrls.map((video) => (
            <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{video.title}</h2>
            <video
                controls
                className="w-full h-48 rounded"
                src={video.url}
            >
                Your browser does not support the video tag.
            </video>
            </div>
        ))} */}
    </div>
  );
};

export default VideoList;
