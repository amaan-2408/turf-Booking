import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import UserUpdateProfileSchema from "../../schema/UserUpdateProfileSchema";
import { API_URL } from "../../config/Api";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  const UpdateProfileFrm = useFormik({
    enableReinitialize: true,
    validationSchema: UserUpdateProfileSchema,
    initialValues: {
      name: "",
      email: "",
      address: "",
    },
    onSubmit: (values) => {
      setSaveError("");
      setIsSaving(true);
      axios
        .put(`${API_URL}/user/updateprofile`, values, {
          headers: {
            Authorization: localStorage.getItem("user_access"),
          },
        })
        .then(() => {
          localStorage.setItem("name", values.name);
          navigate("/user/myprofile");
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
      .get(`${API_URL}/user/myprofile`, {
        headers: { Authorization: localStorage.getItem("user_access") },
      })
      .then((response) => {
        UpdateProfileFrm.setValues({
          name: response.data?.name || "",
          email: response.data?.email || "",
          address: response.data?.address || "",
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
            <h1>Edit profile</h1>
            <p>Update your name, email, and address.</p>
          </div>
        </div>

        {/* Load error */}
        {loadError && (
          <div className="alert-error" role="alert">
            <i className="fa fa-exclamation-circle"></i>
            <span>{loadError}</span>
          </div>
        )}

        {/* Save error */}
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
              style={{ height: 96 }}
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
              <label htmlFor="profile-name" className="form-label">
                Full name
              </label>
              <input
                id="profile-name"
                type="text"
                name="name"
                placeholder="Your full name"
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
              <label htmlFor="profile-email" className="form-label">
                Email address
              </label>
              <input
                id="profile-email"
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
              <label htmlFor="profile-address" className="form-label">
                Address
              </label>
              <textarea
                id="profile-address"
                name="address"
                rows={3}
                placeholder="Street, area, city"
                value={UpdateProfileFrm.values.address}
                onChange={UpdateProfileFrm.handleChange}
                onBlur={UpdateProfileFrm.handleBlur}
                className={`form-control ${fld("address")}`}
              />
              {UpdateProfileFrm.errors.address &&
                UpdateProfileFrm.touched.address && (
                  <small className="text-danger">
                    {UpdateProfileFrm.errors.address}
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
                onClick={() => navigate("/user/myprofile")}
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

export default UpdateProfile;
