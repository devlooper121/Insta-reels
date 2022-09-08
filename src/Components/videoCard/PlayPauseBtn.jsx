import styles from "./PlayPauseBtn.module.css"


const PlayPauseBtn = (props) => {
    let status = "volume_off";
    let btnClass = `${styles.btn} ${props.className}`
    if(props.status){
        status = "volume_off"
        btnClass = `${styles.btn} ${props.className}`
    }else{
        status = "volume_up"
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