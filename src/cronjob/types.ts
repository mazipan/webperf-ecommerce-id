export interface EcommerceItem {
  name: string;
  urlDesktop: string;
  urlMobile: string;
  logo: string;
}

export interface LHResponse {
	perf: number;

	lcp?: number;
	fcp?: number;
	cls?: number;
	fci: number;
  ttfb: number;
  tti: number;
	si: number;

	size:number;
	req: number;

  name: string;
  device: string;
}
