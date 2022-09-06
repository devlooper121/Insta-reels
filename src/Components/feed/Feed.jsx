import "./feed.css"
import { useState, useContext, useEffect } from "react";

import { VideoCard } from "../videoCard/videocard"
import { NavBar } from "../NavBar/NavBar"
import Loding from "../UI/loding";

import { AuthContext } from "../../Context/AuthContext";


import {getAllDataByCollection} from "../functions/util"

function Feed() {
    const {mainLoder} = useContext(AuthContext);
    const [reelsData, setReelsData] = useState([]);
    useEffect(() => {
        (async()=>{
            const data = await getAllDataByCollection("reels");
            setReelsData(data)
        })()
    },[])
    return (
        <>
            <NavBar></NavBar>

            {mainLoder ? <Loding/> : <div className="mainContainer">
                {reelsData && reelsData.map(reelsData => {
                    return <VideoCard
                        key={reelsData.id}
                        title={"unknown"}
                        data={reelsData.data}
                        id={reelsData.id}
                    ></VideoCard>
                })}
            </div>}
        </>
    )
}




export default Feed