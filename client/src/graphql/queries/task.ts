import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GetTasks($userId: String!) {
    tasks(userId: $userId) {
      id
      description
      createdDate
      title
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($userId: String!, $noteId: String!) {
    deleteTask(userId: $userId, noteId: $noteId)
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $userId: String!) {
    createTask(title: $title, description: $description, userId: $userId) {
      id
      title
      description
    }
  }
`;
