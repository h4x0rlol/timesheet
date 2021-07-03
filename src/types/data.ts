export interface monthToiletData {
  goings: number;
  days: number;
  averageGoings: string;
  averageToiletTime: string;
  successfull: number;
  notSuccessfull: number;
  neutral: number;
  successfullPercent: string;
  daysSkiped: number;
  averageRating: string;
  diarrheas: number;
  constipations: number;
  normals: number;
  enemas: number;
  laxatives: number;
  monthTime: string;
}

export interface dayToiletData {
  goings: number;
  dayTime: string;
  averageRating: string;
  diarrheas: number;
  constipations: number;
  normals: number;
  enemas: number;
  laxatives: number;
  comments: string[];
}

export interface weekToiletData {
  goings: number;
  days: number;
  averageGoings: string;
  averageToiletTime: string;
  successfull: number;
  notSuccessfull: number;
  neutral: number;
  successfullPercent: string;
  daysSkiped: number;
  averageRating: string;
  diarrheas: number;
  constipations: number;
  normals: number;
  enemas: number;
  laxatives: number;
  weekTime: string;
}

export interface yearToiletData {
  goings: number;
  days: number;
  averageGoings: string;
  averageToiletTime: string;
  successfull: number;
  notSuccessfull: number;
  neutral: number;
  successfullPercent: string;
  daysSkiped: number;
  averageRating: string;
  diarrheas: number;
  constipations: number;
  normals: number;
  enemas: number;
  laxatives: number;
  yearTime: string;
}

export interface allTimeToiletData {
  goings: number;
  days: number;
  averageGoings: string;
  averageToiletTime: string;
  successfull: number;
  notSuccessfull: number;
  neutral: number;
  successfullPercent: string;
  averageRating: string;
  diarrheas: number;
  constipations: number;
  normals: number;
  enemas: number;
  laxatives: number;
  allTime: string;
}
