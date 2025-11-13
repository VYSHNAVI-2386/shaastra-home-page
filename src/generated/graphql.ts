import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

export type VerifyIohMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type VerifyIohMutation = { __typename?: 'Mutation', verifyIOH: string };

export type DeleteAllIohMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteAllIohMutation = { __typename?: 'Mutation', deleteAllIOHRegs: boolean };

export type GetIohRegsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIohRegsQuery = { __typename?: 'Query', getIOHRegs: Array<{ __typename?: 'IOHReg', id: string, name: string, email: string }> };

export type GetAllIohRegsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllIohRegsQuery = { __typename?: 'Query', getAllIOHRegs: Array<{ __typename?: 'IOHReg', id: string, userId?: string | null, name: string, phone: string, email: string, state: string, city: string, selectedSlot: string, registerType: string, verificationStatus: string, registeredAt: any, verifiedAt?: any | null, individualCategory?: string | null, companyName?: string | null, companySector?: string | null, designation?: string | null, instituteName?: string | null, instituteDesignation?: string | null, departmentName?: string | null, collegeName?: string | null, otherProfession?: string | null, groupType?: string | null, adultCount?: number | null, childCount?: number | null, instituteCategory?: string | null, institutionName?: string | null, institutionState?: string | null, institutionCity?: string | null, principalName?: string | null, principalEmail?: string | null, principalPhone?: string | null, principalGender?: string | null, studentCount?: number | null, teacherCount?: number | null, busCount?: number | null, vehicleNumber?: string | null, teacherName?: string | null, teacherEmail?: string | null, teacherPhone?: string | null, declarationFormFilePath?: string | null, othersProfession?: string | null, othersCompanyName?: string | null, othersCompanySector?: string | null, othersDesignation?: string | null, othersInstituteName?: string | null, othersInstituteDesignation?: string | null, othersDepartmentName?: string | null, aadharFilePath: string }> };


export const RegisterIohDocument = gql`
    mutation RegisterIOH($data: IOHRegInput!) {
  registerIOHReg(data: $data)
}
    `;
export type RegisterIohMutationFn = Apollo.MutationFunction<RegisterIohMutation, RegisterIohMutationVariables>;

/**
 * __useRegisterIohMutation__
 *
 * To run a mutation, you first call `useRegisterIohMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterIohMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerIohMutation, { data, loading, error }] = useRegisterIohMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterIohMutation(baseOptions?: Apollo.MutationHookOptions<RegisterIohMutation, RegisterIohMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterIohMutation, RegisterIohMutationVariables>(RegisterIohDocument, options);
      }
export type RegisterIohMutationHookResult = ReturnType<typeof useRegisterIohMutation>;
export type RegisterIohMutationResult = Apollo.MutationResult<RegisterIohMutation>;
export type RegisterIohMutationOptions = Apollo.BaseMutationOptions<RegisterIohMutation, RegisterIohMutationVariables>;
export const VerifyIohDocument = gql`
    mutation VerifyIOH($id: String!) {
  verifyIOH(id: $id)
}
    `;
export type VerifyIohMutationFn = Apollo.MutationFunction<VerifyIohMutation, VerifyIohMutationVariables>;

/**
 * __useVerifyIohMutation__
 *
 * To run a mutation, you first call `useVerifyIohMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyIohMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyIohMutation, { data, loading, error }] = useVerifyIohMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVerifyIohMutation(baseOptions?: Apollo.MutationHookOptions<VerifyIohMutation, VerifyIohMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyIohMutation, VerifyIohMutationVariables>(VerifyIohDocument, options);
      }
export type VerifyIohMutationHookResult = ReturnType<typeof useVerifyIohMutation>;
export type VerifyIohMutationResult = Apollo.MutationResult<VerifyIohMutation>;
export type VerifyIohMutationOptions = Apollo.BaseMutationOptions<VerifyIohMutation, VerifyIohMutationVariables>;
export const DeleteAllIohDocument = gql`
    mutation DeleteAllIOH {
  deleteAllIOHRegs
}
    `;
export type DeleteAllIohMutationFn = Apollo.MutationFunction<DeleteAllIohMutation, DeleteAllIohMutationVariables>;

/**
 * __useDeleteAllIohMutation__
 *
 * To run a mutation, you first call `useDeleteAllIohMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAllIohMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAllIohMutation, { data, loading, error }] = useDeleteAllIohMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteAllIohMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllIohMutation, DeleteAllIohMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllIohMutation, DeleteAllIohMutationVariables>(DeleteAllIohDocument, options);
      }
export type DeleteAllIohMutationHookResult = ReturnType<typeof useDeleteAllIohMutation>;
export type DeleteAllIohMutationResult = Apollo.MutationResult<DeleteAllIohMutation>;
export type DeleteAllIohMutationOptions = Apollo.BaseMutationOptions<DeleteAllIohMutation, DeleteAllIohMutationVariables>;
export const GetIohRegsDocument = gql`
    query GetIOHRegs {
  getIOHRegs {
    id
    name
    email
  }
}
    `;

/**
 * __useGetIohRegsQuery__
 *
 * To run a query within a React component, call `useGetIohRegsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIohRegsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIohRegsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIohRegsQuery(baseOptions?: Apollo.QueryHookOptions<GetIohRegsQuery, GetIohRegsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIohRegsQuery, GetIohRegsQueryVariables>(GetIohRegsDocument, options);
      }
export function useGetIohRegsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIohRegsQuery, GetIohRegsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIohRegsQuery, GetIohRegsQueryVariables>(GetIohRegsDocument, options);
        }
export function useGetIohRegsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetIohRegsQuery, GetIohRegsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIohRegsQuery, GetIohRegsQueryVariables>(GetIohRegsDocument, options);
        }
export type GetIohRegsQueryHookResult = ReturnType<typeof useGetIohRegsQuery>;
export type GetIohRegsLazyQueryHookResult = ReturnType<typeof useGetIohRegsLazyQuery>;
export type GetIohRegsSuspenseQueryHookResult = ReturnType<typeof useGetIohRegsSuspenseQuery>;
export type GetIohRegsQueryResult = Apollo.QueryResult<GetIohRegsQuery, GetIohRegsQueryVariables>;
export const GetAllIohRegsDocument = gql`
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

/**
 * __useGetAllIohRegsQuery__
 *
 * To run a query within a React component, call `useGetAllIohRegsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllIohRegsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllIohRegsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllIohRegsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>(GetAllIohRegsDocument, options);
      }
export function useGetAllIohRegsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>(GetAllIohRegsDocument, options);
        }
export function useGetAllIohRegsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>(GetAllIohRegsDocument, options);
        }
export type GetAllIohRegsQueryHookResult = ReturnType<typeof useGetAllIohRegsQuery>;
export type GetAllIohRegsLazyQueryHookResult = ReturnType<typeof useGetAllIohRegsLazyQuery>;
export type GetAllIohRegsSuspenseQueryHookResult = ReturnType<typeof useGetAllIohRegsSuspenseQuery>;
export type GetAllIohRegsQueryResult = Apollo.QueryResult<GetAllIohRegsQuery, GetAllIohRegsQueryVariables>;