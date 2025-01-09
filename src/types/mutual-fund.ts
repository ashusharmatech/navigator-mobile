export interface MutualFundScheme {
  schemeCode: number;
  schemeName: string;
}

export interface NAVData {
  date: string;
  nav: string;
}

export interface SchemeDetails {
  meta: {
    fund_house: string;
    scheme_type: string;
    scheme_category: string;
    scheme_code: number;
    scheme_name: string;
  };
  data: NAVData[];
  status: string;
}