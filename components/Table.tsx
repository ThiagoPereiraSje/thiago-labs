import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_ORGANIZATION } from '../graphql/mutations'
import { GET_ORGANIZATIONS } from '../graphql/queries'

type TableData = {
  id: string
  name: string
  legal_name: string
  role: string
  cnpj: string
  collaborator_id: any[]
}
export type TableProps = {
  data: TableData[]
}

export default function Table({ data }: TableProps) {
  const [deleteOrganization] = useMutation(DELETE_ORGANIZATION)
  const { refetch: orgRefetch } = useQuery(GET_ORGANIZATIONS)

  const handleDelete = (id: string) => {
    deleteOrganization({ variables: { id: id }, onCompleted: orgRefetch })
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Legal name</th>
            <th>Papel</th>
            <th>CNPJ</th>
            <th>Collaborators</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((org) => {
            return (
              <tr key={org.id} className="hover">
                <th>{org.id}</th>
                <td>{org.name}</td>
                <td>{org.legal_name}</td>
                <td>{org.role}</td>
                <td>{org.cnpj}</td>
                <td>{org.collaborator_id.length}</td>
                <td>
                  <AiFillDelete
                    size={20}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => handleDelete(org.id)}
                  />
                </td>
                <td>
                  <Link href={`/organization/${org.id}`}>
                    <a>
                      <AiFillEdit size={20} />
                    </a>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
