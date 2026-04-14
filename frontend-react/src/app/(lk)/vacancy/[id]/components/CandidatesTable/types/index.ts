export enum ICandidateStatusTitles {
  PROCESS = "Оценка",
  INVITE = "Приглашение",
  REJECT = "Отказ",
  AI_BOT = "Чат-интервью"
}

export interface ICandidateStatus {
  bg: string; /// in rgba
  title: ICandidateStatusTitles; //
}
