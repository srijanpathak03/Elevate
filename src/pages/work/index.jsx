import React from "react";
import PopularServices from "../../components/Landing/PopularServices";
import WorkHeroBanner from "../../components/Work/WorkHeroBanner";
import HomeBanner from "../../components/Landing/HeroBanner";
import FeaturedGigs from "../../components/Work/WorkFeaturedGigs";
import HowItWorks from "../../components/Work/HowItWorks";
import WorkFooter from "../../components/Work/WorkFooter";

function Work() {
    return (
      <div style={{ margin: 0, padding: 0, position: 'absolute', top: 0, left: 0, right: 0 }}>
        <WorkHeroBanner />
        <HowItWorks/>
        <FeaturedGigs/>
        <WorkFooter/>
      </div>
    );
  }

export default Work;
