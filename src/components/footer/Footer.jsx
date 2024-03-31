import React from "react";
import logo from "../navbar/logo.png";
function Footer() {
  return (
    <footer className="  text-center text-lg-start pt-4 border-top border-dark">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-12 mb-4 mb-md-0">
            <img
              src={logo}
              alt="Bootstrap"
              width={250}
              className="d-inline-block align-text-top "
            />
            <p className="fs-6">
              <strong>ADDRESS: </strong>28 White tower, Street Name New York
              City, USA
            </p>
            <p className="fs-6">
              <strong>TELEPHONE: </strong>+91 987 654 3210
            </p>
            <p className="fs-6">
              <strong>EMAIL: </strong>yourmain@gmail.com
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">MENU</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  About
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Services
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Testemontial
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Blog
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">ACCOUNT</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Account
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Checkout
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Login
                </a>
              </li>
              <li>
                <a href="#!" className=" text-black text-decoration-none">
                  Register
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Shopping
                </a>
              </li>
              <li>
                <a href="#!" className="text-black text-decoration-none">
                  Widget
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">NEWSLETTER</h5>
            <p>Subscribe by our newsletter and get update protidin.</p>
            <form>
              <div className="mb-3 row">
                <input
                  type="email"
                  className="rounded col-lg-6"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=" your mail"
                />
                <button type="submit" className="btn btn-danger col-lg-4">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center p-4 bg-dark text-white">
        © 2021 All Rights Reserved By{" "}
        <span className="text-danger">SHAIMAA ALSHAIKH</span>
      </div>
    </footer>
  );
}

export default Footer;
