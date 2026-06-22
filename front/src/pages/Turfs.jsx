import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/Api";
import "./Turf.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
import Modal from "react-bootstrap/Modal";
import GMap from "../ui/GMap";
import Checkout from "../ui/Checkout";

const Turfs = () => {
  let navigate = useNavigate();
  let [isBook, setIsBook] = useState(false);
  let [applyBtn, setApplyBtn] = useState(false);
  let [show, setShow] = useState(false);
  let [turf, setTurf] = useState({});
  let [timingLoopArr, setTimingLoopArr] = useState([]);
  let [timingClose, setTimingClose] = useState(null);
  let [timingOpen, setTimingOpen] = useState(null);
  let currTime = new Date().getHours();
  let [price, setPrice] = useState(0);
  let [timingSlotArr, setTimingSlotArr] = useState([]);
  let [discount, setDiscount] = useState(0);

  // let [getAllBooking,setGetAllBooking] = useState([]);
  let [dateSlotArr, setDateSlotArr] = useState([]);

  let param = useParams();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(new Date());

  let GoToLogin = () => {
    handleClose();
    navigate("/user/login");
  };

  let IsLoggedIn = () => {
    if (localStorage.getItem("user_access")) {
      setIsBook(true);
    } else {
      handleShow();
    }
  };

  useEffect(() => {
    axios.get(`${API_URL}/turfs/${param.id}`).then((response) => {
      setTurf(response.data);
      let time_open = response.data.time_open.split(" "); // ["00:00", "AM"]
      let time_close = response.data.time_close.split(" "); // ["11:00", "PM"]

      let time_open_hr = parseInt(time_open[0].split(":")[0]); // 12

      let time_close_hr = parseInt(time_close[0].split(":")[0]); // 7

      setTimingClose(time_close_hr);

      setTimingOpen(time_open_hr);

      if (time_open[1] == "PM") {
        if (time_open_hr == 12) {
          time_open_hr = 12;
        } else {
          time_open_hr += 12; //
        }
      }

      if (time_close[1] == "PM") {
        time_close_hr += 12; // 23
        // console.log(time_close_hr)
      }
      let time_diff = time_close_hr - time_open_hr;
      let timing_arr = Array.from({ length: time_diff }).fill("");

      setTimingLoopArr(timing_arr); //jitna time difference hai utni length ka blank value ka array mil jayga
    });
  }, []);

  useEffect(() => {
    handleSlot();
  }, []);

  let handlePrice = (e) => {
    let time = e.target.value;
    if (e.target.checked) {
      setTimingSlotArr((prevTime) => [...prevTime, time]);
      setPrice(++price);
    } else {
      setTimingSlotArr((prevTime) => prevTime.filter((item) => item != time));
      setPrice(--price);
    }
  };

  let handleBook = (amount, full_amount, remain) => {
    let turfData = {
      turf_id: param.id,
      date: startDate,
      slot: timingSlotArr,
      amount: full_amount,
      advance_amount: amount,
      remaining_amount: remain,
    };
    axios
      .post(`${API_URL}/booking`, turfData, {
        headers: { Authorization: localStorage.getItem("user_access") },
      })
      .then((response) => {
        navigate("/user/myaccount");
      });
  };

  let handleSlot = (date = new Date()) => {
    setDateSlotArr([]);
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let newdate = date.getFullYear() + "-" + month + "-" + date.getDate();
    axios
      .get(`${API_URL}/booking/getbyturfid/${param.id}/${newdate}`)
      .then((response) => {
        // response.data.map(item => {
        //   setDateSlotArr(prev => {
        //     return [...item.slot]
        //   })
        // })
        const allSlots = response.data.flatMap((item) => item.slot);
        setDateSlotArr(allSlots);
      });
  };
  const handleStripePayment = async (amount) => {
  try {
    const response = await axios.post(
      `${API_URL}/payment/create-checkout-session`,
      {
        amount,
      }
    );

    console.log(response.data);

    window.location.href = response.data.url;
  } catch (err) {
    console.log(err);
  }
};

  return (
    <>
      {isBook == false ? (
        <div className="container my-5">
          <div className="row">
            <div className="col-md-8">
              <div>
                <h3>{turf.name}</h3>
                <p>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;
                  {turf.address}
                </p>
                <p>{turf.detail}</p>
                <h4 className="h4 mt-4">Gallery</h4>
                <img
                  src={"http://localhost:3000/turf_images/" + turf.image}
                  style={{ width: "100%", height: "450px" }}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-4">
              <h3>book your slot</h3>
              <div className="card my-5">
                <div className="card-header">Booking Date</div>
                <div className="card-body">
                  <DatePicker
                    showIcon
                    dateFormat="dd/MMM/YYYY"
                    minDate={new Date()}
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      handleSlot(date);
                    }}
                  />
                </div>
              </div>
              <div className="card my-5">
                <div className="card-header">
                  Booking Time ({turf.time_open}-{turf.time_close})
                </div>
                <div className="card-body timing-body">
                  <ul className="ks-cboxtags">
                    {timingLoopArr.map((item, index) => {
                      return (
                        <li key={index}>
                          {timingOpen + index <= currTime &&
                          startDate.getDate() === new Date().getDate() &&
                          startDate.getMonth() === new Date().getMonth() &&
                          startDate.getFullYear() ===
                            new Date().getFullYear() ? (
                            <>
                              <input
                                disabled={true}
                                className="disabled"
                                type="checkbox"
                                id={"checkboxOne" + index}
                                value="Rainbow Dash"
                              />
                              <label htmlFor={"checkboxOne" + index}>
                                {timingOpen + index < 13
                                  ? timingOpen + index
                                  : timingOpen + index - 12}
                                :00{timingOpen + index < 13 ? "AM" : "PM"}
                              </label>
                            </>
                          ) : (
                            <>
                              <input
                                className={
                                  dateSlotArr.includes(
                                    (timingOpen + index < 13
                                      ? timingOpen + index
                                      : timingOpen + index - 12) +
                                      ":00" +
                                      (timingOpen + index < 13 ? "AM" : "PM"),
                                  )
                                    ? "red"
                                    : ""
                                }
                                disabled={
                                  dateSlotArr.includes(
                                    (timingOpen + index < 13
                                      ? timingOpen + index
                                      : timingOpen + index - 12) +
                                      ":00" +
                                      (timingOpen + index < 13 ? "AM" : "PM"),
                                  )
                                    ? true
                                    : false
                                }
                                onChange={(e) => handlePrice(e)}
                                type="checkbox"
                                id={"checkboxOne" + index}
                                value={
                                  (timingOpen + index < 13
                                    ? timingOpen + index
                                    : timingOpen + index - 12) +
                                  ":00" +
                                  (timingOpen + index < 13 ? "AM" : "PM")
                                }
                              />
                              <label htmlFor={"checkboxOne" + index}>
                                {timingOpen + index < 13
                                  ? timingOpen + index
                                  : timingOpen + index - 12}
                                :00{timingOpen + index < 13 ? "AM" : "PM"}
                              </label>
                            </>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="card my-5">
                <div className="card-header">
                  Booking Price(&#8377;{turf.price}/hr)
                </div>
                <div className="card-body">
                  Amount : {turf ? (price * turf.price).toFixed(2) : 0.0}
                </div>
              </div>
              <button onClick={IsLoggedIn} className="btn btn-secondary">
                Book Now
              </button>
            </div>
          </div>
          <div className="row">
            <GMap lat={turf.lat} long={turf.long} />
          </div>
        </div>
      ) : (
        <Checkout
          turf={turf}
          startDate={startDate}
          timingSlotArr={timingSlotArr}
          discount={discount}
          setDiscount={setDiscount}
          handleBook={handleBook}
          handleStripePayment={handleStripePayment}
        />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If You Want To Book this Turf Slot, Then You Have To Login First
        </Modal.Body>
        <Modal.Footer>
          <button onClick={GoToLogin} className="btn btn-sm btn-primary">
            Login
          </button>

          <button onClick={handleClose} className="btn btn-sm btn-secondary">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Turfs;
