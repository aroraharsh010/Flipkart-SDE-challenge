import React, { Component } from "react";
import axios from 'axios';
import { NavLink, Link } from "react-router-dom";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      invoices: [],
    };

    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    const jwt = localStorage.getItem("jwt");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!jwt || !user) {
      this.props.history.push("/login");
    } else {
      this.setState({
        user: user,
      });
    }
    const proxyurl = "https://cors-anywhere.herokuapp.com/";// To get around CORS
    const url = "https://flipkart-sde.herokuapp.com/invoice";
    axios.get(
      proxyurl + url, {
        headers: {
          authorization: `bearer ${jwt}`
        }
      }
    ).then(res=>this.setState({ user, invoices: res.data.invoices }))
     .catch(e=>console.log({e}));
  }

  logout(){
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    this.props.history.push("/login");
  }


  render() {
    console.log(this.state.invoices)
    return (
      <div className="dashboard-main-wrapper">
        <div className="dashboard-header">
          <nav className="navbar navbar-expand-lg bg-white fixed-top">
            <NavLink className="navbar-brand" to="/">
              Dashboard
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto navbar-right-top">
                <li className="nav-item dropdown nav-user">
                  <div
                    className="nav-link nav-user-img"
                    id="navbarDropdownMenuLink2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="assets/images/avatar-1.jpg"
                      alt=""
                      class="user-avatar-md rounded-circle"
                    ></img>
                  </div>
                  <div
                    className="dropdown-menu dropdown-menu-right nav-user-dropdown"
                    aria-labelledby="navbarDropdownMenuLink2"
                  >
                    <div className="nav-user-info">
                      <h5 className="mb-0 text-white nav-user-name">
                        {this.state.user.name}
                      </h5>
                      <span className="status"></span>
                      <span class="ml-2">Available</span>
                    </div>
                    <Link className="dropdown-item" to="/notfound">
                      <i className="fas fa-user mr-2"></i>Account
                    </Link>
                    <Link className="dropdown-item" onClick={this.logout}>
                      <i className="fas fa-power-off mr-2"></i>Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div class="dashboard-ecommerce">
          <div class="container-fluid dashboard-content ">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="page-header">
                  <h2 class="pageheader-title">Invoice Dashboard</h2>
                  <p class="pageheader-text">
                    Watch invoices from different vendors here.
                  </p>
                  <div class="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <Link to="/" class="breadcrumb-link">
                            Dashboard
                          </Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          Invoice Dashboard
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div class="ecommerce-widget">
              <div class="row">
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-muted">Total Pending</h5>
                      <div class="metric-value d-inline-block">
                        <h1 class="mb-1">₹156146</h1>
                      </div>
                      <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span>
                          <i class="fa fa-fw fa-arrow-up"></i>
                        </span>
                        <span>5.86%</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue"></div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-muted">All outgoing</h5>
                      <div class="metric-value d-inline-block">
                        <h1 class="mb-1">₹156146</h1>
                      </div>
                      <div class="metric-label d-inline-block float-right text-success font-weight-bold">
                        <span>
                          <i class="fa fa-fw fa-arrow-up"></i>
                        </span>
                        <span>5.86%</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue2"></div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-muted">Refunds</h5>
                      <div class="metric-value d-inline-block">
                        <h1 class="mb-1">0.00</h1>
                      </div>
                      <div class="metric-label d-inline-block float-right text-primary font-weight-bold">
                        <span>N/A</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue3"></div>
                  </div>
                </div>
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="text-muted">Avg. Cost Per Vendor</h5>
                      <div class="metric-value d-inline-block">
                        <h1 class="mb-1">₹156146</h1>
                      </div>
                      <div class="metric-label d-inline-block float-right text-secondary font-weight-bold">
                        <span>-2.00%</span>
                      </div>
                    </div>
                    <div id="sparkline-revenue4"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                {/* <!-- ============================================================== -->

                            <!-- ============================================================== -->

                                          <!-- recent invoices  -->
                            <!-- ============================================================== --> */}
                <div class="col-xl-9 col-lg-12 col-md-6 col-sm-12 col-12">
                  <div class="card">
                    <h5 class="card-header">Recent Invoices</h5>
                    <div class="card-body p-0">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class="bg-light">
                            <tr class="border-0">
                              <th class="border-0">#</th>
                              {/* <th class="border-0">Image</th> */}
                              <th class="border-0">Company Name</th>
                              <th class="border-0">Company GST</th>
                              <th class="border-0">Company Email</th>
                              <th class="border-0">Invoice Number</th>
                              <th class="border-0">Amount</th>
                              <th class="border-0">Date</th>
                              <th class="border-0">Status</th>
                              <th class="border-0">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.invoices.map((invoice, index) => (
                              <tr key={index.toString()}>
                                <td>{index+ 1}</td>
                              <td>
                              {invoice.cName}
                              </td>
                              <td>{invoice.cGstIn}</td>
                              <td>{invoice.cEmail}</td>
                              <td>{invoice.invoice_number}</td>
                                <td>₹{invoice.amount}</td>
                                <td>{invoice.date}</td>
                              <td>
                                <span class="badge-dot badge-brand mr-1"></span>
                                {invoice.status}
                              </td>
                              <td><NavLink to={{pathname: "/invoice", aboutProps:{invoice}}} className="btn btn-light">View</NavLink></td>
                            </tr>
                            ) )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- ============================================================== -->
                            <!-- end recent orders  -->


                            <!-- ============================================================== -->
                            <!-- ============================================================== -->
                            <!-- customer acquistion  -->
                            <!-- ============================================================== --> */}
                <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                  <div class="card">
                    <h5 class="card-header">Vendor Stats</h5>
                    <div class="card-body">
                      <div class="ct-chart ct-golden-section"></div>
                      <div class="text-center">
                        <span class="legend-item mr-2">
                          <span class="fa-xs text-primary mr-1 legend-tile">
                            <i class="fa fa-fw fa-square-full"></i>
                          </span>
                          <span class="legend-text">Returning</span>
                        </span>
                        <span class="legend-item mr-2">
                          <span class="fa-xs text-secondary mr-1 legend-tile">
                            <i class="fa fa-fw fa-square-full"></i>
                          </span>
                          <span class="legend-text">First Time</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- ============================================================== -->
                            <!-- end customer acquistion  -->
                            <!-- ============================================================== --> */}
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

              </div>
              <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
