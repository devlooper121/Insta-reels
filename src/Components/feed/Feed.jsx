import "./feed.css"
import { useState, useContext } from "react";

import { VideoCard } from "../videoCard/videocard"
import { NavBar } from "../NavBar/NavBar"



import Button from "../UI/Button"
import { AuthContext } from "../../Context/AuthContext";

function Feed() {
    const { reelsData } = useContext(AuthContext);

    return (
        <>
            <NavBar></NavBar>

            <div className="mainContainer">
                {reelsData && reelsData.map(selectedVideo => {
                    return <VideoCard
                        key={selectedVideo.key}
                        url={selectedVideo.value.url}
                        title={"unknown"}
                        likes={selectedVideo.value.likes}
                        comments={selectedVideo.value.comments}
                        uid={selectedVideo.value.uid}
                        id={selectedVideo.key}
                    ></VideoCard>
                })}
            </div>
        </>
    )
}




export default Feed