import "./feed.css"
import { useState, useContext, useEffect } from "react";

import { VideoCard } from "../videoCard/videocard"
import { NavBar } from "../NavBar/NavBar"
import Loding from "../UI/loding";

import { AuthContext } from "../../Context/AuthContext";


// import {getAllDataByCollection} from "../functions/util"
import ConfirmButton from "../Bacdrop/ConfirmButton";

function Feed() {
    const [mute, setToMute] = useState(true);
    const {mainLoder, reelsData} = useContext(AuthContext);
    // const [reelsData, setReelsData] = useState([]);
    // useEffect(() => {
    //     (async()=>{
    //         const data = await getAllDataByCollection("reels");
    //         setReelsData(data)
    //     })()
    // },[])

    // console.log(onlineStatus);
    return (
            <>
            
            <NavBar></NavBar>
            {mainLoder ? <Loding/> : 
            <div className="mainContainer">
                {reelsData && reelsData.map(reelsData => {
                    return <VideoCard
                        key={reelsData.id}
                        data={reelsData.data}
                        id={reelsData.id}
                        mute={mute}
                        setToMute={setToMute}
                    ></VideoCard>
                })}
            </div>}
            
            </>
    )
}




export default Feed