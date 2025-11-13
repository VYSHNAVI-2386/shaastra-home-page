export type IohRegInput = {
  name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  aadharNumber: string;
  aadharFilePath: string;
  selectedSlot: string;

  registerType: RegisterType;

  individualCategory?: IndividualCategory | null;

  companyName?: string | null;
  companySector?: string | null;
  designation?: string | null;

  instituteName?: string | null;
  instituteDesignation?: string | null;
  departmentName?: string | null;

  collegeName?: string | null;
  otherProfession?: string | null;

  groupType?: GroupType | null;

  adultCount?: number | null;
  childCount?: number | null;

  instituteCategory?: InstituteCategory | null;
  institutionName?: string | null;
  institutionState?: string | null;
  institutionCity?: string | null;

  principalName?: string | null;
  principalEmail?: string | null;
  principalPhone?: string | null;
  principalGender?: Gender | null;

  studentCount?: number | null;
  teacherCount?: number | null;
  busCount?: number | null;
  vehicleNumber?: string | null;

  teacherName?: string | null;
  teacherEmail?: string | null;
  teacherPhone?: string | null;

  declarationFormFilePath?: string | null;

  othersProfession?: OthersProfession | null;
  othersCompanyName?: string | null;
  othersCompanySector?: string | null;
  othersDesignation?: string | null;
  othersInstituteName?: string | null;
  othersInstituteDesignation?: string | null;
  othersDepartmentName?: string | null;
};

export enum RegisterType {
  INDIVIDUAL = "INDIVIDUAL",
  GROUP = "GROUP",
}

export enum IndividualCategory {
  INDUSTRY_PROFESSIONAL = "INDUSTRY_PROFESSIONAL",
  ACADEMICIAN = "ACADEMICIAN",  // Fixed
  COLLEGE_STUDENT = "COLLEGE_STUDENT",  // Fixed
  OTHERS = "OTHERS",  // Fixed
}

export enum GroupType {
  FAMILY = "FAMILY",  // Fixed
  INSTITUTE = "INSTITUTE",  // Fixed
}

export enum InstituteCategory {
  SCHOOL = "SCHOOL",  // Fixed to match backend
  COLLEGE = "COLLEGE",  // Fixed to match backend
  COMPANY = "COMPANY",
  OTHERS = "OTHERS",  // Fixed
}

export enum OthersProfession {
  INDUSTRY_PROFESSIONAL = "INDUSTRY_PROFESSIONAL",  // Fixed
  ACADEMICIAN = "ACADEMICIAN",  // Fixed
}

export enum Gender {
  MALE = "MALE",  // Fixed
  FEMALE = "FEMALE",  // Fixed
  OTHER = "OTHER",  // Fixed
}