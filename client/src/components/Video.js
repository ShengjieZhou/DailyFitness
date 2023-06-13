import React, {useState} from 'react';
import YouTube from 'react-youtube';
import Header from './Header';
import Sidebar from './Sidebar';
import '../stylesheets/video.css'


function Video() {
    const [selectedOption, setSelectedOption] = useState('');

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // 根据需要设置其他播放器参数
            autoplay: 1
        }
    };

    function getYouTubeVideoId(url) {
        // 匹配常见的YouTube视频URL格式
        const regExp = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([^\s&]+)/i;

        // 提取视频ID
        const match = url.match(regExp);

        if (match && match[1]) {
            return match[1];
        } else {
            // 如果无法提取视频ID，则返回null或执行其他错误处理逻辑
            return null;
        }
    }

    const handleOptionChange = (event) => {
        let topic = event.target.value;
        fetch('http://localhost:5000/api/video?topic=' + topic)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let length = data.length
                let random = Math.floor(Math.random() * length);
                setSelectedOption(data[random].value);
            })
            .catch(error => console.log(error));
        recordSearchHistory(selectedOption);
    };

    const recordSearchHistory = (data) => {
        const requestBody = {
            object: data,
            target: "Video"
        };
        fetch(`http://localhost:5000/api/diary/recordUserHistory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .catch(error => console.error(error))
    }

    return (
        <>
            <Header/>
            <div className="grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc">
                <Sidebar/>
                <main className="min-w-0 isolate">
                    <div className="pl-5 flex">
                        <div className="px-5 flex-1">
                            <h1 className="mdx-heading mt-0 mb-4 text-primary -mx-.5 break-words text-5xl font-bold">
                                Fitness Video
                            </h1>
                            <div className="max-w-4xl ml-0 2xl:mx-auto">
                                <p className="text-gray-3 text-xl">Please select a theme of your choice  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <select value={selectedOption} onChange={handleOptionChange}>
                                        <option value="">Click here to choose</option>
                                        <option value="arm">arm</option>
                                        <option value="leg">leg</option>
                                        <option value="body">body</option>
                                    </select>
                                </p>

                                {selectedOption && (
                                    <div>
                                        <YouTube videoId={getYouTubeVideoId(selectedOption)} opts={opts}/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Video;