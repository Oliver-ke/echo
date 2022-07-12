import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(data: $input) {
      accessToken
      refreshToken
      user {
        createdAt
        email
        firstname
        id
        lastname
        role
        updatedAt
      }
    }
  }
`;
