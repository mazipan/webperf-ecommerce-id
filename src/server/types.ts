export interface EcommerceItem {
  name: string;
  urlDesktop: string;
  urlMobile: string;
  logo: string;
}

export interface LHResponse {
	perf: number;
	aiiy: number;
	pwa: number;

	fcp: number;
	ttfb: number;
	tti: number;
	si: number;

	reqCount: number;
	reqSize: number;
	name: string;
	device: string;
}
