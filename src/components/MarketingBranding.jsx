import React from 'react';
import { Target, Search, Share2, Palette } from 'lucide-react';
import './MarketingBranding.css';

const marketingServices = [
  {
    title: "Search Engine Optimization (SEO)",
    description: "Boost your organic visibility and drive high-intent traffic to your website. We implement technical, on-page, and off-page strategies to dominate search rankings.",
    icon: <Search size={28} className="service-icon-svg" />,
    color: "#E4403B"
  },
  {
    title: "Social Media Marketing",
    description: "Build a loyal community and elevate brand awareness. Our engaging content and strategic campaigns connect you with your target audience across all major platforms.",
    icon: <Share2 size={28} className="service-icon-svg" />,
    color: "#2D3E50"
  },
  {
    title: "Branding & Identity",
    description: "Craft a memorable and impactful brand presence. From logos to comprehensive visual systems, we ensure your brand resonates and stands out in the market.",
    icon: <Palette size={28} className="service-icon-svg" />,
    color: "#E4403B"
  },
  {
    title: "Paid Advertising (PPC)",
    description: "Maximize your ROI with data-driven ad campaigns. We expertly manage Google Ads and Meta Ads to deliver instant, high-quality leads and conversions.",
    icon: <Target size={28} className="service-icon-svg" />,
    color: "#2D3E50"
  }
];

const MarketingBranding = () => {
  return (
    <section className="marketing-section">
      <div className="container">
        <div className="marketing-header">
          <span className="section-tag animate-fade-in">Digital Growth Strategy</span>
          <h2 className="section-title animate-fade-in">
            Marketing & <span className="text-gradient">Branding</span>
          </h2>
          <p className="marketing-intro animate-fade-in">
            We don’t just build products; we build successful brands. Our comprehensive digital marketing and strategic branding services are engineered to scale your audience, increase engagement, and drive measurable revenue growth.
          </p>
        </div>

        <div className="marketing-grid">
          {marketingServices.map((service, index) => (
            <div 
              className="marketing-card" 
              key={index}
              style={{"--theme-color": service.color}}
            >
              <div className="card-icon-wrapper">
                {service.icon}
              </div>
              <h3 className="card-title">{service.title}</h3>
              <p className="card-desc">{service.description}</p>
              <div className="card-hover-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketingBranding;
