export type monthToiletData = {
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
};

export type dayToiletData = {
  goings: number;
  dayTime: string;
  averageRating: string;
  diarrheas: number;
  constipations: number;
  normals: number;
  enemas: number;
  laxatives: number;
  comments: string[];
};

export type weekToiletData = {
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
};

export type yearToiletData = {
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
};

export type allTimeToiletData = {
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
};
