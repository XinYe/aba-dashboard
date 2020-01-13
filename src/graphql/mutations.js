/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSkillSet = `mutation CreateSkillSet(
  $input: CreateSkillSetInput!
  $condition: ModelSkillSetConditionInput
) {
  createSkillSet(input: $input, condition: $condition) {
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
export const updateSkillSet = `mutation UpdateSkillSet(
  $input: UpdateSkillSetInput!
  $condition: ModelSkillSetConditionInput
) {
  updateSkillSet(input: $input, condition: $condition) {
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
export const deleteSkillSet = `mutation DeleteSkillSet(
  $input: DeleteSkillSetInput!
  $condition: ModelSkillSetConditionInput
) {
  deleteSkillSet(input: $input, condition: $condition) {
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
export const createSkill = `mutation CreateSkill(
  $input: CreateSkillInput!
  $condition: ModelSkillConditionInput
) {
  createSkill(input: $input, condition: $condition) {
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
export const updateSkill = `mutation UpdateSkill(
  $input: UpdateSkillInput!
  $condition: ModelSkillConditionInput
) {
  updateSkill(input: $input, condition: $condition) {
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
export const deleteSkill = `mutation DeleteSkill(
  $input: DeleteSkillInput!
  $condition: ModelSkillConditionInput
) {
  deleteSkill(input: $input, condition: $condition) {
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
export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    email
    name
    role
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    email
    name
    role
  }
}
`;
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    email
    name
    role
  }
}
`;
export const createAdmin = `mutation CreateAdmin(
  $input: CreateAdminInput!
  $condition: ModelAdminConditionInput
) {
  createAdmin(input: $input, condition: $condition) {
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
export const updateAdmin = `mutation UpdateAdmin(
  $input: UpdateAdminInput!
  $condition: ModelAdminConditionInput
) {
  updateAdmin(input: $input, condition: $condition) {
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
export const deleteAdmin = `mutation DeleteAdmin(
  $input: DeleteAdminInput!
  $condition: ModelAdminConditionInput
) {
  deleteAdmin(input: $input, condition: $condition) {
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
export const createPrincipal = `mutation CreatePrincipal(
  $input: CreatePrincipalInput!
  $condition: ModelPrincipalConditionInput
) {
  createPrincipal(input: $input, condition: $condition) {
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
export const updatePrincipal = `mutation UpdatePrincipal(
  $input: UpdatePrincipalInput!
  $condition: ModelPrincipalConditionInput
) {
  updatePrincipal(input: $input, condition: $condition) {
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
export const deletePrincipal = `mutation DeletePrincipal(
  $input: DeletePrincipalInput!
  $condition: ModelPrincipalConditionInput
) {
  deletePrincipal(input: $input, condition: $condition) {
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
export const createMentor = `mutation CreateMentor(
  $input: CreateMentorInput!
  $condition: ModelMentorConditionInput
) {
  createMentor(input: $input, condition: $condition) {
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
export const updateMentor = `mutation UpdateMentor(
  $input: UpdateMentorInput!
  $condition: ModelMentorConditionInput
) {
  updateMentor(input: $input, condition: $condition) {
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
export const deleteMentor = `mutation DeleteMentor(
  $input: DeleteMentorInput!
  $condition: ModelMentorConditionInput
) {
  deleteMentor(input: $input, condition: $condition) {
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
export const createTeacher = `mutation CreateTeacher(
  $input: CreateTeacherInput!
  $condition: ModelTeacherConditionInput
) {
  createTeacher(input: $input, condition: $condition) {
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
export const updateTeacher = `mutation UpdateTeacher(
  $input: UpdateTeacherInput!
  $condition: ModelTeacherConditionInput
) {
  updateTeacher(input: $input, condition: $condition) {
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
export const deleteTeacher = `mutation DeleteTeacher(
  $input: DeleteTeacherInput!
  $condition: ModelTeacherConditionInput
) {
  deleteTeacher(input: $input, condition: $condition) {
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
export const createStudent = `mutation CreateStudent(
  $input: CreateStudentInput!
  $condition: ModelStudentConditionInput
) {
  createStudent(input: $input, condition: $condition) {
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
export const updateStudent = `mutation UpdateStudent(
  $input: UpdateStudentInput!
  $condition: ModelStudentConditionInput
) {
  updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = `mutation DeleteStudent(
  $input: DeleteStudentInput!
  $condition: ModelStudentConditionInput
) {
  deleteStudent(input: $input, condition: $condition) {
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
export const createRecord = `mutation CreateRecord(
  $input: CreateRecordInput!
  $condition: ModelRecordConditionInput
) {
  createRecord(input: $input, condition: $condition) {
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
export const updateRecord = `mutation UpdateRecord(
  $input: UpdateRecordInput!
  $condition: ModelRecordConditionInput
) {
  updateRecord(input: $input, condition: $condition) {
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
export const deleteRecord = `mutation DeleteRecord(
  $input: DeleteRecordInput!
  $condition: ModelRecordConditionInput
) {
  deleteRecord(input: $input, condition: $condition) {
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
export const createActivity = `mutation CreateActivity(
  $input: CreateActivityInput!
  $condition: ModelActivityConditionInput
) {
  createActivity(input: $input, condition: $condition) {
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
export const updateActivity = `mutation UpdateActivity(
  $input: UpdateActivityInput!
  $condition: ModelActivityConditionInput
) {
  updateActivity(input: $input, condition: $condition) {
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
export const deleteActivity = `mutation DeleteActivity(
  $input: DeleteActivityInput!
  $condition: ModelActivityConditionInput
) {
  deleteActivity(input: $input, condition: $condition) {
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
