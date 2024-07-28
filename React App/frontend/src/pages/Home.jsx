import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import config from "../config";

import { getAllInquiries, getAllSales, updatedStatus } from "../services/car";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function Inquiry() {
  const navigate = useNavigate();
  const [enqs, setEnqs] = useState([]);

  const loadAllEnq = async () => {
    const result = await getAllInquiries();
    if (result["message"] == "success") {
      //console.log(result['result'])
      setEnqs(result["result"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadAllEnq();
    const interval = setInterval(() => {
      loadAllEnq();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (currentItem) => {
    const asd = await updatedStatus(currentItem, "completed");
    if (asd["message"] == "success") {
      //setEnqs(asd['result'])
      toast.success("Status is changed succesfully..");
      loadAllEnq();
      navigate("/home");
    } else {
      toast.error(asd["error"]);
    }
  };

  return (
    <>
      <div>
        <div>
          <h2>Customer Enquiries:</h2>
          <div className="card">
            <div className="card-body">
              <div
                className="table-responsive"
                style={{ maxHeight: 320, overflowY: "auto" }}
              >
                <table className="table table-bordered">
                  <thead>
                    <tr key="Enquiry Id">
                      <th>Enquiry Id</th>
                      <th>CustomerId</th>
                      {/*<th>CarId</th>*/}
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody style={{ cursor: "all-scroll" }}>
                    {Array.isArray(enqs) &&
                      enqs.map((item) => {
                        if (item.status === "pending") {
                          return (
                            <tr key={item.id}>
                              <td> {item.id}</td>
                              <td>
                                <Link
                                  className="nav-link"
                                  aria-current="page"
                                  to={`/customerReqinfo/${item.CustomerID}/${item.CarID}`}
                                >
                                  {item.CustomerID}
                                </Link>
                              </td>
                              {/*<td>{item.CarID}</td>*/}
                              <td>
                                <span style={{ marginRight: "8px" }}>
                                  Status: {item.status}
                                </span>
                                <button
                                  onClick={() => handleStatusChange(item.id)}
                                >
                                  Change Status
                                </button>
                              </td>
                            </tr>
                          );
                        } else {
                          return <></>;
                        }
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Emp() {
  const [items, setItems] = useState([]);
  const loadAllPizzas = async () => {
    const result = await getAllSales();
    if (result["message"] == "success") {
      //console.log(result['result'])
      setItems(result["result"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadAllPizzas();
    const interval = setInterval(() => {
      loadAllPizzas();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <h1>Welcome Employee</h1>
        <div>
          <h2>Your Sales</h2>
          <div className="card">
            <div className="card-body">
              <div
                className="table-responsive"
                style={{ maxHeight: 320, overflowY: "auto" }}
              >
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SaleId</th>
                      <th>CarId</th>
                      <th>CustomerId</th>
                      <th>SalePrice</th>
                      <th>SaleDate</th>
                    </tr>
                  </thead>
                  <tbody style={{ cursor: "all-scroll" }}>
                    {items.map((item) => {
                      return (
                        <tr key={item.SaleID}>
                          <th>{item.SaleID}</th>
                          <td>{item.CarID}</td>
                          <td>{item.CustomerID}</td>
                          <td>{item.SalePrice}</td>
                          <td>
                            {new Date(item.SaleDate).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AdminDB() {
  const [enqs, setEnqs] = useState([]);
  const loadAllEnq = async () => {
    const result = await getAllInquiries();
    if (result["message"] == "success") {
      //console.log(result['result'])
      setEnqs(result["result"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadAllEnq();
  }, []);

  return (
    <>
      <h1>Welcome Admin</h1>
      <div>
        <div>
          <h2>Customer Enquiries:</h2>
          <div className="card">
            <div className="card-body">
              <div
                className="table-responsive"
                style={{ maxHeight: 320, overflowY: "auto" }}
              >
                <table className="table table-bordered">
                  <thead>
                    <tr key="Enquiry Id">
                      <th>Enquiry Id</th>
                      <th>CustomerId</th>
                      <th>CarId</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody style={{ cursor: "all-scroll" }}>
                    {Array.isArray(enqs) &&
                      enqs.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td> {item.id}</td>
                            <td>
                              <Link
                                className="nav-link"
                                aria-current="page"
                                to={`/customerReqinfo/${item.CustomerID}/${item.CarID}`}
                              >
                                {item.CustomerID}
                              </Link>
                            </td>
                            <td>{item.CarID}</td>
                            <td>{item.status}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function Home() {
  if (sessionStorage.getItem("Position") == "admin") {
    return (
      <>
        <AdminNavbar />

        <AdminDB />
      </>
    );
  } else {
    return (
      <>
        <Emp></Emp>
        <Inquiry></Inquiry>
      </>
    );
  }
}

export default Home;
