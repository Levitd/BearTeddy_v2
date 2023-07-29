import React from "react";
import configFile from "../../../config.json";

const ImgFileld = ({ path, file, addClass }) => {
    return (
        <img src={configFile[path] + file} alt="file" className={addClass} />
    );
}

export default ImgFileld;
