import React from "react";
import {Outlet} from "react-router";
import SideBar from "../sidebar/SideBar";

const AppLayout = () => {
    return <div style={{
        padding: '50px 0px 0px 370px'
    }}>
        <SideBar/>
        <Outlet/>
    </div>;

};

 export default AppLayout;