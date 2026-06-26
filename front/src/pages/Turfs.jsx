 import { useEffect, useMemo, useState } from 'react'
  import { useNavigate, useParams } from 'react-router-dom'
  import axios from 'axios'
  import DatePicker from 'react-datepicker'
  import 'react-datepicker/dist/react-datepicker.css'
  import { API_URL, IMAGE_BASE_URL } from '../config/Api'
  import GMap from '../ui/GMap'
  import Checkout from '../ui/Checkout'

  // Format a 24-hour number to a 12-hour label like "10:00 AM"
  const formatHour = (hour24) => {
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
    const meridiem = hour24 < 12 ? 'AM' : 'PM'
    return `${hour12.toString().padStart(2, '0')}:00 ${meridiem}`
  }

  // Parse a time string like "06:00 AM" or "11:00 PM" to a 24-hour number (6 or 23)
  const parseTime = (timeStr) => {
    if (!timeStr) return null
    const [time, meridiem] = timeStr.split(' ')
    const [hh] = time.split(':').map(Number)
    if (meridiem === 'PM' && hh !== 12) return hh + 12
    if (meridiem === 'AM' && hh === 12) return 0
    return hh
  }

  const formatDate = (date) =>
    date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const Turfs = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    // Turf data
    const [turf, setTurf] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Booking state
    const [startDate, setStartDate] = useState(new Date())
    const [timingOpen, setTimingOpen] = useState(0)
    const [timingClose, setTimingClose] = useState(24)
    const [timingSlotArr, setTimingSlotArr] = useState([])
    const [dateSlotArr, setDateSlotArr] = useState([])
    const [slotsLoading, setSlotsLoading] = useState(false)
    const [discount, setDiscount] = useState(0)

    // Flow state
    const [isBook, setIsBook] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)

    // Fetch turf details
    useEffect(() => {
      axios
        .get(`${API_URL}/turfs/${id}`)
        .then((response) => {
          setTurf(response.data || {})
          const open = parseTime(response.data?.time_open)
          const close = parseTime(response.data?.time_close)
          setTimingOpen(open ?? 0)
          setTimingClose(close ?? 24)
          setIsLoading(false)
        })
        .catch(() => {
          setError('Could not load this turf.')
          setIsLoading(false)
        })
    }, [id])

    // Fetch booked slots for the selected date
    const fetchBookedSlots = (date) => {
      setSlotsLoading(true)
      const month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const dateStr = `${date.getFullYear()}-${month}-${day}`

      axios
        .get(`${API_URL}/booking/getbyturfid/${id}/${dateStr}`)
        .then((response) => {
          // Aggregate slots across all bookings for that date (Set dedupes)
          const allSlots = new Set()
          ;(response.data || []).forEach((booking) => {
            ;(booking.slot || []).forEach((s) => allSlots.add(s))
          })
          setDateSlotArr([...allSlots])
          setSlotsLoading(false)
        })
        .catch(() => {
          setDateSlotArr([])
          setSlotsLoading(false)
        })
    }

    useEffect(() => {
      if (id) fetchBookedSlots(new Date())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // Build the list of hour slots between open and close
    const allSlots = useMemo(() => {
      const arr = []
      for (let h = timingOpen; h < timingClose; h++) {
        arr.push({ hour24: h, label: formatHour(h) })
      }
      return arr
    }, [timingOpen, timingClose])

    // Helpers
    const isSameDay = (a, b) =>
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()

    const isPast = (hour24) => {
      if (!isSameDay(startDate, new Date())) return false
      return hour24 <= new Date().getHours()
    }

    const isBooked = (label) => dateSlotArr.includes(label)
    const isSelected = (label) => timingSlotArr.includes(label)

    // Toggle slot selection
    const toggleSlot = (slot) => {
      setTimingSlotArr((prev) =>
        prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
      )
    }

    // Date change
    const handleDateChange = (date) => {
      setStartDate(date)
      setTimingSlotArr([])
      fetchBookedSlots(date)
    }

    // Total amount (derived state - no setPrice mutation)
    const totalAmount = (turf?.price || 0) * timingSlotArr.length
    const finalAmount = Math.max(0, totalAmount - discount)

    // Book flow
    const handleBookNow = () => {
      if (!localStorage.getItem('user_access')) {
        setShowLoginModal(true)
        return
      }
      if (timingSlotArr.length === 0) return
      setIsBook(true)
    }

    const goToLogin = () => {
      setShowLoginModal(false)
      navigate('/user/login')
    }

    // Submit booking (25% advance flow)
    const handleBook = (advance, full, remain) => {
      const turfData = {
        turf_id: id,
        date: startDate,
        slot: timingSlotArr,
        amount: full,
        advance_amount: advance,
        remaining_amount: remain,
      }
      axios
        .post(`${API_URL}/booking`, turfData, {
          headers: { Authorization: localStorage.getItem('user_access') },
        })
        .then(() => navigate('/user/myaccount'))
        .catch(() => alert('Booking failed. Please try again.'))
    }

    // Stripe payment flow
    const handleStripePayment = async (amount) => {
      try {
        const response = await axios.post(
          `${API_URL}/payment/create-checkout-session`,
          { amount }
        )
        window.location.href = response.data.url
      } catch (err) {
        alert('Payment could not be started. Please try again.')
      }
    }

    // ===== Render states =====

    if (isLoading) {
      return (
        <main className="booking-page">
          <div className="container">
            <div className="booking-skeleton">
              <div
                className="skeleton"
                style={{ height: 400, borderRadius: 12 }}
              ></div>
              <div className="skeleton" style={{ height: 24, width: '60%' }}></div>
              <div className="skeleton" style={{ height: 16, width: '40%' }}></div>
            </div>
          </div>
        </main>
      )
    }

    if (error) {
      return (
        <main className="booking-page">
          <div className="container">
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-exclamation-triangle"></i>
              </div>
              <h3>Couldn't load this turf</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try again
              </button>
            </div>
          </div>
        </main>
      )
    }

    // Once user clicks Book, show Checkout
    if (isBook) {
      return (
        <Checkout
          turf={turf}
          startDate={startDate}
          timingSlotArr={timingSlotArr}
          discount={discount}
          setDiscount={setDiscount}
          handleBook={handleBook}
          handleStripePayment={handleStripePayment}
          totalAmount={finalAmount}
        />
      )
    }

    const imageUrl = turf.image
      ? `${IMAGE_BASE_URL}/turf_images/${turf.image}`
      : null

    return (
      <main className="booking-page">
        <div className="container">
          <div className="booking-grid">
            {/* Left: turf details + map */}
            <div>
              <div className="turf-detail-card">
                {imageUrl ? (
                  <div
                    className="turf-hero"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    role="img"
                    aria-label={turf.name}
                  >
                    <span className="turf-hero-badge">
                      <i className="fa fa-clock"></i>
                      {turf.time_open} - {turf.time_close}
                    </span>
                  </div>
                ) : (
                  <div className="turf-hero-fallback">
                    <i className="fa fa-futbol"></i>
                  </div>
                )}

                <div className="turf-body">
                  <h1 className="turf-name">{turf.name}</h1>
                  <div className="turf-meta">
                    {turf.address && (
                      <span>
                        <i className="fa fa-location-dot"></i>
                        {turf.address}
                      </span>
                    )}
                    {turf.contact && (
                      <span>
                        <i className="fa fa-phone"></i>
                        {turf.contact}
                      </span>
                    )}
                  </div>

                  {turf.detail && (
                    <p className="turf-description">{turf.detail}</p>
                  )}

                  <div className="turf-features">
                    {turf.price ? (
                      <span className="turf-feature-tag">
                        <i className="fa fa-indian-rupee-sign"></i>₹
                        {turf.price}/hr
                      </span>
                    ) : null}
                    {turf.time_open && turf.time_close ? (
                      <span className="turf-feature-tag">
                        <i className="fa fa-clock"></i>
                        {turf.time_open} - {turf.time_close}
                      </span>
                    ) : null}
                    <span className="turf-feature-tag">
                      <i className="fa fa-futbol"></i>Bookable online
                    </span>
                  </div>
                </div>
              </div>

              <div className="turf-map">
                <div className="turf-map-header">
                  <h3>
                    <i className="fa fa-map-location-dot"></i>Location
                  </h3>
                </div>
                <GMap lat={turf.lat} long={turf.long} />
              </div>
            </div>

            {/* Right: sticky booking card */}
            <aside>
              <div className="booking-card">
                <div className="booking-card-header">
                  <h2>Book your slot</h2>
                  {turf.price ? (
                    <div className="price">
                      <strong>₹{turf.price}</strong> / hour
                    </div>
                  ) : null}
                </div>

                {/* Date picker */}
                <div className="booking-section">
                  <label className="booking-section-label">Select date</label>
                  <div className="booking-datepicker">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      minDate={new Date()}
                      dateFormat="dd MMM yyyy"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Time slots */}
                <div className="booking-section">
                  <label className="booking-section-label">
                    Select time slot
                    {isSameDay(startDate, new Date()) ? ' (today)' : ''}
                  </label>

                  {slotsLoading ? (
                    <div className="time-slots-skeleton">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="skeleton time-slot-skeleton"
                        ></div>
                      ))}
                    </div>
                  ) : allSlots.length === 0 ? (
                    <div className="no-slots">
                      <i className="fa fa-calendar-xmark"></i>
                      <p className="mb-0 mt-2">
                        No slots available for the configured hours.
                      </p>
                    </div>
                  ) : (
                    <div className="time-slots-grid">
                      {allSlots.map(({ hour24, label }) => {
                        const past = isPast(hour24)
                        const booked = isBooked(label)
                        const selected = isSelected(label)
                        const disabled = past || booked

                        return (
                          <button
                            key={hour24}
                            type="button"
                            className={`time-slot ${selected ? 'selected' : ''} ${
                              booked ? 'booked' : ''
                            } ${past ? 'past' : ''}`}
                            onClick={() => !disabled && toggleSlot(label)}
                            disabled={disabled}
                            aria-pressed={selected}
                          >
                            <span>{label}</span>
                            {booked && (
                              <span className="slot-label">Booked</span>
                            )}
                            {past && !booked && (
                              <span className="slot-label">Past</span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  <p className="booking-section-hint">
                    <i className="fa fa-circle-info me-1"></i>
                    Tap multiple slots to book consecutive hours.
                  </p>
                </div>

                {/* Price summary */}
                {timingSlotArr.length > 0 && (
                  <div className="booking-section">
                    <div className="price-summary">
                      <div className="price-row">
                        <span className="label">
                          ₹{turf.price} × {timingSlotArr.length} hour
                          {timingSlotArr.length > 1 ? 's' : ''}
                        </span>
                        <span className="value">
                          ₹{totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="price-row total">
                        <span className="label">Total</span>
                        <span className="value">
                          ₹{totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBookNow}
                  className="btn btn-success btn-block btn-lg"
                  disabled={timingSlotArr.length === 0}
                >
                  {timingSlotArr.length === 0 ? (
                    'Select a time slot'
                  ) : (
                    <>
                      <i className="fa fa-calendar-check me-2"></i>
                      Continue to payment
                    </>
                  )}
                </button>
              </div>
            </aside>
          </div>
        </div>

        {/* Login modal (custom, modern) */}
        {showLoginModal && (
          <div
            className="login-modal-overlay"
            onClick={() => setShowLoginModal(false)}
          >
            <div
              className="login-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="login-modal-icon">
                <i className="fa fa-user-lock"></i>
              </div>
              <h3>Login to continue</h3>
              <p>
                You need to be signed in to book a turf slot. It only takes a
                moment.
              </p>
              <div className="login-modal-actions">
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="btn btn-outline-secondary"
                >
                  Cancel
                </button>
                <button onClick={goToLogin} className="btn btn-primary">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
  }

  export default Turfs