/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSkillSet = `query GetSkillSet($id: ID!, $limit: Int) {
  getSkillSet(id: $id) {
    id
    name
    skills(limit: $limit) {
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
      skills(limit: $limit) {
        items {
          id
          name
        }
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
    name
    note
    members {
      items {
        id
        email
        name
        note
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
      name
      note
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
    name
    note
    admin {
      id
      email
      name
      note
      members {
        nextToken
      }
    }
    members {
      items {
        id
        email
        name
        note
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
      name
      note
      admin {
        id
        email
        name
        note
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
    name
    note
    principal {
      id
      email
      name
      note
      admin {
        id
        email
        name
        note
      }
      members {
        nextToken
      }
    }
    members {
      items {
        id
        email
        name
        note
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
      name
      note
      principal {
        id
        email
        name
        note
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
    name
    note
    mentor {
      id
      email
      name
      note
      principal {
        id
        email
        name
        note
      }
      members {
        nextToken
      }
    }
    members {
      items {
        id
        name
        note
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
      name
      note
      mentor {
        id
        email
        name
        note
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
    note
    teacher {
      id
      email
      name
      note
      mentor {
        id
        email
        name
        note
      }
      members {
        nextToken
      }
    }
    records {
      items {
        id
        skillId
        note
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
      note
      teacher {
        id
        email
        name
        note
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
    skillId
    note
    student {
      id
      name
      note
      teacher {
        id
        email
        name
        note
      }
      records {
        nextToken
      }
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
      skillId
      note
      student {
        id
        name
        note
      }
    }
    nextToken
  }
}
`;
export const getActivity = `query GetActivity($id: ID!) {
  getActivity(id: $id) {
    id
    recordId
    datetime
    rate
    note
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
      recordId
      datetime
      rate
      note
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
      name
      note
      members {
        items {
          id
          email
          name
          note
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getPrincipalByEmail = `query GetPrincipalByEmail(
  $email: String
  $sortDirection: ModelSortDirection
  $filter: ModelPrincipalFilterInput
  $limit: Int
  $nextToken: String
) {
  getPrincipalByEmail(
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
      note
      admin {
        id
        email
        name
        note
      }
      members {
        items {
          id
          email
          name
          note
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getMentorByEmail = `query GetMentorByEmail(
  $email: String
  $sortDirection: ModelSortDirection
  $filter: ModelMentorFilterInput
  $limit: Int
  $nextToken: String
) {
  getMentorByEmail(
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
      note
      principal {
        id
        email
        name
        note
      }
      members {
        items {
          id
          email
          name
          note
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getTeacherByEmail = `query GetTeacherByEmail(
  $email: String
  $sortDirection: ModelSortDirection
  $filter: ModelTeacherFilterInput
  $limit: Int
  $nextToken: String
) {
  getTeacherByEmail(
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
      note
      mentor {
        id
        email
        name
        note
      }
      members {
        items {
          id
          name
          note
        }
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getActivitiesByRecordId = `query GetActivitiesByRecordId(
  $recordId: String
  $sortDirection: ModelSortDirection
  $filter: ModelActivityFilterInput
  $limit: Int
  $nextToken: String
) {
  getActivitiesByRecordId(
    recordId: $recordId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      recordId
      datetime
      rate
      note
    }
    nextToken
  }
}
`;
