import axios from "axios";
import React, { useEffect, useRef } from "react";
import Album from "../album";
import styles from "./release-list.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { releasesStore } from "../../store/releases-store";

gsap.registerPlugin(ScrollTrigger);

const ReleaseList: React.FC = () => {
  const main = useRef([]);
  const headerRef = useRef(null);

  const [releases, updateReleases] = releasesStore((state) => [
    state.releases,
    state.updateReleases,
  ]);
  const fetchReleases = async () => {
    const res = await axios.get(
      "https://api.discogs.com/artists/4836659/releases",
      {
        params: {
          token: import.meta.env.VITE_PUBLIC_DISCOG_TOKEN,
        },
      }
    );
    const { data } = await res;
    updateReleases(data.releases);
  };
  useEffect(() => {
    if (releases.length === 0) {
      fetchReleases();
    }
  }, [releases]);

  useEffect(() => {
    main.current.forEach((el) => {
      console.log("🚀 ~ main.current.forEach ~ el:", el);
      const anim = gsap.to(el, {
        duration: 1,
        ease: "power2",
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        opacity: 1,
        y: 0,
      });
      ScrollTrigger.create({
        trigger: el,
        // markers: true,
        start: "150px bottom",
        // scrub: true,
        end: "bottom top",
        animation: anim,
        // toggleActions: "play none none none",
        // once: true,
      });
    });
  }, [releases]);

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

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !main.current.includes(el)) {
      main.current.push(el);
    }
  };

  return (
    <div className={styles.listWrapper}>
      <h1 className={`${styles.workHeader}`} ref={headerRef}>
        Work
      </h1>
      <ul className={styles.releaseList}>
        {releases.map((release) => {
          return (
            <div className={styles.mask} key={release.id} ref={addToRefs}>
              <Album {...release} release={release}></Album>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ReleaseList;
