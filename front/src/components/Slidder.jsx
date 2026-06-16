import { useState } from "react";
import { Carousel } from "react-bootstrap";

// Slide data — easy to add/edit without touching the JSX.
// Add a new object here and the carousel grows automatically.
const slides = [
  {
    id: 1,
    image: "/img/turf-hero.jpg",
    eyebrow: "Ready To Play",
    title: "The Ultimate Sports Hub",
    description:
      "Whether it is a friendly match or a serious tournament, we provide access to top-quality turfs for every sport. No more last-minute searches — just instant bookings and great games.",
    primaryCta: { label: "Book Now", href: "/turfs" },
    secondaryCta: { label: "View Turfs", href: "/turfs" },
  },
  {
    id: 2,
    image: "/img/turf001.jpg",
    eyebrow: "24/7 Online Booking",
    title: "Reserve Your Slot in Seconds",
    description:
      "Pick a date, choose a time, pay online — and you are on the field. No phone calls, no waiting for confirmation, no surprises.",
    primaryCta: { label: "Browse Slots", href: "/turfs" },
    secondaryCta: { label: "How It Works", href: "/about" },
  },
  {
    id: 3,
    image: "/img/foot1.webp",
    eyebrow: "Premium Facilities",
    title: "Top-Tier Turfs, Every Time",
    description:
      "Every turf in our network is verified for quality, lighting, and amenities. Play where the pros play, at prices that work for everyone.",
    primaryCta: { label: "See Turfs", href: "/turfs" },
    secondaryCta: { label: "Sign Up Free", href: "/user/signup" },
  },
];

const Slidder = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="position-relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ marginTop: "-1px" /* avoid 1px gap below sticky header */ }}
    >
      <Carousel
        indicators={true}
        controls={true}
        interval={isPaused ? null : 4500}
        pause="hover"
        fade
      >
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            {/* Background image with dark gradient overlay */}
            <div
              className="d-block w-100"
              style={{
                height: "min(82vh, 700px)",
                minHeight: "480px",
                backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.75) 0%, rgba(16,185,129,0.45) 100%), url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              role="img"
              aria-label={slide.title}
            />

            {/* Caption overlay */}
            <Carousel.Caption
              className="text-start"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                bottom: "auto",
                maxWidth: "780px",
                left: "8%",
                right: "auto",
                textAlign: "left",
              }}
            >
              <span
                className="d-inline-block mb-3"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#10b981",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "9999px",
                  padding: "0.375rem 1rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                {slide.eyebrow}
              </span>
              <h1
                className="fw-bold text-white mb-4"
                style={{
                  fontSize: "clamp(2.25rem, 5.5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                }}
              >
                {slide.title}
              </h1>
              <p
                className="mb-4 text-white"
                style={{
                  fontSize: "1.0625rem",
                  maxWidth: "600px",
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                {slide.description}
              </p>
              <div className="d-flex flex-wrap gap-2">
                <a
                  href={slide.primaryCta.href}
                  className="btn btn-primary btn-lg"
                >
                  {slide.primaryCta.label}
                </a>
                <a
                  href={slide.secondaryCta.href}
                  className="btn btn-outline-light btn-lg"
                >
                  {slide.secondaryCta.label}
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slidder;
