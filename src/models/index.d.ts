import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Blog {
  readonly id: string;
  readonly name: string;
  readonly posts?: Post[];
  constructor(init: ModelInit<Blog>);
  static copyOf(source: Blog, mutator: (draft: MutableModel<Blog>) => MutableModel<Blog> | void): Blog;
}

export declare class Post {
  readonly id: string;
  readonly title: string;
  readonly blog?: Blog;
  readonly comments?: Comment[];
  constructor(init: ModelInit<Post>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}

export declare class Comment {
  readonly id: string;
  readonly content?: string;
  readonly post?: Post;
  constructor(init: ModelInit<Comment>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment>) => MutableModel<Comment> | void): Comment;
}

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
  constructor(init: ModelInit<Skill>);
  static copyOf(source: Skill, mutator: (draft: MutableModel<Skill>) => MutableModel<Skill> | void): Skill;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role?: string;
  constructor(init: ModelInit<User>);
  static copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

export declare class Admin {
  readonly id: string;
  readonly email: string;
  readonly members?: Principal[];
  constructor(init: ModelInit<Admin>);
  static copyOf(source: Admin, mutator: (draft: MutableModel<Admin>) => MutableModel<Admin> | void): Admin;
}

export declare class Principal {
  readonly id: string;
  readonly email: string;
  readonly admin?: Admin;
  readonly members?: string[];
  constructor(init: ModelInit<Principal>);
  static copyOf(source: Principal, mutator: (draft: MutableModel<Principal>) => MutableModel<Principal> | void): Principal;
}

export declare class Mentor {
  readonly id: string;
  readonly email: string;
  readonly members?: string[];
  constructor(init: ModelInit<Mentor>);
  static copyOf(source: Mentor, mutator: (draft: MutableModel<Mentor>) => MutableModel<Mentor> | void): Mentor;
}

export declare class Teacher {
  readonly id: string;
  readonly email: string;
  readonly members?: string[];
  constructor(init: ModelInit<Teacher>);
  static copyOf(source: Teacher, mutator: (draft: MutableModel<Teacher>) => MutableModel<Teacher> | void): Teacher;
}

export declare class Student {
  readonly id: string;
  readonly name: string;
  readonly activities?: string[];
  constructor(init: ModelInit<Student>);
  static copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}

export declare class Activity {
  readonly id: string;
  readonly skill: string;
  readonly datetime: string;
  readonly rate: string;
  constructor(init: ModelInit<Activity>);
  static copyOf(source: Activity, mutator: (draft: MutableModel<Activity>) => MutableModel<Activity> | void): Activity;
}

export declare class Employee {
  readonly id: string;
  readonly name: string;
  readonly startDate: string;
  readonly phoneNumber: string;
  readonly warehouseID: string;
  readonly jobTitle: string;
  readonly newHire: string;
  constructor(init: ModelInit<Employee>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee>) => MutableModel<Employee> | void): Employee;
}

export declare class Warehouse {
  readonly id: string;
  readonly employees?: Employee[];
  constructor(init: ModelInit<Warehouse>);
  static copyOf(source: Warehouse, mutator: (draft: MutableModel<Warehouse>) => MutableModel<Warehouse> | void): Warehouse;
}