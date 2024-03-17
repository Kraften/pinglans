import React, { useEffect, useRef } from "react";
import styles from "./events.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendarComponent from "../calendar-components/calendar-page";

const Events: React.FC = () => {
  const headerRef = useRef([]);

  useEffect(() => {
    const anim = gsap.to(
      headerRef.current,
      // { autoAlpha: 0, opacity: 0, y: 150 },
      {
        duration: 1.5,
        ease: "power2",
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        opacity: 1,
        y: 0,
      }
    );
    ScrollTrigger.create({
      trigger: headerRef.current,
      animation: anim,
      // toggleActions: "play none none none",
      start: "top bottom",
      // end: "bottom bottom",
      once: true,
    });
  }, [headerRef]);
  return (
    <section className={styles.wrapper}>
      <div className={styles.headerWrapper}>
        <h1 className={` ${styles.workHeader}`} ref={headerRef}>
          Events
        </h1>
      </div>
      <CalendarComponent></CalendarComponent>
    </section>
  );
};

export default Events;
