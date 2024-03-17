import React, { useEffect } from "react";
import styles from "./album.module.scss";
// import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Release } from "../contracts";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  release: Release;
}

const Album: React.FC<Props> = ({ release }) => {
  // const [albumImgUrl, setAlbumImgUrl] = useState("");
  // const revealRef = useRef();
  // const ref = useRef();

  // const fetchRelease = async () => {
  //   const res = await axios.get(release.resource_url, {
  //     params: {
  //       token: import.meta.env.PUBLIC_DISCOG_TOKEN,
  //     },
  //   });

  //   const { data } = await res;
  //   setAlbumImgUrl(data.images[0].uri);
  // };

  useEffect(() => {
    // fetchRelease();
  }, []);

  return (
    <li>
      {release && (
        <div className={`${styles.release}`}>
          {/* {release && (
            <img
              src={albumImgUrl}
              // priority={true}
              width={400}
              height={400}
              alt="Picture of the a release"
            />
          )} */}
          <img
            alt="aa"
            width={500}
            height={500}
            src={"/a.webp"}
            key={release.id}
          ></img>
          <div className="flex-row">
            <h3>{release.artist}</h3> &nbsp; <p>{` / `}</p>&nbsp;
            <h3>{release.year}</h3>&nbsp;/&nbsp;<h3>{release.title}</h3>
          </div>
        </div>
      )}
    </li>
  );
};

export default Album;
