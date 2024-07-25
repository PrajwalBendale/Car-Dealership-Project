import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import config from "../config";
import { deleteCar, getAllCars, onStatusChanged } from "../services/car";
import AdminNavbar from "../components/AdminNavbar";
import Select from "react-select";

export function Cart() {
  const [total, setTotal] = useState([]);
  //const [value, setValue] = useState([options])
  const options = [
    { value: "YES", label: "YES" },
    { value: "NO", label: "NO" },
  ];

  const loadAllCars = async () => {
    const result = await getAllCars();
    if (result["message"] == "success") {
      setTotal(result["result"]);
    } else {
      toast.error(result["error"]);
    }
  };

  const onStatusChange = async (id, selectedOption) => {
    // console.log(selectedOption.value,id)
    const result = await onStatusChanged(id, selectedOption.value);
    if (result["message"] == "success") {
      toast.success("Status is changed succesfully..");
      loadAllCars();
    } else {
      toast.error(result["result"].sqlMessage);
      //console.log(result.result);
      loadAllCars();
    }
  };
  const ondeleteCar = async (id) => {
    const result = await deleteCar(id);
    console.log(result);
    if (result["message"] == "success") {
      toast.success("Status is changed succesfully..");
      loadAllCars();
    } else {
      toast.error(result["result"].sqlMessage);
      //console.log(result.result);
      loadAllCars();
    }
  };

  useEffect(() => {
    loadAllCars();
  }, []);

  return (
    <>
      <AdminNavbar></AdminNavbar>
      <div className="container">
        <h1 className="title">All Cars</h1>
        {/* conditional rendering Make,Model,Year,VIN,Price,Status,Image*/}
        <div
          className="card table-responsive card-body"
          style={{ minHeight: 140 }}
        >
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>CarId</th>
                <th>Image</th>
                <th>Make</th>
                <th>Model</th>
                <th>VIN</th>
                <th>Price</th>
                <th>Year</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody style={{ cursor: "all-scroll" }}>
              {total.map((item) => {
                return (
                  <tr key={item.CarID}>
                    <td>{item.CarID}</td>
                    <td>
                      <img
                        style={{ width: 70 }}
                        src={config.server + "/" + item.image}
                        alt=""
                      />
                    </td>
                    <td>{item.Make}</td>
                    <td>{item.Model}</td>
                    <td>{item.VIN} </td>
                    <td>{item.Price}</td>
                    <td>{item.Year}</td>

                    <td>
                      <Select
                        options={options}
                        placeholder={item.Status}
                        onChange={(selectedOption) =>
                          onStatusChange(item.CarID, selectedOption)
                        }
                      />

                      <span style={{ marginLeft: "8px" }}>
                        <button onClick={() => ondeleteCar(item.CarID)}>
                          deleteCar
                        </button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Cart;
