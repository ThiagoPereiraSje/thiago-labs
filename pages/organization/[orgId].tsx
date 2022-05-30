import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_ORGANIZATION } from '../../graphql/mutations'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GET_ORGANIZATION_BY_ID } from '../../graphql/queries'
import { FaArrowCircleLeft } from 'react-icons/fa'

interface CreateForm {
  name: string
  legal_name: string
  cnpj: string
  role: string
}

export default function Organizadiotn() {
  const router = useRouter()
  const id = router.query.orgId

  const [updateOrganization] = useMutation(UPDATE_ORGANIZATION)
  const {
    refetch: orgRefetch,
    loading,
    error,
    data,
  } = useQuery(GET_ORGANIZATION_BY_ID, {
    variables: { id: id as string },
  })

  const { register, handleSubmit, reset } = useForm<CreateForm>()

  const onSubmit: SubmitHandler<CreateForm> = (data) => {
    updateOrganization({
      variables: {
        id: id as string,
        input: {
          cnpj: data.cnpj,
          status: 'draft',
          name: data.name,
          role: data.role,
          legal_name: data.legal_name,
        },
      },
      onCompleted: orgRefetch,
    })

    router.back()
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error}`

  const org = data.organization_by_id

  return (
    <>
      <div className="modal-box relative">
        <Link href="/">
          <a>
            <FaArrowCircleLeft size={40} />
          </a>
        </Link>
        <h3 className="text-lg font-bold">Cadastro de empresas</h3>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Nome"
            defaultValue={org.name}
            {...register('name')}
            className="input my-5 w-full max-w-xs"
          />
          <input
            type="text"
            defaultValue={org.legal_name}
            placeholder="Razao Social"
            {...register('legal_name')}
            className="input my-5 w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="CNPJ"
            defaultValue={org.cnpj}
            {...register('cnpj')}
            className="input my-5 w-full max-w-xs"
          />

          <select
            className="select my-5 w-full max-w-xs"
            {...register('role')}
            defaultValue={org.role}
          >
            <option disabled selected>
              Papel empresarial
            </option>
            <option value="buyer">Comprador</option>
            <option value="seller">Vendedor</option>
          </select>

          <button className="btn btn-accent">Atualizar</button>
        </form>
      </div>
    </>
  )
}
