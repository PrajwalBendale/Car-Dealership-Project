import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import config from '../config'

import { getAllInquiries, getAllPizzas, updatedStatus } from '../services/pizza'
import { Link, useNavigate } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'


function Inquiry(){
  const navigate = useNavigate()
  const [enqs, setEnqs] = useState([])
  const loadAllEnq = async () => {
    const result = await getAllInquiries()
    if (result['message'] == 'success') {
      //console.log(result['result'])
      setEnqs(result['result'])
      
    } else {
      toast.error(result['error'])
    }
  }
  const statusChanged = async (currentItem) =>{
    let id, status;
    //setEnqs((enqs) =>
      enqs.map(item =>{
        if (item.id === currentItem) {
        id = item.id;
        status = 'completed'; // Update status directly here
        return { ...item, status,id }; // Return the modified item
      }
      return item;
          
  })//)
  console.log(id,status)
    const reply = await updatedStatus(id,status) 
    if (reply['message'] == 'success') {
      //console.log(result['result'])
      setEnqs(reply['result'])
      toast.success("Status is changed succesfully..")
      navigate('/home')
    } else {
      toast.error(reply['error'])
    }
}
  const handleStatusChange = (currentItem) => {
      enqs.map(item => {
        console.log(item)
        if (item.id === currentItem){
          item.status="completed"
          setEnqs(item)
        }
          
      } 
      )
    
    
    
      enqs.map((item) =>
        console.log(item)
      )
    
    // Update the state with the new items
    
    statusChanged(currentItem)
    
  };
  
  useEffect(() => {
    loadAllEnq()
    
  }, [enqs])


  return (
    <>
      <div>
        
            <div>
              <h2>Customer Enquiries:</h2>
              <div className='card' style={{ minHeight:0 }}>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr key="Enquiry Id">
                            <th>Enquiry Id</th>
                            <th>CustomerId</th>
                                <th>CarId</th>
                                
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(enqs) &&
                        enqs.map(item => {

                            if(item.status === 'pending'){
                              return(                              
                              <tr key={item.id}>
                                <td> {item.id}</td>
                                <td><Link className='nav-link' aria-current='page' to={`/customerReqinfo/${item.CustomerID}/${item.CarID}`}>
                                {item.CustomerID}
                                </Link></td>
                                <td>{item.CarID}</td>

                                <td>
                                  <p>Status: {item.status}</p>
                                  <button onClick={() => handleStatusChange(item.id)}>Change Status</button>
                                  </td>
                                
                                </tr>
                                )
                            }
                            else{
                              return(<></>)
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
  )
}

function Emp(){

  const [items, setItems] = useState([])
  const loadAllPizzas = async () => {
    const result = await getAllPizzas()
    if (result['message'] == 'success') {
      //console.log(result['result'])
      setItems(result['result'])
      
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadAllPizzas()
  }, [])

  return (
    <>
      <Navbar />
      
      <div>
        
            <div>
              <h2>Your Sales</h2>
              <div className='card' style={{ height: 280 }}>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                            <th>SaleId</th>
                                <th>CarId</th>
                                <th>CustomerId</th>
                                <th>SalePrice</th>
                                <th>SaleDate</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        items.map(item => {
                          return(
                          <tr key={item.SaleID}>
                          <th>{item.SaleID}</th>
                          <td>{item.CarID}</td>
                          <td>{item.CustomerID}</td>
                          <td>{item.SalePrice}</td>
                          <td>{new Date(item.SaleDate).toLocaleDateString('en-GB')}</td>
                          </tr>
                          )
                        })}
                        
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        
      </div>     
      
    </>
  )
}

function AdminDB() {
  const [enqs, setEnqs] = useState([])
  const loadAllEnq = async () => {
    const result = await getAllInquiries()
    if (result['message'] == 'success') {
      //console.log(result['result'])
      setEnqs(result['result'])
      
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    loadAllEnq()
    
  }, [enqs])


  return(
    <>
    <h1>Welcome Admin</h1>
    <div>
        
            <div>
              <h2>Customer Enquiries:</h2>
              <div className='card' style={{ minHeight:0 }}>
                <div className='card-body' style={{maxHeight:350}}>
                  <div className='table-responsive' style={{maxHeight:320,overflowY:'auto'}}>
                    <table className='table table-bordered'>
                        <thead>
                            <tr key="Enquiry Id">
                            <th>Enquiry Id</th>
                            <th>CustomerId</th>
                                <th>CarId</th>
                                
                                <th>Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(enqs) &&
                        enqs.map(item => {

                            
                              return(                              
                              <tr key={item.id}>
                                <td> {item.id}</td>
                                <td><Link className='nav-link' aria-current='page' to={`/customerReqinfo/${item.CustomerID}/${item.CarID}`}>
                                {item.CustomerID}
                                </Link></td>
                                <td>{item.CarID}</td>

                                <td>
                                  {item.status}
                                  
                                  </td>
                                
                                </tr>
                                )
                           
                          
                          
                        })}
                        
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
        
      </div>     
      
    </>
  )
}

export function Home() {
  if (sessionStorage.getItem('Position')== 'admin') {
    return(
      <>
      <AdminNavbar />
      
      <AdminDB />
      </>
    )
  }
  else{ return(
    <>
    <Emp></Emp>
    <Inquiry></Inquiry>
    </>
  )}
}

export default Home
