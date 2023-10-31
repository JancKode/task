import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($password: String!, $username: String!) {
    register(password: $password, username: $username)
  }
`;


export const LOGIN = gql`
mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    token
    userId
  }
}
`;