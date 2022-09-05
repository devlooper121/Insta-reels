// npm install react-router-dom@5.3.1
import "./App.css"
import Error from "./Components/Error/Error";
import Profile from "./Components/profile/Profile";
import Feed from "./Components/feed/Feed";
import ForgetPassword from "./Components/Forget/ForgetPassword";
import Login from "./Components/login/Login";
import Signup from "./Components/signup/Signup";

import {Switch, Route, Redirect} from "react-router-dom"

// for all page, user login and all global user controls
import { AuthContext, AuthContextProvider } from "./Context/AuthContext";
import { useContext } from "react";
import NewPost from "./Components/newPost/newpost";
import ProfileSetting from "./Components/profile/settings/Setting";


function App() {
  return (
    <AuthContextProvider>
    <Switch>
      {/* <Route path="/feed">
        <Feed></Feed>
      </Route> */}
      <PrivateRoute path="/feed" comp = {Feed} ></PrivateRoute>
      <PrivateRoute path="/new-post" comp = {NewPost} ></PrivateRoute>
      <PrivateRoute path="/setting" comp = {ProfileSetting} ></PrivateRoute>
      {/* <Route path="/profile">
        <Profile></Profile>
      </Route> */}

      <PrivateRoute path="/profile" comp = {Profile} ></PrivateRoute>
      
      <RedirectToFeed path="/login" comp = {Login} ></RedirectToFeed>
      {/* <RedirectToFeed path="/" comp = {Login} ></RedirectToFeed> */}

      {/* <Route path="/login">
        <Login></Login>
      </Route> */}

      <RedirectToFeed path="/signup" comp={Signup} ></RedirectToFeed>

      {/* <Route path="/signup">
        <Signup></Signup> 
      </Route> */}

      <RedirectToFeed path="/forget" comp={ForgetPassword}></RedirectToFeed>
      
      {/* <Route path="/forget">
        <ForgetPassword></ForgetPassword>
      </Route> */}
      <Route path="/" render={()=><Redirect to="/login"></Redirect>}></Route> 

      <Error></Error>
    </Switch>
    </AuthContextProvider>
  );
}
/**
 * PrivateRoute let only pass the routes if user is login
 * else we just forward to login
 */
function PrivateRoute(props){
  const Component = props.comp; // comp is defined by user wgich has the component name like Profile, Feed
  const {cUser} = useContext(AuthContext);
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

function RedirectToFeed(props){
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

export default App;
// G9l3sBpuZjOHt5QVkJafngRdjwo2