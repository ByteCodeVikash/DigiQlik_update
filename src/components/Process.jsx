import React from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We start by understanding your business goals, target audience, and unique challenges to craft the perfect strategy.",
  },
  {
    number: "02",
    title: "Planning",
    desc: "Our team develops a comprehensive roadmap with clear milestones, timelines, and deliverables tailored to your needs.",
  },
  {
    number: "03",
    title: "Execution",
    desc: "We bring your vision to life with expert implementation, constant communication, and attention to every detail.",
  },
  {
    number: "04",
    title: "Optimization",
    desc: "Continuous monitoring and refinement ensure your project exceeds expectations and delivers measurable results.",
  },
];

const Process = () => {
  return (
    <section id="process" className="process-section">
      <style>{`
        .process-section {
          padding: 60px 20px;
          background:
            radial-gradient(circle at top, rgba(228, 64, 59, 0.22), transparent 35%),
            linear-gradient(180deg, #111111 0%, #080808 100%);
          color: #fff;
          position: relative;
          overflow: hidden;
        }

        .process-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 44px 44px;
          opacity: 0.35;
          pointer-events: none;
        }

        .process-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .process-container .section-header {
          text-align: center;
          margin-bottom: 40px;
          max-width: 760px;
          margin-left: auto;
          margin-right: auto;
        }

        .process-container .section-tag {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(228, 64, 59, 0.1);
          color: #FF6B66;
          border: 1px solid rgba(228, 64, 59, 0.25);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 16px;
        }

        .process-container .section-title {
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 1.1;
          margin: 0 0 14px;
          font-weight: 800;
          color: #f8fafc;
        }

        .process-container .section-subtitle {
          font-size: clamp(1rem, 1.8vw, 1.1rem);
          color: #cbd5e1;
          line-height: 1.7;
          margin: 0;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
        }

        .process-step {
          background: rgba(28, 18, 18, 0.78);
          border: 1px solid rgba(255, 210, 200, 0.1);
          border-radius: 22px;
          padding: 28px 24px;
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          min-height: 240px;
        }

        .process-step:hover {
          transform: translateY(-8px);
          border-color: rgba(228, 64, 59, 0.4);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.38);
        }

        .step-number {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          font-size: 1rem;
          font-weight: 800;
          color: #ffffff;
          background: var(--gradient-primary);
          box-shadow: 0 12px 24px rgba(228, 64, 59, 0.35);
          margin-bottom: 18px;
        }

        .step-title {
          font-size: 1.3rem;
          margin: 0 0 12px;
          font-weight: 700;
          color: #f8fafc;
        }

        .step-desc {
          margin: 0;
          color: #cbd5e1;
          line-height: 1.75;
          font-size: 0.98rem;
        }

        @media (max-width: 992px) {
          .process-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .process-section {
            padding: 50px 18px;
          }
        }

        @media (max-width: 640px) {
          .process-grid {
            grid-template-columns: 1fr;
          }

          .process-container .section-header {
            margin-bottom: 24px;
          }

          .process-step {
            min-height: auto;
            padding: 24px 20px;
          }

          .process-container .section-tag {
            font-size: 13px;
            padding: 7px 14px;
          }
        }
      `}</style>

      <div className="process-container">
        <div className="section-header">
          <span className="section-tag">Our Process</span>
          <h2 className="section-title">How We Work</h2>
          <p className="section-subtitle">
            A proven methodology that delivers exceptional results every time
          </p>
        </div>

        <div className="process-grid">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;