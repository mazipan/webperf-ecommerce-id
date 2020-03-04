export interface EcommerceItem {
  name: string;
  urlDesktop: string;
  urlMobile: string;
  logo: string;
}

export interface LHResponse {
	perf: number;

	fcp: number;
	fci: number;
  ttfb: number;
  tti: number;
	si: number;

	size:number;
	req: number;

  name: string;
  device: string;
}
