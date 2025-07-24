import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  FaCheck,
  FaHeadphones,
  FaMobile,
  FaMusic,
  FaVolumeUp,
} from "react-icons/fa";
import "./PremiumPage.scss";

function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState("individual");

  const plans = {
    individual: {
      price: "$9.99",
      period: "month",
      title: "Individual",
      features: [
        "Ad-free music listening",
        "Download to listen offline",
        "Play songs in any order",
        "High quality audio",
        "Cancel anytime",
      ],
    },
    student: {
      price: "$4.99",
      period: "month",
      title: "Student",
      features: [
        "Special discount for students",
        "Ad-free music listening",
        "Download to listen offline",
        "Play songs in any order",
        "High quality audio",
      ],
    },
    family: {
      price: "$14.99",
      period: "month",
      title: "Family",
      features: [
        "Up to 6 accounts",
        "Block explicit music",
        "Ad-free music listening",
        "Download to listen offline",
        "Play songs in any order",
      ],
    },
  };

  const benefits = [
    {
      icon: <FaVolumeUp />,
      title: "Ad-free music",
      description: "Enjoy uninterrupted music without any ads.",
    },
    {
      icon: <FaMobile />,
      title: "Offline listening",
      description: "Download your favorite songs and listen anywhere.",
    },
    {
      icon: <FaMusic />,
      title: "Play any song",
      description: "Play any song in any order with no restrictions.",
    },
    {
      icon: <FaHeadphones />,
      title: "High quality audio",
      description: "Experience your music in crystal clear quality.",
    },
  ];

  return (
    <div className="premium-page">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <div className="premium-hero">
            <div className="hero-content">
              <h1>Go Premium. Enjoy music without limits.</h1>
              <p>
                Get access to exclusive features and support the artists you
                love.
              </p>
              <button className="cta-button">Get Started</button>
            </div>
          </div>

          <div className="content-section">
            <h2>Why choose Premium?</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div className="benefit-card" key={index}>
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <h2>Pick your Premium</h2>
            <p className="section-subtitle">
              Listen without limits on your phone, speaker, and other devices.
            </p>

            <div className="plan-selector">
              <button
                className={`plan-tab ${
                  selectedPlan === "individual" ? "active" : ""
                }`}
                onClick={() => setSelectedPlan("individual")}
              >
                Individual
              </button>
              <button
                className={`plan-tab ${
                  selectedPlan === "student" ? "active" : ""
                }`}
                onClick={() => setSelectedPlan("student")}
              >
                Student
              </button>
              <button
                className={`plan-tab ${
                  selectedPlan === "family" ? "active" : ""
                }`}
                onClick={() => setSelectedPlan("family")}
              >
                Family
              </button>
            </div>

            <div className="plan-card">
              <div className="plan-header">
                <h3>{plans[selectedPlan].title}</h3>
                <div className="plan-price">
                  <span className="price">{plans[selectedPlan].price}</span>
                  <span className="period">/{plans[selectedPlan].period}</span>
                </div>
              </div>

              <div className="plan-features">
                {plans[selectedPlan].features.map((feature, index) => (
                  <div className="feature-item" key={index}>
                    <FaCheck className="check-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="cta-button">
                Get {plans[selectedPlan].title}
              </button>

              <div className="plan-terms">
                <p>
                  Terms and conditions apply. 1 month free not available for
                  users who have already tried Premium.
                </p>
              </div>
            </div>
          </div>

          <div className="content-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>How does the free trial work?</h3>
                <p>
                  Try Premium free for 1 month. After, pay only{" "}
                  {plans[selectedPlan].price} per month. Cancel anytime before
                  the trial ends and you won't be charged.
                </p>
              </div>
              <div className="faq-item">
                <h3>How do I cancel my subscription?</h3>
                <p>
                  You can cancel your subscription anytime in your account
                  settings. Your subscription will remain active until the end
                  of the current billing period.
                </p>
              </div>
              <div className="faq-item">
                <h3>What methods of payment can I use?</h3>
                <p>
                  We accept all major credit and debit cards, as well as PayPal
                  in select markets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPage;
