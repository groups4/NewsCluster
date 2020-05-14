import React from "react";

const Section = ({ children }) => {
    return (
        <section
            // style={{
            //     margin: "20px 20px 20px 20px"
            // }}
            className="main-section"
        >
            {children}
        </section>
    );
};

export default Section;
