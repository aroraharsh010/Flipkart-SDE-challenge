import React from 'react';
import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div class="dashboard-main-wrapper p-0">
    <nav class="navbar navbar-expand dashboard-top-header bg-white">
        <div class="container-fluid">
            <div class="dashboard-nav-brand">
                <a class="dashboard-logo" href="../index.html">Concept</a>
            </div>
        </div>
    </nav>
    <div class="bg-light text-center">
        <div class="container">
            <div class="row">
                <div class="offset-xl-2 col-xl-8 offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                    <div class="error-section">
                        {/* <img src="../assets/images/error-img.png" alt="" class="img-fluid"></img> */}
                        <div class="error-section-content">
                            <h1 class="display-3">Page Not Found</h1>
                            <p> The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                            <NavLink className="btn btn-secondary btn-lg" to="/">
                            Back to homepage
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-white p-3">
            <div class="container-fluid">
                <div class="row">

                </div>
            </div>
        </div>

    </div>
</div>
// <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
// <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>
// <script src="../assets/vendor/slimscroll/jquery.slimscroll.js"></script>
// <script src="../assets/libs/js/main-js.js"></script>
);
}

export default NotFound;