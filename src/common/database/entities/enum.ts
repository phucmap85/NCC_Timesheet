export enum UserType {
  NONE = 0,
  STAFF = 1,
  INTERNSHIP = 2,
  COLLABORATOR = 3
}

export enum Sex {
  MALE = 0,
  FEMALE = 1
}

export enum Level {
  intern_0 = 0,
  intern_1 = 1,
  intern_2 = 2,
  intern_3 = 3,
  freshM = 4,
  fresh = 5,
  freshP = 6,
  juniorM = 7,
  junior = 8,
  juniorP = 9,
  middleM = 10,
  middle = 11,
  middleP = 12,
  seniorM = 13,
  senior = 14,
  seniorP = 15
}

export enum Role {
  ADMIN = 0,
  USER = 1,
  PM = 2
}

export enum TimesheetStatus {
  NEW = 0,
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3
}

export enum TypeProjectUser {
  MEMBER = 0,
  PM = 1,
  SHADOW = 2,
  DEACTIVE = 3
}

export enum TypeOfWork {
  NormalWorking = 0,
  Overtime = 1
}

export enum ProjectStatus {
  ACTIVE = 0,
  DEACTIVE = 1
}

export enum ProjectType {
  TandM = 0,
  FixedFrice = 1,
  NonBill = 2,
  ODC = 3,
  Product = 4,
  Training = 5,
  NoSalary = 6
}

export enum TaskType {
  CommonTask = 0,
  OtherTask = 1
}