import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class SkillSet {
  readonly id: string;
  readonly name: string;
  readonly skills?: Skill[];
  constructor(init: ModelInit<SkillSet>);
  static copyOf(source: SkillSet, mutator: (draft: MutableModel<SkillSet>) => MutableModel<SkillSet> | void): SkillSet;
}

export declare class Skill {
  readonly id: string;
  readonly name: string;
  readonly skillset?: SkillSet;
  readonly records?: Record[];
  constructor(init: ModelInit<Skill>);
  static copyOf(source: Skill, mutator: (draft: MutableModel<Skill>) => MutableModel<Skill> | void): Skill;
}

export declare class Record {
  readonly id: string;
  readonly note?: string;
  readonly student?: Student;
  readonly skill?: Skill;
  readonly activities?: Activity[];
  constructor(init: ModelInit<Record>);
  static copyOf(source: Record, mutator: (draft: MutableModel<Record>) => MutableModel<Record> | void): Record;
}

export declare class Student {
  readonly id: string;
  readonly name: string;
  readonly note?: string;
  readonly teacher?: Teacher;
  readonly records?: Record[];
  constructor(init: ModelInit<Student>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}

export declare class Teacher {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly note?: string;
  readonly mentor?: Mentor;
  readonly members?: Student[];
  constructor(init: ModelInit<Teacher>);
  static copyOf(source: Teacher, mutator: (draft: MutableModel<Teacher>) => MutableModel<Teacher> | void): Teacher;
}

export declare class Mentor {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly note?: string;
  readonly principal?: Principal;
  readonly members?: Teacher[];
  constructor(init: ModelInit<Mentor>);
  static copyOf(source: Mentor, mutator: (draft: MutableModel<Mentor>) => MutableModel<Mentor> | void): Mentor;
}

export declare class Principal {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly note?: string;
  readonly admin?: Admin;
  readonly members?: Mentor[];
  constructor(init: ModelInit<Principal>);
  static copyOf(source: Principal, mutator: (draft: MutableModel<Principal>) => MutableModel<Principal> | void): Principal;
}

export declare class Admin {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly note?: string;
  readonly members?: Principal[];
  constructor(init: ModelInit<Admin>);
  static copyOf(source: Admin, mutator: (draft: MutableModel<Admin>) => MutableModel<Admin> | void): Admin;
}

export declare class Activity {
  readonly id: string;
  readonly datetime: string;
  readonly rate: string;
  readonly note?: string;
  readonly record?: Record;
  constructor(init: ModelInit<Activity>);
  static copyOf(source: Activity, mutator: (draft: MutableModel<Activity>) => MutableModel<Activity> | void): Activity;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}