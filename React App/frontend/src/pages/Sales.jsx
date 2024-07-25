import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { getAllEmployees, getAllSalesReq, onAddSale } from "../services/car";
import ReactSelect from "react-select";

function Inquiry() {
  const navigate = useNavigate();
  const [enqs, setEnqs] = useState([]);
  const [options, setOptions] = useState([]);
  const [empId, setempId] = useState([]);

  const loadEmps = async () => {
    const result = await getAllEmployees();
    if (result["message"] == "success") {
      //console.log(result["result"]);
      const names = result["result"].map((employee) => ({
        value: employee.EmployeeID,
        label: employee.EmployeeID,
      }));
      setOptions(names);
    } else {
      toast.error(result["error"]);
    }
  };

  const loadAllEnq = async () => {
    const result = await getAllSalesReq();
    if (result["message"] == "success") {
      //console.log(result["result"]);
      setEnqs(result["result"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadAllEnq();
    loadEmps();
    const interval = setInterval(() => {
      loadAllEnq();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (price, carId, customerId, id) => {
    // console.log(price, carId, CustomerId, id);
    // console.log(inqId);
    if (empId.length == 0) {
      toast.warn("please select Employees");
    } else {
      const reply = await onAddSale(id, carId, customerId, empId, price);
      if (reply["message"] == "success") {
        console.log(reply);
        toast.success("Record Added successful");
        navigate("/sales");
      } else {
        toast.error("error");
        console.log(reply);
      }
    }
  };

  const handleStatusDelete = async (id) => {
    console.log(id);
  };
  const onStatusChange = async (option) => {
    //console.log(option.value);
    const val = option.value;
    setempId(val);
    //console.log(inqId);
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
                      <th>Customer Name</th>
                      <th>Customer Email</th>
                      <th>Customer Phone</th>
                      <th>Car Name</th>
                      <th>Car Price</th>
                      <th>Employee</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody style={{ cursor: "all-scroll" }}>
                    {Array.isArray(enqs) &&
                      enqs.map((item) => {
                        return (
                          <tr key={item.CarID}>
                            <td> {item.Name}</td>
                            <td>{item.Email}</td>
                            <td>{item.Phone}</td>
                            <td>{item.Model}</td>
                            <td>{item.Price}</td>
                            <td>
                              <ReactSelect
                                options={options}
                                placeholder="Employee Name"
                                menuPortalTarget={document.body}
                                onChange={(selectedOption) =>
                                  onStatusChange(selectedOption)
                                }
                              />
                            </td>
                            <td>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    item.Price,
                                    item.CarID,
                                    item.CustomerID,
                                    item.id
                                  )
                                }
                              >
                                Change Status
                              </button>
                              <button
                                onClick={() => handleStatusDelete(item.id)}
                              >
                                Delete Request
                              </button>
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

function Sales() {
  return (
    <>
      <AdminNavbar />

      <Inquiry />
    </>
  );
}
export default Sales;
