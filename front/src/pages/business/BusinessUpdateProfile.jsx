import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import BusinessUpdateProfileSchema from "../../schema/BusinessUpdateProfileSchema";
import { API_URL } from "../../config/Api";

const BusinessUpdateProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  const UpdateProfileFrm = useFormik({
    enableReinitialize: true,
    validationSchema: BusinessUpdateProfileSchema,
    initialValues: {
      name: "",
      email: "",
      contact: "",
    },
    onSubmit: (values) => {
      setSaveError("");
      setIsSaving(true);
      axios
        .put(`${API_URL}/business/updateprofile`, values, {
          headers: {
            Authorization: localStorage.getItem("business_access"),
          },
        })
        .then(() => {
          localStorage.setItem("business_name", values.name);
          navigate("/business/myprofile");
        })
        .catch((err) => {
          setSaveError(
            err?.response?.data?.message ||
              "Could not save your changes. Please try again.",
          );
          setIsSaving(false);
        });
    },
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/business/myprofile`, {
        headers: { Authorization: localStorage.getItem("business_access") },
      })
      .then((response) => {
        UpdateProfileFrm.setValues({
          name: response.data?.name || "",
          email: response.data?.email || "",
          contact: response.data?.contact || "",
        });
        setIsLoading(false);
      })
      .catch(() => {
        setLoadError("Could not load your profile.");
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fld = (name) =>
    UpdateProfileFrm.errors[name] && UpdateProfileFrm.touched[name]
      ? "is-invalid"
      : "";

  return (
    <main className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h1>Edit business profile</h1>
            <p>Update your business name, email, and contact.</p>
          </div>
        </div>

        {loadError && (
          <div className="alert-error" role="alert">
            <i className="fa fa-exclamation-circle"></i>
            <span>{loadError}</span>
          </div>
        )}

        {saveError && (
          <div className="alert-error" role="alert">
            <i className="fa fa-exclamation-circle"></i>
            <span>{saveError}</span>
          </div>
        )}

        {isLoading ? (
          <div
            className="dashboard-panel"
            style={{ maxWidth: "640px", margin: "0 auto" }}
          >
            <div
              className="skeleton skeleton-box w-100 mb-4"
              style={{ height: 56 }}
            ></div>
            <div
              className="skeleton skeleton-box w-100 mb-4"
              style={{ height: 56 }}
            ></div>
            <div
              className="skeleton skeleton-box w-100 mb-4"
              style={{ height: 56 }}
            ></div>
          </div>
        ) : !loadError ? (
          <form
            onSubmit={UpdateProfileFrm.handleSubmit}
            noValidate
            className="dashboard-panel"
            style={{ maxWidth: "640px", margin: "0 auto" }}
          >
            <div className="form-group">
              <label htmlFor="biz-name" className="form-label">
                Business name
              </label>
              <input
                id="biz-name"
                type="text"
                name="name"
                placeholder="e.g. Sharma Turf Club"
                value={UpdateProfileFrm.values.name}
                onChange={UpdateProfileFrm.handleChange}
                onBlur={UpdateProfileFrm.handleBlur}
                className={`form-control ${fld("name")}`}
              />
              {UpdateProfileFrm.errors.name &&
                UpdateProfileFrm.touched.name && (
                  <small className="text-danger">
                    {UpdateProfileFrm.errors.name}
                  </small>
                )}
            </div>

            <div className="form-group">
              <label htmlFor="biz-email" className="form-label">
                Email address
              </label>
              <input
                id="biz-email"
                type="email"
                name="email"
                disabled
                value={UpdateProfileFrm.values.email}
                onChange={UpdateProfileFrm.handleChange}
                className={`form-control ${fld("email")}`}
              />
              <small style={{ color: "var(--color-text-muted)" }}>
                <i className="fa fa-info-circle me-1"></i>
                Email is locked. Contact support to change it.
              </small>
              {UpdateProfileFrm.errors.email &&
                UpdateProfileFrm.touched.email && (
                  <small className="text-danger d-block">
                    {UpdateProfileFrm.errors.email}
                  </small>
                )}
            </div>

            <div className="form-group">
              <label htmlFor="biz-contact" className="form-label">
                Contact number
              </label>
              <input
                id="biz-contact"
                type="tel"
                name="contact"
                placeholder="10-digit mobile"
                value={UpdateProfileFrm.values.contact}
                onChange={UpdateProfileFrm.handleChange}
                onBlur={UpdateProfileFrm.handleBlur}
                className={`form-control ${fld("contact")}`}
              />
              {UpdateProfileFrm.errors.contact &&
                UpdateProfileFrm.touched.contact && (
                  <small className="text-danger">
                    {UpdateProfileFrm.errors.contact}
                  </small>
                )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                justifyContent: "flex-end",
                marginTop: "var(--space-5)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/business/myprofile")}
                className="btn btn-outline-secondary"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="spinner-inline"></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="fa fa-floppy-disk me-2"></i>Save changes
                  </>
                )}
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </main>
  );
};

export default BusinessUpdateProfile;
