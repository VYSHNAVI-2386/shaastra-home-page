import { gql } from "@apollo/client";

export const GET_IOH_REGS = gql`
  query GetIOHRegs {
    getIOHRegs {
      id
      name
      email
    }
  }
`;

export const GET_ALL_IOH_REGS = gql`
  query GetAllIOHRegs {
    getAllIOHRegs {
      id
      userId
      name
      phone
      email
      state
      city
      selectedSlot
      registerType
      verificationStatus
      registeredAt
      verifiedAt
      individualCategory
      companyName
      companySector
      designation
      instituteName
      instituteDesignation
      departmentName
      collegeName
      otherProfession
      groupType
      adultCount
      childCount
      instituteCategory
      institutionName
      institutionState
      institutionCity
      principalName
      principalEmail
      principalPhone
      principalGender
      studentCount
      teacherCount
      busCount
      vehicleNumber
      teacherName
      teacherEmail
      teacherPhone
      declarationFormFilePath
      othersProfession
      othersCompanyName
      othersCompanySector
      othersDesignation
      othersInstituteName
      othersInstituteDesignation
      othersDepartmentName
      aadharFilePath
    }
  }
`;
