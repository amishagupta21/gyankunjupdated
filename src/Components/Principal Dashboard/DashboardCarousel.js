import React from "react";
import '../Styles/DashboardCarousel.css'
import DashboardImage1 from '../Images/DashboardImage1.png'
import { Button } from "react-bootstrap";

const DashboardCarousel = () => {
    return(
        <>
        <div className="dashboardImg">
            <img alt="dashboard image" src={DashboardImage1} />
        </div>
        </>
    )
}

export default DashboardCarousel