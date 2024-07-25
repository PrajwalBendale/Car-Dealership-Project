import { useEffect, useState } from "react";
import { getInquiriesById } from "../services/car";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function CustomerReqinfo() {
  const [enqs, setEnqs] = useState([]);
  //console.log(useParams())
  const { customerId, CarID } = useParams();
  //console.log(customerId,CarID)
  const loadenquiry = async () => {
    const result = await getInquiriesById(customerId, CarID);
    if (result["message"] == "success") {
      //console.log(result['result'])
      setEnqs(result["result"]);
      // enqs.map(item=>{
      //   console.log(item)
      // })
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadenquiry();
  }, []);

  return (
    <>
      <div>
        <h2>Requested Customer Info</h2>
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  {/*
                        Name,Phone,Email,Make,Model,Price*/}
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>

                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {enqs.map((item) => {
                    return (
                      <tr key={item.Name}>
                        <td> {item.Name}</td>
                        <td> {item.Phone}</td>
                        <td> {item.Email}</td>
                        <td>{item.Make}</td>

                        <td>{item.Model}</td>
                        <td> {item.Price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CustomerReqinfo;
