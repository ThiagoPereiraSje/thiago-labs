import { gql } from '@apollo/client'

export const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($id: ID!) {
    delete_organization_item(id: $id) {
      id
    }
  }
`

export const CREATE_ORGANIZATION = gql`
  mutation CreateOrganization($input: create_organization_input!) {
    create_organization_item(data: $input) {
      id
      cnpj
      name
      collaborator_id {
        name
      }
    }
  }
`

export const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($id: ID!, $input: update_organization_input!) {
    update_organization_item(id: $id, data: $input) {
      id
      legal_name
    }
  }
`
