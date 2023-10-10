import React from "react";

import {
  AiFillCloseCircle,
  AiFillPlayCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCaretLeft,
  AiOutlineCaretRight,
  AiOutlineDownload,
} from "react-icons/ai";

export default function ImageGallery() {
  const [videos, setVideos] = React.useState([
    {
      id: 1,
      thumbnail: "https://i.ytimg.com/vi/L0DWAVbdEaM/oar2.jpg",
      title:
        "React Most Asked Interview Question pt1 😎  #short #shorts #javascript  #react #developer #interview",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-1.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "1.1M",
      likes: "102K",
      comments: "5K",
    },
    {
      id: 2,
      thumbnail:
        "https://i.ytimg.com/vi/JoqjbkSTz9Y/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLC49JBRUdw973_ouyYaIubA1zQ8Zg",
      title: "Top 3 reasons why you should learn React Native",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-2.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "5M",
      likes: "100K",
      comments: "5K",
    },
    {
      id: 3,
      thumbnail:
        "https://i.ytimg.com/vi/LwCuRdhn6VM/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLB-t3FXxSlJ8VE3aWlUGoAvfcqQtw",
      title: "Why is coding so hard",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-3.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "360K",
      likes: "50K",
      comments: "5K",
    },
    {
      id: 4,
      thumbnail: "https://i.ytimg.com/vi/L0DWAVbdEaM/oar2.jpg",
      title:
        "React Most Asked Interview Question pt1 😎  #short #shorts #javascript  #react #developer #interview",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-1.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "1.1M",
      likes: "102K",
      comments: "5K",
    },
    {
      id: 5,
      thumbnail:
        "https://i.ytimg.com/vi/JoqjbkSTz9Y/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLC49JBRUdw973_ouyYaIubA1zQ8Zg",
      title: "Top 3 reasons why you should learn React Native",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-2.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "5M",
      likes: "100K",
      comments: "5K",
    },
    {
      id: 6,
      thumbnail:
        "https://i.ytimg.com/vi/LwCuRdhn6VM/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLB-t3FXxSlJ8VE3aWlUGoAvfcqQtw",
      title: "Why is coding so hard",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-3.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "360K",
      likes: "50K",
      comments: "5K",
    },
    {
      id: 1,
      thumbnail: "https://i.ytimg.com/vi/L0DWAVbdEaM/oar2.jpg",
      title:
        "React Most Asked Interview Question pt1 😎  #short #shorts #javascript  #react #developer #interview",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-1.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "1.1M",
      likes: "102K",
      comments: "5K",
    },
    {
      id: 2,
      thumbnail:
        "https://i.ytimg.com/vi/JoqjbkSTz9Y/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLC49JBRUdw973_ouyYaIubA1zQ8Zg",
      title: "Top 3 reasons why you should learn React Native",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-2.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "5M",
      likes: "100K",
      comments: "5K",
    },
    {
      id: 3,
      thumbnail:
        "https://i.ytimg.com/vi/LwCuRdhn6VM/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLB-t3FXxSlJ8VE3aWlUGoAvfcqQtw",
      title: "Why is coding so hard",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-3.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "360K",
      likes: "50K",
      comments: "5K",
    },
    {
      id: 4,
      thumbnail: "https://i.ytimg.com/vi/L0DWAVbdEaM/oar2.jpg",
      title:
        "React Most Asked Interview Question pt1 😎  #short #shorts #javascript  #react #developer #interview",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-1.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "1.1M",
      likes: "102K",
      comments: "5K",
    },
    {
      id: 5,
      thumbnail:
        "https://i.ytimg.com/vi/JoqjbkSTz9Y/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLC49JBRUdw973_ouyYaIubA1zQ8Zg",
      title: "Top 3 reasons why you should learn React Native",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-2.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "5M",
      likes: "100K",
      comments: "5K",
    },
    {
      id: 6,
      thumbnail:
        "https://i.ytimg.com/vi/LwCuRdhn6VM/hq720_2.jpg?sqp=-oaymwEdCI4CEOADSEbyq4qpAw8IARUAAIhCcAHAAQbQAQE=&rs=AOn4CLB-t3FXxSlJ8VE3aWlUGoAvfcqQtw",
      title: "Why is coding so hard",
      userImage:
        "https://yt3.ggpht.com/ytc/APkrFKb9C3tH3-oPLS0gcyRXAJZpTSvuxtVznsRtqzEUHA=s88-c-k-c0x00ffffff-no-rj",
      userName: "developers",
      videoUrl: "/video-3.mp4",
      youtubeUrl: "https://m.youtube.com/shorts/L0DWAVbdEaM",
      views: "360K",
      likes: "50K",
      comments: "5K",
    },
  ]);

  const [activeVideo, setActiveVideo] = React.useState(false);

  return (
    <div className="mt-2 lg:mt-5 container mx-auto px-2 lg:px-5">
      <div className="flex items-center">
        <AiFillPlayCircle className="text-xl" />
        <h1 className="font-bold text-lg px-2">Shorts</h1>
      </div>
      <div className="mt-2 flex flex-wrap">
        {activeVideo ? (
          <div className="bg-black fixed z-50 inset-0 bg-opacity-75 flex justify-center items-center">
            <div className="p-10 flex flex-col lg:flex-row items-center lg:items-start">
              <div className="order-2 flex lg:flex-col">
                <button
                  className="flex flex-col justify-center items-center p-2 text-xs"
                  onClick={() => {
                    setActiveVideo(false);
                  }}
                >
                  <div className="bg-zinc-800 p-3 rounded-full">
                    <AiFillCloseCircle className="text-2xl" />
                  </div>
                  <p className="font-bold">Close</p>
                </button>
                <button
                  className="flex flex-col justify-center items-center p-2 text-xs"
                  onClick={() => {
                    if (
                      videos.find(
                        (e, i) =>
                          i ===
                          videos.findIndex((e) => e.id === activeVideo.id) - 1
                      )
                    )
                      setActiveVideo(
                        videos.find(
                          (e, i) =>
                            i ===
                            videos.findIndex((e) => e.id === activeVideo.id) - 1
                        )
                      );
                  }}
                  style={{
                    opacity:
                      videos.findIndex((e) => e.id === activeVideo.id) === 0
                        ? 0.5
                        : 1,
                  }}
                >
                  <div className="bg-zinc-800 p-3 rounded-full">
                    <AiOutlineArrowUp className="text-2xl" />
                  </div>
                  <p className="font-bold">Prev</p>
                </button>
                <button
                  className="flex flex-col justify-center items-center p-2 text-xs"
                  onClick={() => {
                    if (
                      videos.find(
                        (e, i) =>
                          i ===
                          videos.findIndex((e) => e.id === activeVideo.id) + 1
                      )
                    )
                      setActiveVideo(
                        videos.find(
                          (e, i) =>
                            i ===
                            videos.findIndex((e) => e.id === activeVideo.id) + 1
                        )
                      );
                  }}
                  style={{
                    opacity:
                      videos.findIndex((e) => e.id === activeVideo.id) ===
                      videos.length - 1
                        ? 0.5
                        : 1,
                  }}
                >
                  <div className="bg-zinc-800 p-3 rounded-full">
                    <AiOutlineArrowDown className="text-2xl" />
                  </div>
                  <p className="font-bold">Next</p>
                </button>
                <a
                  href={activeVideo.videoUrl}
                  download={true}
                  className="flex flex-col justify-center items-center p-2 text-xs"
                >
                  <div className="bg-zinc-800 p-3 rounded-full">
                    <AiOutlineDownload className="text-2xl" />
                  </div>
                  <p className="font-bold">Download</p>
                </a>
              </div>
              <div
                className="relative h-[70vh] lg:h-[550px] border-zinc-200 bg-white overflow-hidden rounded-md"
                style={{
                  aspectRatio: 9 / 16,
                }}
              >
                <video
                  controls={false}
                  loop
                  autoPlay
                  className="bg-zinc-800 absolute h-full w-full object-cover"
                  src={activeVideo.videoUrl}
                />
                <div className="absolute h-full w-full bg-gradient-to-b from-transparent to-black opacity-75"></div>
                <div className="absolute p-2 bottom-0 left-0 right-0">
                  <h1 className="text-xs mb-2">{activeVideo.title}</h1>
                  <div className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover mr-2"
                      src={activeVideo.userImage}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-sm">
                        @{activeVideo.userName}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {videos?.map((e) => (
          <button
            onClick={() => {
              setActiveVideo(e);
            }}
            key={e.id}
            className="hover:bg-zinc-800 rounded-md w-1/2 lg:w-1/4 p-1 lg:p-2 mb-3"
          >
            <img
              className="w-full rounded-md object-cover"
              style={{
                aspectRatio: 9 / 16,
              }}
              src={e.thumbnail}
              alt=""
            />
            <div className="mt-3 flex flex-col items-start w-full overflow-hidden">
              <p className="font-bold text-xs text-left truncate w-full">
                {e.title}
              </p>
              <p className="opacity-75 text-xs">{e.views} Views</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
