import React from 'react'


let Checkout = ({ turf, startDate, timingSlotArr, discount, setDiscount, handleBook }) => {
  return (
    <div className='container my-5'>
      <div className="row">
        <div className="col-md-12">
          <h4 className='text-center'>Confirm Payment</h4>
          <hr />
          <div className="row">
            <div className="col-md-8">
              <div className="alert alert-secondary">
                <table className="table table-light">
                  <tbody>
                    <tr>
                      <td>Turf Name</td>
                      <td>{turf.name}</td>
                    </tr>
                    <tr>
                      <td>Turf Address</td>
                      <td>{turf.address}</td>
                    </tr>
                    <tr>
                      <td>Booking Date</td>
                      <td>{startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear()}</td>
                    </tr>
                    <tr>
                      <td>Time Slot</td>
                      <td>
                        {
                          timingSlotArr.map(item => item + ", ")
                        }
                        ({timingSlotArr.length})
                      </td>
                    </tr>
                    <tr>
                      <td>Coupon Code</td>
                      <td style={{ width: "600px" }}>
                        <p style={{ fontSize: "14px" }}><b>100 off</b> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, voluptates inventore ea asperiores quo dicta!
                          <br />
                          <button disabled={discount === 0 ? false : true} className='btn btn-sm btn-info' onClick={() => setDiscount(100)}>Apply</button>
                        </p>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="alert alert-secondary">
                <table className='table table-light'>
                  <tbody>
                    <tr>
                      <td>Per Slot Amount</td>
                      <td>{turf.price ? turf.price.toFixed(2) : ''}</td>
                    </tr>
                    <tr>
                      <td>Total Slot</td>
                      <td>{timingSlotArr.length}</td>
                    </tr>
                    <tr>
                      <td>Total Amount</td>
                      <td><b>{turf.price * timingSlotArr.length}.00</b></td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>{discount}:00</td>
                    </tr>
                    <tr>
                      <td><b>Final Amount</b></td>
                      <td><b>{turf.price * timingSlotArr.length - discount}.00</b></td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        Amount To Be Paid
                        <br />
                        <button onClick={() => handleBook(((turf.price * timingSlotArr.length) - discount), (turf.price * timingSlotArr.length), 0)} className='m-2 btn btn-sm btn-secondary'>
                          Full Amount <br />
                          ({(turf.price * timingSlotArr.length) - discount}.00)
                        </button>

                        <button onClick={() => handleBook((((turf.price * timingSlotArr.length) - discount) * (25 / 100)), ((turf.price * timingSlotArr.length) - discount), ((((turf.price * timingSlotArr.length) - discount) * (25 / 100)) - (((turf.price * timingSlotArr.length) - discount) * (25 / 100))))} className='m-2 btn btn-sm btn-secondary '>
                          25% Amount <br />
                          ({((turf.price * timingSlotArr.length) - discount) * (25 / 100)}.00)
                        </button>
                      </td>
                    </tr>
                  </tbody>

                </table>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Checkout