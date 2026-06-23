import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/Api";
import Features from "../components/Features";
import Testimonial from "../components/Testimonial";
import TurfCardView from "../ui/TurfCardView";

const Home = () => {
  const [allTurf, setAllTurf] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/turfs`)
      .then((response) => {
        setAllTurf(response.data || []);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load turfs. Make sure the backend is running.");
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {/* ===== Latest Turfs Section ===== */}
      <section className="section">
        <div className="container">
          {/* Section header */}
          <div className="section-title">
            <span className="eyebrow">Browse</span>
            <h2>Latest turfs near you</h2>
            <p>
              Premium facilities ready to book. Pick your slot, pay online, show
              up and play.
            </p>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="row g-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className="card h-100">
                    <div
                      className="skeleton"
                      style={{
                        height: 220,
                        borderRadius: "var(--radius-md) var(--radius-md) 0 0",
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
          )}

          {/* Error state */}
          {error && !isLoading && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-exclamation-triangle"></i>
              </div>
              <h3>Couldn't load turfs</h3>
              <p>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try again
              </button>
            </div>
          )}

          {/* Loaded but empty */}
          {!isLoading && !error && allTurf.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">
                <i className="fa fa-futbol"></i>
              </div>
              <h3>No turfs yet</h3>
              <p>
                Be the first to list your facility. Once businesses add turfs,
                they'll show up here.
              </p>
              <Link to="/business/register" className="btn btn-primary">
                List your turf
              </Link>
            </div>
          )}

          {/* Loaded with turfs */}
          {!isLoading && !error && allTurf.length > 0 && (
            <>
              <div className="row g-4">
                {allTurf.map((item) => (
                  <TurfCardView key={item._id} item={item} />
                ))}
              </div>

              <div
                className="text-center"
                style={{ marginTop: "var(--space-6)" }}
              >
                <Link to="/turfs" className="btn btn-outline-success btn-lg">
                  <i className="fa fa-th-large me-2"></i>
                  Browse all turfs
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ===== Existing sub-sections (unchanged) ===== */}
      <Features />
      <Testimonial />
    </>
  );
};

export default Home;
