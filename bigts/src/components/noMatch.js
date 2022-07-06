import React from "react";
import { Link } from "react-router-dom";

function noMatch() {
    return (
        <div className="row">
            <Link to="/signin" className="active">
                <img
                    className="col s12 dead-link"
                    src="../images/dead-link.png"
                    alt="Dead Link"
                    href="/signin"
                />
            </Link>
        </div>
    );
};

export default noMatch;