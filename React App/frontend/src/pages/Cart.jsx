import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import config from '../config'
import { clear, updateQuantity } from '../features/cartSlice'
import { placeOrder } from '../services/order'

export function Cart() {
  const [total, setTotal] = useState(0)

  // use it for updating the cart slice
  const dispatch = useDispatch()

  // reading the current state
  const cart = useSelector((state) => state.cart)
  useEffect(() => {
    let totalAmount = 0
    for (const item of cart.items) {
      totalAmount += item['price'] * item['quantity']
    }
    setTotal(totalAmount)
  }, [cart.items])

  const onQuantityUpdate = (itemId, quantity) => {
    dispatch(updateQuantity({ itemId, quantity }))
  }

  const onPlaceOrder = async () => {
    const result = await placeOrder(cart.items, total)
    if (result['status'] == 'success') {
      dispatch(clear())
      toast.success('successfully placed an order')
    } else {
      toast.error(result['error'])
    }
  }

  return (
    <>
    
      <div className='container'>
        <h1 className='title'>Cart</h1>

        {/* conditional rendering Make,Model,Year,VIN,Price,Status,Image*/}
        
        
          <div>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>CarId</th>
                  <th>Make</th>
                  <th>Model</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          style={{ width: 50 }}
                          src={config.server + '/' + item['image']}
                          alt=''
                        />
                      </td>
                      <td>{item['name']}</td>
                      <td>{item['price']}</td>
                      <td>{item['quantity']}</td>
                      <td>{item['price'] * item['quantity']}</td>
                      <td>
                        <button
                          onClick={() => {
                            onQuantityUpdate(item['id'], item['quantity'] + 1)
                          }}
                          className='btn btn-success btn-sm'
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            onQuantityUpdate(item['id'], item['quantity'] - 1)
                          }}
                          className='btn btn-success btn-sm ms-1'
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='5' style={{ textAlign: 'right' }}>
                    Total Amount
                  </td>
                  <td>{total}</td>
                </tr>
              </tfoot>
            </table>

            <button onClick={onPlaceOrder} className='btn btn-primary'>
              Place Order
            </button>
          </div>
        
      </div>
    </>
  )
}

export default Cart
