import styles from "./backdrop.module.css"


export const Backdrop1 = (props) => {
    return <div className={styles.bc1} onClick={props.onClick} style={{zIndex:props.z}}>
        {props.children}
    </div>
}

export const BackDrop2 = (props) => {
    return <div className={styles.bc2}>
        <button onClick={props.onClick} className={styles.btnClose} style={{zIndex:props.z}}><span className="material-symbols-rounded">
            close
        </span></button>
        {props.children}
    </div>
}