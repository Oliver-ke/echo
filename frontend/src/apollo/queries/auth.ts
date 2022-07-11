import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginUser() {
    login(($data: ) {
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
