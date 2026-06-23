import { useRef, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTurfSchema from "../../schema/AddTurfSchema";
import { API_URL } from "../../config/Api";

// Generate a sensible list of time options for the opening hours picker.
// Returns labels like "06:00 AM" — also returned in 24h format for storage.
const TIME_OPTIONS = (() => {
  const arr = [];
  for (let h = 0; h < 24; h++) {
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const meridiem = h < 12 ? "AM" : "PM";
    const label = `${hour12.toString().padStart(2, "0")}:00 ${meridiem}`;
    // Store as 24h "HH:00 AM/PM" so the backend can parse it consistently
    const value = `${h.toString().padStart(2, "0")}:00 ${meridiem}`;
    arr.push({ label, value });
  }
  return arr;
})();

const AddTurfs = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const AddTurfFrm = useFormik({
    validationSchema: AddTurfSchema,
    initialValues: {
      name: "",
      price: "",
      address: "",
      contact: "",
      detail: "",
      lat: "",
      long: "",
      time_open: "",
      time_close: "",
    },
    onSubmit: (values) => {
      const file = fileInputRef.current?.files?.[0];
      if (!file) {
        setSubmitError("Please choose a turf image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("address", values.address);
      formData.append("contact", values.contact);
      formData.append("detail", values.detail);
      formData.append("lat", values.lat);
      formData.append("long", values.long);
      formData.append("time_open", values.time_open);
      formData.append("time_close", values.time_close);

      setIsSubmitting(true);
      setSubmitError("");

      axios
        .post(`${API_URL}/turfs`, formData, {
          headers: {
            Authorization: localStorage.getItem("business_access"),
          },
        })
        .then(() => {
          navigate("/business/myturf");
        })
        .catch((err) => {
          setSubmitError(
            err?.response?.data?.message ||
              "Could not save your turf. Please try again.",
          );
          setIsSubmitting(false);
        });
    },
  });

  // Show a live preview of the chosen image before uploading
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImagePreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const fld = (name) =>
    AddTurfFrm.errors[name] && AddTurfFrm.touched[name] ? "is-invalid" : "";

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Add a new turf</h1>
            <p>
              List a new facility on Game On Turf. Customers will be able to
              find and book it within minutes.
            </p>
          </div>
        </div>

        {/* Error banner */}
        {submitError && (
          <div
            className="alert-error"
            role="alert"
            style={{ marginBottom: "var(--space-4)" }}
          >
            <i className="fa fa-exclamation-circle"></i>
            <span>{submitError}</span>
          </div>
        )}

        <form
          onSubmit={AddTurfFrm.handleSubmit}
          noValidate
          className="dashboard-panel"
          style={{ maxWidth: "880px", margin: "0 auto" }}
        >
          {/* ===== Section 1: Basics ===== */}
          <section style={{ marginBottom: "var(--space-6)" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
                margin: "0 0 var(--space-4)",
              }}
            >
              <i className="fa fa-info-circle me-2"></i>Basics
            </h2>

            <div className="row g-3">
              <div className="col-md-8">
                <label htmlFor="turf-name" className="form-label">
                  Turf name
                </label>
                <input
                  id="turf-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Sharma Turf Club"
                  value={AddTurfFrm.values.name}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("name")}`}
                />
                {AddTurfFrm.errors.name && AddTurfFrm.touched.name && (
                  <small className="text-danger">
                    {AddTurfFrm.errors.name}
                  </small>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="turf-price" className="form-label">
                  Price per hour (₹)
                </label>
                <input
                  id="turf-price"
                  type="number"
                  name="price"
                  min="0"
                  step="50"
                  placeholder="800"
                  value={AddTurfFrm.values.price}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("price")}`}
                />
                {AddTurfFrm.errors.price && AddTurfFrm.touched.price && (
                  <small className="text-danger">
                    {AddTurfFrm.errors.price}
                  </small>
                )}
              </div>
            </div>
          </section>

          {/* ===== Section 2: Location ===== */}
          <section style={{ marginBottom: "var(--space-6)" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
                margin: "0 0 var(--space-4)",
              }}
            >
              <i className="fa fa-map-marker-alt me-2"></i>Location &amp;
              contact
            </h2>

            <div className="row g-3">
              <div className="col-md-8">
                <label htmlFor="turf-address" className="form-label">
                  Address
                </label>
                <textarea
                  id="turf-address"
                  name="address"
                  rows={2}
                  placeholder="Street, area, city"
                  value={AddTurfFrm.values.address}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("address")}`}
                />
                {AddTurfFrm.errors.address && AddTurfFrm.touched.address && (
                  <small className="text-danger">
                    {AddTurfFrm.errors.address}
                  </small>
                )}
              </div>

              <div className="col-md-4">
                <label htmlFor="turf-contact" className="form-label">
                  Contact number
                </label>
                <input
                  id="turf-contact"
                  type="tel"
                  name="contact"
                  placeholder="10-digit mobile"
                  value={AddTurfFrm.values.contact}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("contact")}`}
                />
                {AddTurfFrm.errors.contact && AddTurfFrm.touched.contact && (
                  <small className="text-danger">
                    {AddTurfFrm.errors.contact}
                  </small>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="turf-lat" className="form-label">
                  Latitude{" "}
                  <span
                    style={{
                      color: "var(--color-text-muted)",
                      fontWeight: 400,
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <input
                  id="turf-lat"
                  type="number"
                  step="any"
                  name="lat"
                  placeholder="e.g. 22.7196"
                  value={AddTurfFrm.values.lat}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("lat")}`}
                />
                {AddTurfFrm.errors.lat && AddTurfFrm.touched.lat && (
                  <small className="text-danger">{AddTurfFrm.errors.lat}</small>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="turf-long" className="form-label">
                  Longitude{" "}
                  <span
                    style={{
                      color: "var(--color-text-muted)",
                      fontWeight: 400,
                    }}
                  >
                    (optional)
                  </span>
                </label>
                <input
                  id="turf-long"
                  type="number"
                  step="any"
                  name="long"
                  placeholder="e.g. 75.8577"
                  value={AddTurfFrm.values.long}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("long")}`}
                />
                {AddTurfFrm.errors.long && AddTurfFrm.touched.long && (
                  <small className="text-danger">
                    {AddTurfFrm.errors.long}
                  </small>
                )}
              </div>

              <div className="col-12">
                <small style={{ color: "var(--color-text-muted)" }}>
                  <i className="fa fa-circle-info me-1"></i>
                  Need lat/long? Find them on{" "}
                  <a
                    href="https://www.latlong.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--color-primary)", fontWeight: 600 }}
                  >
                    latlong.net
                  </a>
                  . Required by the backend, but used only to show the turf on
                  the map.
                </small>
              </div>
            </div>
          </section>

          {/* ===== Section 3: Details ===== */}
          <section style={{ marginBottom: "var(--space-6)" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
                margin: "0 0 var(--space-4)",
              }}
            >
              <i className="fa fa-file-lines me-2"></i>Details
            </h2>

            <div className="row g-3">
              <div className="col-12">
                <label htmlFor="turf-detail" className="form-label">
                  Description
                </label>
                <textarea
                  id="turf-detail"
                  name="detail"
                  rows={4}
                  placeholder="Tell players what makes your turf special — surface type, lighting, amenities, parking, etc."
                  value={AddTurfFrm.values.detail}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-control ${fld("detail")}`}
                />
                {AddTurfFrm.errors.detail && AddTurfFrm.touched.detail && (
                  <small className="text-danger">
                    {AddTurfFrm.errors.detail}
                  </small>
                )}
              </div>
            </div>
          </section>

          {/* ===== Section 4: Image + Hours ===== */}
          <section style={{ marginBottom: "var(--space-4)" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
                margin: "0 0 var(--space-4)",
              }}
            >
              <i className="fa fa-clock me-2"></i>Image &amp; operating hours
            </h2>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="turf-image" className="form-label">
                  Cover image
                </label>
                <input
                  id="turf-image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className={`form-control ${fld("image")}`}
                />
                <small
                  style={{
                    color: "var(--color-text-muted)",
                    display: "block",
                    marginTop: "0.25rem",
                  }}
                >
                  Recommended: landscape photo, at least 1200×600 px.
                </small>

                {imagePreview && (
                  <div
                    style={{
                      marginTop: "var(--space-3)",
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      border: "1px solid var(--color-border)",
                      maxHeight: "200px",
                    }}
                  >
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="turf-open" className="form-label">
                  Opens at
                </label>
                <select
                  id="turf-open"
                  name="time_open"
                  value={AddTurfFrm.values.time_open}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-select ${fld("time_open")}`}
                >
                  <option value="">Select opening time</option>
                  {TIME_OPTIONS.map((opt) => (
                    <option key={`open-${opt.value}`} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {AddTurfFrm.errors.time_open &&
                  AddTurfFrm.touched.time_open && (
                    <small className="text-danger">
                      {AddTurfFrm.errors.time_open}
                    </small>
                  )}

                <label
                  htmlFor="turf-close"
                  className="form-label"
                  style={{ marginTop: "var(--space-3)" }}
                >
                  Closes at
                </label>
                <select
                  id="turf-close"
                  name="time_close"
                  value={AddTurfFrm.values.time_close}
                  onChange={AddTurfFrm.handleChange}
                  onBlur={AddTurfFrm.handleBlur}
                  className={`form-select ${fld("time_close")}`}
                >
                  <option value="">Select closing time</option>
                  {TIME_OPTIONS.map((opt) => (
                    <option key={`close-${opt.value}`} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {AddTurfFrm.errors.time_close &&
                  AddTurfFrm.touched.time_close && (
                    <small className="text-danger">
                      {AddTurfFrm.errors.time_close}
                    </small>
                  )}
              </div>
            </div>
          </section>

          {/* ===== Submit ===== */}
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "var(--space-4)",
              display: "flex",
              gap: "var(--space-3)",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/business/myturf")}
              className="btn btn-outline-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-inline"></span>
                  Saving turf...
                </>
              ) : (
                <>
                  <i className="fa fa-plus me-2"></i>Add turf
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AddTurfs;
