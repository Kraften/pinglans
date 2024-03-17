import { create } from "zustand";
import { Release } from "../contracts";

interface ReleasesState {
  releases: Release[];
  updateReleases: (by: Release[]) => void;
}

export const releasesStore = create<ReleasesState>((set) => ({
  releases: [],
  updateReleases: (releasesList) =>
    set(() => ({
      releases: releasesList,
    })),
}));
