import styls from "./circleSpinner.module.css"
const Spinner = (props) => {
    
    return(
        <div id={styls.loderContainer}>
            <div id={styls.c1} className={props.className}>
                <div id={styls.c2}></div>
            </div>
        </div>
    )
}

export default Spinner;