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
  academician = "ACADEMICIAN",
  collegeStudent = "COLLEGE_STUDENT",
  others = "OTHERS",
}

export enum GroupType {
  family = "FAMILY",
  institute = "INSTITUTE",
}

export enum InstituteCategory {
  schoolCollege = "SCHOOL_COLLEGE",
  company = "COMPANY",
  others = "OTHERS",
}

export enum OthersProfession {
  industryProfessional = "INDUSTRY_PROFESSIONAL",
  academician = "ACADEMICIAN",
}

export enum Gender {
  male = "MALE",
  female = "FEMALE",
  other = "OTHER",
}
