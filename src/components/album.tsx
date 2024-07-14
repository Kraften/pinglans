import React, { useEffect, useState } from "react";
import styles from "./album.module.scss";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Release } from "../contracts";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  release: Release;
}
interface ReleaseViewModel {
  imgUrl: string;
  linkUri: string;
  title: string;
}

const Album: React.FC<Props> = ({ release }) => {
  const [album, setAlbum] = useState<ReleaseViewModel>();

  const fetchRelease = async () => {
    const res = await axios.get(release.resource_url, {
      params: {
        token: import.meta.env.VITE_PUBLIC_DISCOG_TOKEN,
      },
    });

    const { data } = await res;
    setAlbum({
      imgUrl: data.images[0].uri,
      linkUri: data.uri,
      title: data.title,
    });
  };

  useEffect(() => {
    fetchRelease();
  }, []);

  const onAlbumClick = () => {
    window.open(album?.linkUri, "_blank");
  };

  return (
    <li>
      {release && (
        <div className={`${styles.release}`}>
          <img
            onClick={() => onAlbumClick()}
            alt={album?.title}
            width={500}
            height={500}
            src={album?.imgUrl}
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
