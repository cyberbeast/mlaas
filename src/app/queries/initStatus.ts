import gql from 'graphql-tag';

export var initStatusQuery = gql`
  query initStatusQuery {
    getInitStatus {
      cold_start
    }
  }
`;

export interface initStatusQueryResponse {
  cold_start
};
