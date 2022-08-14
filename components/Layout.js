import React from "react";

import Header from "./Header";

const Layout = props => {
    return (
        <div>
            <Header />
            {props.children}
            <h1> I am a footer </h1>
        </div>
    )
}

export default Layout;