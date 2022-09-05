

const LoderProfile = () => {
    return (
        <div className="profile-box">
            <div className="profile-container">
                <div className="pimg-container">
                    <div className="img-box folder">
                        <p className="run"></p>
                    </div>
                </div>
                <div className="details">
                    <div className="content id setting folder"><p className="run"></p></div>
                    <div className="content post-array folder"><p className="run"></p></div>
                    <div className="content name folder"><p className="run"></p></div>
                    <div className="contact email folder"><p className="run"></p></div>
                </div>
            </div>
            <div className="user-post-list folder"><p className="run"></p>  
                <ul className="post-nav">
                    <li className="post-nav-btn"><span className="material-symbols-rounded small">
                        grid_on
                    </span>POSTS</li>
                    <li className="post-nav-btn"><span className="material-symbols-rounded small">
                        bookmark
                    </span>SAVED</li>
                </ul>
            </div>
            <div className="my-posts folder">
                <p className="run"></p>
            </div>
        </div>
    )
}

export default LoderProfile