 import { useEffect, useState } from 'react'
  import { NavLink, useNavigate } from 'react-router-dom'
  import axios from 'axios'
  import { API_URL, IMAGE_BASE_URL } from '../../config/Api'

  const MyTurf = () => {
    const [turfs, setTurfs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
      axios
        .get(`${API_URL}/turfs/allturf`, {
          headers: { Authorization: localStorage.getItem('business_access') },
        })
        .then((response) => {
          setTurfs(response.data || [])
          setIsLoading(false)
        })
        .catch(() => {
          setError('Could not load your turfs.')
          setIsLoading(false)
        })
    }, [])

    const goToMyBooking = (id) => {
      navigate(`/business/myturf/booking/${id}`)
    }

    const formatPrice = (n) =>
      typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '-'

    return (
      <main className="dashboard-page">
        <div className="container">
          <div className="dashboard-header">
            <div>
              <h1>My turfs</h1>
              <p>Manage the turfs you've listed on Game On Turf.</p>
            </div>
            <NavLink to="/business/addturf" className="btn btn-primary">
              <i className="fa fa-plus me-2"></i>Add new turf
            </NavLink>
          </div>

          {isLoading ? (
            <div className="row g-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="card h-100">
                    <div
                      className="skeleton"
                      style={{
                        height: 200,
                        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                      }}
                    ></div>
                    <div className="card-body">
                      <div className="skeleton skeleton-box w-60 mb-3"></div>
                      <div className="skeleton skeleton-box w-80 mb-2"></div>
                      <div className="skeleton skeleton-box w-40"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-exclamation-triangle"></i>
              </div>
              <h3>Couldn't load your turfs</h3>
              <p>{error}</p>
              <button onClick={() => window.location.reload()} className="btn btn-primary">
                Try again
              </button>
            </div>
          ) : turfs.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-futbol"></i>
              </div>
              <h3>No turfs yet</h3>
              <p>
                Add your first turf to start receiving bookings. It only takes a
                couple of minutes.
              </p>
              <NavLink to="/business/addturf" className="btn btn-primary">
                <i className="fa fa-plus me-2"></i>Add your first turf
              </NavLink>
            </div>
          ) : (
            <div className="row g-4">
              {turfs.map((turf) => (
                <div key={turf._id} className="col-lg-4 col-md-6">
                  <article
                    className="card h-100"
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        height: 200,
                        background: 'var(--color-surface)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {turf.image ? (
                        <img
                          src={`${IMAGE_BASE_URL}/turf_images/${turf.image}`}
                          alt={turf.name}
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background:
                              'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%)',
                            color: 'var(--color-text-inverse)',
                            fontSize: '2.5rem',
                          }}
                        >
                          <i className="fa fa-futbol"></i>
                        </div>
                      )}

                      {turf.price ? (
                        <span
                          style={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            background: 'rgba(15, 23, 42, 0.85)',
                            color: 'var(--color-text-inverse)',
                            padding: '0.375rem 0.75rem',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {formatPrice(turf.price)}/hr
                        </span>
                      ) : null}
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h3
                        style={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          margin: '0 0 0.5rem',
                        }}
                      >
                        {turf.name || 'Untitled turf'}
                      </h3>

                      {turf.address && (
                        <p
                          style={{
                            color: 'var(--color-text-muted)',
                            fontSize: '0.875rem',
                            margin: '0 0 0.75rem',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.375rem',
                          }}
                        >
                          <i
                            className="fa fa-location-dot"
                            style={{
                              color: 'var(--color-primary)',
                              marginTop: 3,
                            }}
                          ></i>
                          <span>{turf.address}</span>
                        </p>
                      )}

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem',
                          marginBottom: 'var(--space-4)',
                          fontSize: '0.8125rem',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {turf.time_open && turf.time_close && (
                          <span>
                            <i className="fa fa-clock me-2"></i>
                            {turf.time_open} - {turf.time_close}
                          </span>
                        )}
                        {turf.contact && (
                          <span>
                            <i className="fa fa-phone me-2"></i>
                            {turf.contact}
                          </span>
                        )}
                      </div>

                      <div className="d-flex gap-2 mt-auto">
                        <button
                          onClick={() => goToMyBooking(turf._id)}
                          className="btn btn-primary btn-sm flex-grow-1"
                        >
                          <i className="fa fa-calendar-check me-1"></i>View bookings
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    )
  }

  export default MyTurf