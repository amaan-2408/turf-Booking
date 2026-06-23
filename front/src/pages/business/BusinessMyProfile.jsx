import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/Api";

const BusinessMyProfile = () => {
  const [business, setBusiness] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/business/myprofile`, {
        headers: { Authorization: localStorage.getItem("business_access") },
      })
      .then((response) => {
        setBusiness(response.data || {});
        setIsLoading(false);
      })
      .catch(() => {
        setError("Could not load your profile.");
        setIsLoading(false);
      });
  }, []);

  const initials = (business?.name || "?")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>My profile</h1>
            <p>Your business account details at a glance.</p>
          </div>
          <Link to="/business/updateprofile" className="btn btn-primary">
            <i className="fa fa-pen-to-square me-2"></i>Edit profile
          </Link>
        </div>

        {isLoading && (
          <div
            className="dashboard-panel"
            style={{ maxWidth: "720px", margin: "0 auto" }}
          >
            <div className="d-flex align-items-center gap-4 mb-4">
              <div
                className="skeleton"
                style={{ width: 96, height: 96, borderRadius: "50%" }}
              ></div>
              <div className="flex-grow-1">
                <div
                  className="skeleton skeleton-box w-50 mb-2"
                  style={{ height: 20 }}
                ></div>
                <div
                  className="skeleton skeleton-box w-30"
                  style={{ height: 14 }}
                ></div>
              </div>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton skeleton-box w-100 mb-3"></div>
            ))}
          </div>
        )}

        {error && !isLoading && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <i className="fa fa-exclamation-triangle"></i>
            </div>
            <h3>Couldn't load your profile</h3>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && business && (
          <div
            className="dashboard-panel"
            style={{ maxWidth: "720px", margin: "0 auto" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                paddingBottom: "var(--space-5)",
                marginBottom: "var(--space-5)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
                  color: "var(--color-text-inverse)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  flexShrink: 0,
                }}
              >
                {initials}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    margin: "0 0 0.25rem",
                  }}
                >
                  {business.name || "Unnamed business"}
                </h2>
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "0.9375rem",
                    margin: 0,
                  }}
                >
                  <i className="fa fa-building me-2"></i>Business account
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-4)",
              }}
            >
              <ProfileField
                icon="fa-envelope"
                label="Email"
                value={business.email}
              />
              <ProfileField
                icon="fa-phone"
                label="Contact number"
                value={business.contact}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-3)",
      padding: "var(--space-3)",
      borderRadius: "var(--radius)",
      background: "var(--color-surface)",
    }}
  >
    <div
      style={{
        width: 36,
        height: 36,
        borderRadius: "var(--radius-sm)",
        background: "var(--color-primary-light)",
        color: "var(--color-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <i className={`fa ${icon}`}></i>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--color-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: "0.125rem",
        }}
      >
        {label}
      </div>
      <div style={{ fontWeight: 500, wordBreak: "break-word" }}>
        {value || (
          <span style={{ color: "var(--color-text-muted)" }}>Not set</span>
        )}
      </div>
    </div>
  </div>
);

export default BusinessMyProfile;
