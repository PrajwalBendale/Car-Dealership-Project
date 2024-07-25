import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createUrl } from "../services/utils";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export function Orders() {
  const [newCar, setNewCar] = useState({
    Make: "",
    Model: "",
    Year: "",
    VIN: "",
    Price: "",
    Status: "",
    file: null,
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewCar((prevCar) => ({ ...prevCar, file }));
  };

  const handleAddCar = async () => {
    const formData = new FormData();
    formData.append("Make", newCar.Make);
    formData.append("Model", newCar.Model);
    formData.append("Year", newCar.Year);
    formData.append("VIN", newCar.VIN);
    formData.append("Price", newCar.Price);
    formData.append("Status", newCar.Status.toUpperCase());
    formData.append("image", newCar.file);
    try {
      var url = createUrl("/cars/");
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json(); // Assuming the server sends JSON data
      //console.log(responseData.message)
      if (responseData["message"] == "success") {
        // console.log(responseData['result'])
        // console.log('Car added successfully');
        toast.success("Car added successfully");
        navigate("/home");
        // You can reset the form or perform any other actions upon successful upload
      } else {
        // console.error('Failed to add car');
        toast.error("Failed to add car");
      }
    } catch (error) {
      toast.error("Failed to add car");
      //console.error("Error adding car:", error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <AdminNavbar />
      <center>
        <div className="container">
          <h1 className="title">Add New Car here..</h1>
          <div>
            <label className="mr-2" style={{ marginRight: "8px" }}>
              Manufacture:-{" "}
            </label>
            <input type="" name="Make" onChange={handleInputChange}></input>
          </div>
          <div className="mt-2">
            <label className="mr-2" style={{ marginRight: "8px" }}>
              Model:-{" "}
            </label>
            <input type="" name="Model" onChange={handleInputChange}></input>
          </div>
          <div className="mt-2">
            <label className="mr-2" style={{ marginRight: "8px" }}>
              Year:-{" "}
            </label>
            <input type="" name="Year" onChange={handleInputChange}></input>
          </div>
          <div className="mt-2">
            <label className="mr-2" style={{ marginRight: "8px" }}>
              VIN:-{" "}
            </label>
            <input
              type=""
              name="VIN"
              onChange={handleInputChange}
              className="ml-2"
            ></input>
          </div>
          <div className="mt-2">
            <label className="mr-2" style={{ marginRight: "8px" }}>
              Price:-{" "}
            </label>
            <input type="" name="Price" onChange={handleInputChange}></input>
          </div>
          <div className="mt-2">
            <label className="mr-2">Status:- </label>
            <input type="" name="Status" onChange={handleInputChange}></input>
          </div>

          <div className="mt-2">
            <label className="mr-2" style={{ marginRight: "8px" }}>
              File Upload:{" "}
            </label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="mt-2">
            <button type="button" onClick={handleAddCar}>
              Add Car
            </button>
          </div>
        </div>
      </center>
    </>
  );
}

export function AddCar() {
  return (
    <>
      <Orders />
    </>
  );
}

export default AddCar;
