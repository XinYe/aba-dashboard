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
export const onUpdateAdmin = `subscription OnUpdateAdmin {
  onUpdateAdmin {
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
export const onDeleteAdmin = `subscription OnDeleteAdmin {
  onDeleteAdmin {
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
export const onCreatePrincipal = `subscription OnCreatePrincipal {
  onCreatePrincipal {
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
export const onUpdatePrincipal = `subscription OnUpdatePrincipal {
  onUpdatePrincipal {
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
export const onDeletePrincipal = `subscription OnDeletePrincipal {
  onDeletePrincipal {
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
export const onCreateMentor = `subscription OnCreateMentor {
  onCreateMentor {
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
export const onUpdateMentor = `subscription OnUpdateMentor {
  onUpdateMentor {
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
export const onDeleteMentor = `subscription OnDeleteMentor {
  onDeleteMentor {
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
export const onCreateTeacher = `subscription OnCreateTeacher {
  onCreateTeacher {
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
export const onUpdateTeacher = `subscription OnUpdateTeacher {
  onUpdateTeacher {
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
export const onDeleteTeacher = `subscription OnDeleteTeacher {
  onDeleteTeacher {
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
export const onCreateStudent = `subscription OnCreateStudent {
  onCreateStudent {
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
export const onUpdateStudent = `subscription OnUpdateStudent {
  onUpdateStudent {
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
export const onDeleteStudent = `subscription OnDeleteStudent {
  onDeleteStudent {
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
export const onCreateRecord = `subscription OnCreateRecord {
  onCreateRecord {
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
export const onUpdateRecord = `subscription OnUpdateRecord {
  onUpdateRecord {
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
export const onDeleteRecord = `subscription OnDeleteRecord {
  onDeleteRecord {
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
export const onCreateActivity = `subscription OnCreateActivity {
  onCreateActivity {
    id
    recordId
    datetime
    rate
    note
  }
}
`;
export const onUpdateActivity = `subscription OnUpdateActivity {
  onUpdateActivity {
    id
    recordId
    datetime
    rate
    note
  }
}
`;
export const onDeleteActivity = `subscription OnDeleteActivity {
  onDeleteActivity {
    id
    recordId
    datetime
    rate
    note
  }
}
`;
