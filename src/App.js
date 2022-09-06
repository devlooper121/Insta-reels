// npm install react-router-dom@5.3.1
import "./App.css"
import Profile from "./Components/profile/Profile";
import Feed from "./Components/feed/Feed";
import NewPost from "./Components/newPost/newpost";
import ProfileSetting from "./Components/profile/settings/Setting";
import {Switch, Route, Redirect} from "react-router-dom"

import ForgetPassword from "./Components/Forget/ForgetPassword";
import Login from "./Components/login/Login";
import Signup from "./Components/signup/Signup";
import Error from "./Components/Error/Error";

// for all page, user login and all global user controls
import {AuthContextProvider } from "./Context/AuthContext";

import {PrivateRoute, RedirectToFeed} from "./Routes/CustomRoutes"

function App() {
  return (
    <AuthContextProvider>
    <Switch>

      <PrivateRoute path="/feed" comp = {Feed} ></PrivateRoute>
      <PrivateRoute path="/new-post" comp = {NewPost} ></PrivateRoute>
      <PrivateRoute path="/setting" comp = {ProfileSetting} ></PrivateRoute>

      <PrivateRoute path="/profile" comp = {Profile} ></PrivateRoute>

      <RedirectToFeed path="/forget" comp={ForgetPassword}></RedirectToFeed>
      
      <RedirectToFeed path="/login" comp = {Login} ></RedirectToFeed>
 
      <RedirectToFeed path="/signup" comp={Signup} ></RedirectToFeed>

    
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

export default App;
// G9l3sBpuZjOHt5QVkJafngRdjwo2