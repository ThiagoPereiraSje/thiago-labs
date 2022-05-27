import { gql } from '@apollo/client'

export const GET_ORGANIZATIONS = gql`
  query GetOrganizations {
    organization {
      id
      cnpj
      name
      role
      legal_name
      collaborator_id {
        name
      }
    }
  }
`

export const GET_ORGANIZATION_BY_ID = gql`
  query GetOrganizationById($id: ID!) {
    organization_by_id(id: $id) {
      id
      cnpj
      legal_name
      role
      name
      collaborator_id {
        name
      }
    }
  }
`
