import styles from "./PlayPauseBtn.module.css"


const PlayPauseBtn = (props) => {

    let status = "pause";
    let btnClass = `${styles.btn} ${props.className}`
    if(props.status){
        status = "pause"
        btnClass = `${styles.btn} ${props.className}`
    }else{
        status = "play_arrow"
        btnClass = `${styles.btn} ${props.className} ${styles.play}`
    }
    return (
        <div className={btnClass} onClick={props.onClick}>
            <span className="material-symbols-rounded">
                {status}
            </span>

        </div>
    )
}

export default PlayPauseBtn