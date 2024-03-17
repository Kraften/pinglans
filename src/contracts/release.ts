export interface Release {
  artist: string;
  format: string;
  id: number;
  label: string;
  resource_url: string;
  role: string;
  stats: {
    community: {
      in_collection: number;
      in_wantlist: number;
    };
  };
  status: string;
  thumb: string;
  title: string;
  trackinfo: string;
  type: string;
  year: number;
}
