export interface EcommerceItem {
  name: string;
  urlDesktop: string;
  urlMobile: string;
  logo: string;
}

export interface LHResponse {
  perf: number;

  fid: number;
  lcp: number;
  cls: number;

  fcp: number;
  fmp: number;
  fci: number;
  tbt: number;
  tti: number;
  si: number;

  size: number;
  req: number;

  name: string;
  device: string;
}
