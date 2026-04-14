export interface IScoreStatus {
  bg: string;
  title: string;
}

export const getChatBotScore = (score: number): IScoreStatus => {
  if (score >= 80) {
    return {
      bg: 'rgba(56, 178, 172, 1)',
      title: 'Высоко',
    };
  } 
  else if (score >= 50) {
    return {
      bg: 'rgba(236, 201, 75, 1)',
      title: 'Средне',
    };
  } 
  else {
    return {
      bg: 'rgba(160, 174, 192, 1)',
      title: 'Низко',
    };
  }
};

export const getResumeScore = (score: number): IScoreStatus => {
  if (score >= 0.5) {
    return {
      bg: 'rgba(56, 178, 172, 1)',
      title: 'Высокая',
    };
  } 
  else if (score >= 0.8) {
    return {
      bg: 'rgba(236, 201, 75, 1)',
      title: 'Средняя',
    };
  } 
  else {
    return {
      bg: 'rgba(160, 174, 192, 1)',
      title: 'Низкая',
    };
  }
};
