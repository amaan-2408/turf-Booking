import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/Api'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('pending') // 'pending' | 'success' | 'failed'
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (!sessionId) {
      // User hit /payment-success directly without going through Stripe.
      setStatus('failed')
      setErrorMsg('No Stripe session found in URL.')
      return
    }

    // Local-dev fallback: Stripe can't reach our webhook on localhost without
    // a tunnel, so we tell the backend "go look up that session and create
    // the booking yourself." Idempotent — if the webhook already fired, this
    // is a no-op.
    axios
      .post(
        `${API_URL}/payment/finalize-booking`,
        { session_id: sessionId },
        { headers: { Authorization: localStorage.getItem('user_access') } }
      )
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('failed')
        setErrorMsg(
          err.response?.data?.message ||
            'Could not finalize your booking. Please contact support if you were charged.'
        )
      })
  }, [searchParams])

  if (status === 'pending') {
    return (
      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div
          className="empty-state"
          style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}
        >
          <div className="empty-state-icon">
            <i className="fa fa-spinner fa-spin"></i>
          </div>
          <h3>Finalizing your booking...</h3>
          <p>Hang tight — we're confirming your payment with Stripe.</p>
        </div>
      </main>
    )
  }

  if (status === 'failed') {
    return (
      <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div
          className="empty-state"
          style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}
        >
          <div className="empty-state-icon" style={{ color: 'var(--color-danger, #dc2626)' }}>
            <i className="fa fa-circle-exclamation"></i>
          </div>
          <h3>Booking not confirmed</h3>
          <p>
            {errorMsg ||
              "We couldn't confirm your booking. If you were charged, please contact support."}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <Link to="/user/mybooking" className="btn btn-outline-secondary">
              My bookings
            </Link>
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div
        className="empty-state"
        style={{ maxWidth: 540, margin: '0 auto', textAlign: 'center' }}
      >
        <div
          className="empty-state-icon"
          style={{ color: 'var(--color-success, #16a34a)', fontSize: '4rem' }}
        >
          <i className="fa fa-circle-check"></i>
        </div>
        <h1>Payment Successful 🎉</h1>
        <p>Your booking is confirmed. You can view it in My Bookings.</p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Link to="/user/mybooking" className="btn btn-primary">
            <i className="fa fa-calendar-check me-2"></i>My bookings
          </Link>
          <Link to="/" className="btn btn-outline-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PaymentSuccess