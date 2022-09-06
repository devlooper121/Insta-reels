import {Route, Redirect} from "react-router-dom"
import { AuthContext} from "../Context/AuthContext";
import { useContext } from "react";

export const PrivateRoute = (props) => {
    const Component = props.comp; // comp is defined by user wgich has the component name like Profile, Feed
    const {cUser} = useContext(AuthContext);
    console.log("from private",cUser);
    return(
      // ...propes make sure every prop property is passed to whoever is selected
      <Route
      {...props} 
      render={
        ()=>{
          
          return cUser!=null ? <Component/> : <Redirect to="/login"></Redirect>
        }
      }>
      </Route>
    )
  }
  
export const RedirectToFeed = (props)=>{
    const {cUser} = useContext(AuthContext);
    const Component = props.comp;
    // cUser--> null ? login: send to feed
    return (
      <Route {...props} 
      render={
        ()=>{
          return cUser === null ? <Component {...props} ></Component> : <Redirect {...props} to="/feed" ></Redirect>
        }
      } ></Route>
    )
  }