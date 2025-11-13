/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export enum GroupType {
  Family = 'FAMILY',
  Institute = 'INSTITUTE'
}

export type IohReg = {
  __typename?: 'IOHReg';
  aadharFilePath: Scalars['String']['output'];
  adultCount?: Maybe<Scalars['Float']['output']>;
  busCount?: Maybe<Scalars['Float']['output']>;
  childCount?: Maybe<Scalars['Float']['output']>;
  city: Scalars['String']['output'];
  collegeName?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  companySector?: Maybe<Scalars['String']['output']>;
  declarationFormFilePath?: Maybe<Scalars['String']['output']>;
  departmentName?: Maybe<Scalars['String']['output']>;
  designation?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  groupType?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  individualCategory?: Maybe<Scalars['String']['output']>;
  instituteCategory?: Maybe<Scalars['String']['output']>;
  instituteDesignation?: Maybe<Scalars['String']['output']>;
  instituteName?: Maybe<Scalars['String']['output']>;
  institutionCity?: Maybe<Scalars['String']['output']>;
  institutionName?: Maybe<Scalars['String']['output']>;
  institutionState?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  otherProfession?: Maybe<Scalars['String']['output']>;
  othersCompanyName?: Maybe<Scalars['String']['output']>;
  othersCompanySector?: Maybe<Scalars['String']['output']>;
  othersDepartmentName?: Maybe<Scalars['String']['output']>;
  othersDesignation?: Maybe<Scalars['String']['output']>;
  othersInstituteDesignation?: Maybe<Scalars['String']['output']>;
  othersInstituteName?: Maybe<Scalars['String']['output']>;
  othersProfession?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  principalEmail?: Maybe<Scalars['String']['output']>;
  principalGender?: Maybe<Scalars['String']['output']>;
  principalName?: Maybe<Scalars['String']['output']>;
  principalPhone?: Maybe<Scalars['String']['output']>;
  registerType: Scalars['String']['output'];
  registeredAt: Scalars['DateTimeISO']['output'];
  rejectionReason?: Maybe<Scalars['String']['output']>;
  selectedSlot: Scalars['String']['output'];
  state: Scalars['String']['output'];
  studentCount?: Maybe<Scalars['Float']['output']>;
  teacherCount?: Maybe<Scalars['Float']['output']>;
  teacherEmail?: Maybe<Scalars['String']['output']>;
  teacherName?: Maybe<Scalars['String']['output']>;
  teacherPhone?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  vehicleNumber?: Maybe<Scalars['String']['output']>;
  verificationStatus: Scalars['String']['output'];
  verifiedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type IohRegInput = {
  aadharFilePath: Scalars['String']['input'];
  aadharNumber: Scalars['String']['input'];
  adultCount?: InputMaybe<Scalars['Float']['input']>;
  busCount?: InputMaybe<Scalars['Float']['input']>;
  childCount?: InputMaybe<Scalars['Float']['input']>;
  city: Scalars['String']['input'];
  collegeName?: InputMaybe<Scalars['String']['input']>;
  companyName?: InputMaybe<Scalars['String']['input']>;
  companySector?: InputMaybe<Scalars['String']['input']>;
  declarationFormFilePath?: InputMaybe<Scalars['String']['input']>;
  departmentName?: InputMaybe<Scalars['String']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  groupType?: InputMaybe<GroupType>;
  individualCategory?: InputMaybe<IndividualCategory>;
  instituteCategory?: InputMaybe<InstituteCategory>;
  instituteDesignation?: InputMaybe<Scalars['String']['input']>;
  instituteName?: InputMaybe<Scalars['String']['input']>;
  institutionCity?: InputMaybe<Scalars['String']['input']>;
  institutionName?: InputMaybe<Scalars['String']['input']>;
  institutionState?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  otherProfession?: InputMaybe<Scalars['String']['input']>;
  othersCompanyName?: InputMaybe<Scalars['String']['input']>;
  othersCompanySector?: InputMaybe<Scalars['String']['input']>;
  othersDepartmentName?: InputMaybe<Scalars['String']['input']>;
  othersDesignation?: InputMaybe<Scalars['String']['input']>;
  othersInstituteDesignation?: InputMaybe<Scalars['String']['input']>;
  othersInstituteName?: InputMaybe<Scalars['String']['input']>;
  othersProfession?: InputMaybe<OthersProfession>;
  phone: Scalars['String']['input'];
  principalEmail?: InputMaybe<Scalars['String']['input']>;
  principalGender?: InputMaybe<Gender>;
  principalName?: InputMaybe<Scalars['String']['input']>;
  principalPhone?: InputMaybe<Scalars['String']['input']>;
  registerType: RegisterType;
  selectedSlot: Scalars['String']['input'];
  state: Scalars['String']['input'];
  studentCount?: InputMaybe<Scalars['Float']['input']>;
  teacherCount?: InputMaybe<Scalars['Float']['input']>;
  teacherEmail?: InputMaybe<Scalars['String']['input']>;
  teacherName?: InputMaybe<Scalars['String']['input']>;
  teacherPhone?: InputMaybe<Scalars['String']['input']>;
  vehicleNumber?: InputMaybe<Scalars['String']['input']>;
};

export enum IndividualCategory {
  Academician = 'ACADEMICIAN',
  CollegeStudent = 'COLLEGE_STUDENT',
  IndustryProfessional = 'INDUSTRY_PROFESSIONAL',
  Others = 'OTHERS'
}

export enum InstituteCategory {
  Company = 'COMPANY',
  Others = 'OTHERS',
  SchoolCollege = 'SCHOOL_COLLEGE'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteAllIOHRegs: Scalars['Boolean']['output'];
  registerIOHReg: Scalars['String']['output'];
  verifyIOH: Scalars['String']['output'];
};


export type MutationRegisterIohRegArgs = {
  data: IohRegInput;
};


export type MutationVerifyIohArgs = {
  id: Scalars['String']['input'];
};

export enum OthersProfession {
  Academician = 'ACADEMICIAN',
  IndustryProfessional = 'INDUSTRY_PROFESSIONAL'
}

export type Query = {
  __typename?: 'Query';
  getAllIOHRegs: Array<IohReg>;
  getIOHRegs: Array<IohReg>;
};

export enum RegisterType {
  Group = 'GROUP',
  Individual = 'INDIVIDUAL'
}

export type RegisterIohMutationVariables = Exact<{
  data: IohRegInput;
}>;


export type RegisterIohMutation = { __typename?: 'Mutation', registerIOHReg: string };


export const RegisterIohDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterIOH"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IOHRegInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerIOHReg"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<RegisterIohMutation, RegisterIohMutationVariables>;