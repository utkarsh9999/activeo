import React, { useEffect, useState } from "react";

const VideoList = ({ videos }) => {
    const [videoUrls, set_videoUrls] = useState([]);

    useEffect(() => {
        set_videoUrls(videos);
        console.log("Loaded videos:", videos);
    }, [videos]);

    return (
       <>
       {videoUrls && videoUrls.map((video, idx) => (
            <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 flex flex-col items-center justify-center"
          >
            <div className="w-full">
              <video
                className="rounded-lg w-full h-auto"
                controls
                disablePictureInPicture
                controlsList="nodownload"
              >
                <source src={video.url || video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-3 text-sm text-gray-900 dark:text-white font-medium" style={{textAlign:"left"}}>
              {video.title  || `Video ${idx + 1}`}
            </p>
          </div>
          
        ))}
       </>
            
    );
};

export default VideoList;
