/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSkillSet = `subscription OnCreateSkillSet {
  onCreateSkillSet {
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
export const onUpdateSkillSet = `subscription OnUpdateSkillSet {
  onUpdateSkillSet {
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
export const onDeleteSkillSet = `subscription OnDeleteSkillSet {
  onDeleteSkillSet {
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
export const onCreateSkill = `subscription OnCreateSkill {
  onCreateSkill {
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
export const onUpdateSkill = `subscription OnUpdateSkill {
  onUpdateSkill {
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
export const onDeleteSkill = `subscription OnDeleteSkill {
  onDeleteSkill {
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
export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    email
    name
    role
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    email
    name
    role
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    email
    name
    role
  }
}
`;
export const onCreateAdmin = `subscription OnCreateAdmin {
  onCreateAdmin {
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
export const onUpdateAdmin = `subscription OnUpdateAdmin {
  onUpdateAdmin {
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
export const onDeleteAdmin = `subscription OnDeleteAdmin {
  onDeleteAdmin {
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
export const onCreatePrincipal = `subscription OnCreatePrincipal {
  onCreatePrincipal {
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
export const onUpdatePrincipal = `subscription OnUpdatePrincipal {
  onUpdatePrincipal {
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
export const onDeletePrincipal = `subscription OnDeletePrincipal {
  onDeletePrincipal {
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
export const onCreateMentor = `subscription OnCreateMentor {
  onCreateMentor {
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
export const onUpdateMentor = `subscription OnUpdateMentor {
  onUpdateMentor {
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
export const onDeleteMentor = `subscription OnDeleteMentor {
  onDeleteMentor {
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
export const onCreateTeacher = `subscription OnCreateTeacher {
  onCreateTeacher {
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
export const onUpdateTeacher = `subscription OnUpdateTeacher {
  onUpdateTeacher {
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
export const onDeleteTeacher = `subscription OnDeleteTeacher {
  onDeleteTeacher {
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
export const onCreateStudent = `subscription OnCreateStudent {
  onCreateStudent {
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
export const onUpdateStudent = `subscription OnUpdateStudent {
  onUpdateStudent {
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
export const onDeleteStudent = `subscription OnDeleteStudent {
  onDeleteStudent {
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
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
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
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
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
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
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
export const onCreateActivity = `subscription OnCreateActivity {
  onCreateActivity {
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
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
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
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
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
