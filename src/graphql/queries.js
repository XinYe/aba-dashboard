/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSkillSet = `query GetSkillSet($id: ID!) {
  getSkillSet(id: $id) {
    id
    name
    skills {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const listSkillSets = `query ListSkillSets(
  $filter: ModelSkillSetFilterInput
  $limit: Int
  $nextToken: String
) {
  listSkillSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      skills {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getSkill = `query GetSkill($id: ID!) {
  getSkill(id: $id) {
    id
    name
    skillset {
      id
      name
      skills {
        nextToken
      }
    }
  }
}
`;
export const listSkills = `query ListSkills(
  $filter: ModelSkillFilterInput
  $limit: Int
  $nextToken: String
) {
  listSkills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      skillset {
        id
        name
      }
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    name
    role
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      name
      role
    }
    nextToken
  }
}
`;
export const getAdmin = `query GetAdmin($id: ID!) {
  getAdmin(id: $id) {
    id
    email
    members {
      items {
        id
        email
      }
      nextToken
    }
  }
}
`;
export const listAdmins = `query ListAdmins(
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      members {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPrincipal = `query GetPrincipal($id: ID!) {
  getPrincipal(id: $id) {
    id
    email
    admin {
      id
      email
      members {
        nextToken
      }
    }
    members {
      items {
        id
        email
      }
      nextToken
    }
  }
}
`;
export const listPrincipals = `query ListPrincipals(
  $filter: ModelPrincipalFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrincipals(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      admin {
        id
        email
      }
      members {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getMentor = `query GetMentor($id: ID!) {
  getMentor(id: $id) {
    id
    email
    principal {
      id
      email
      admin {
        id
        email
      }
      members {
        nextToken
      }
    }
    members {
      items {
        id
        email
      }
      nextToken
    }
  }
}
`;
export const listMentors = `query ListMentors(
  $filter: ModelMentorFilterInput
  $limit: Int
  $nextToken: String
) {
  listMentors(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      principal {
        id
        email
      }
      members {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTeacher = `query GetTeacher($id: ID!) {
  getTeacher(id: $id) {
    id
    email
    mentor {
      id
      email
      principal {
        id
        email
      }
      members {
        nextToken
      }
    }
    members {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const listTeachers = `query ListTeachers(
  $filter: ModelTeacherFilterInput
  $limit: Int
  $nextToken: String
) {
  listTeachers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      mentor {
        id
        email
      }
      members {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getStudent = `query GetStudent($id: ID!) {
  getStudent(id: $id) {
    id
    name
    teacher {
      id
      email
      mentor {
        id
        email
      }
      members {
        nextToken
      }
    }
    records {
      items {
        id
      }
      nextToken
    }
  }
}
`;
export const listStudents = `query ListStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      teacher {
        id
        email
      }
      records {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getRecord = `query GetRecord($id: ID!) {
  getRecord(id: $id) {
    id
    skill {
      id
      name
      skillset {
        id
        name
      }
    }
    student {
      id
      name
      teacher {
        id
        email
      }
      records {
        nextToken
      }
    }
    activities {
      items {
        id
        datetime
        rate
      }
      nextToken
    }
  }
}
`;
export const listRecords = `query ListRecords(
  $filter: ModelRecordFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      skill {
        id
        name
      }
      student {
        id
        name
      }
      activities {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    datetime
    rate
    record {
      id
      skill {
        id
        name
      }
      student {
        id
        name
      }
      activities {
        nextToken
      }
    }
  }
}
`;
export const listActivitys = `query ListActivitys(
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      datetime
      rate
      record {
        id
      }
    }
    nextToken
  }
}
`;
export const getUserByEmail = `query GetUserByEmail(
  $email: String
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  getUserByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      name
      role
    }
    nextToken
  }
}
`;
export const getAdminByEmail = `query GetAdminByEmail(
  $email: String
  $sortDirection: ModelSortDirection
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
) {
  getAdminByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      members {
        nextToken
      }
    }
    nextToken
  }
}
`;
