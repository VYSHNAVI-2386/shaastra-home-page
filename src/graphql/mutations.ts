import { gql } from "@apollo/client";

export const REGISTER_IOH = gql`
  mutation RegisterIOH($data: IOHRegInput!) {
    registerIOHReg(data: $data)
  }
`;

export const VERIFY_IOH = gql`
  mutation VerifyIOH($id: String!) {
    verifyIOH(id: $id)
  }
`;

export const DELETE_ALL_IOH = gql`
  mutation DeleteAllIOH {
    deleteAllIOHRegs
  }
`;
