import { useMutation, useQuery } from '@apollo/client'
import { CREATE_ORGANIZATION } from '../graphql/mutations'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GET_ORGANIZATIONS } from '../graphql/queries'

interface CreateForm {
  name: string
  legal_name: string
  cnpj: string
}

export default function Modal() {
  const [createOrganization] = useMutation(CREATE_ORGANIZATION)
  const { refetch: orgRefetch } = useQuery(GET_ORGANIZATIONS)
  const { register, handleSubmit, reset } = useForm<CreateForm>()

  const onSubmit: SubmitHandler<CreateForm> = (data) => {
    createOrganization({
      variables: {
        input: {
          cnpj: data.cnpj,
          status: 'draft',
          name: data.name,
          legal_name: data.legal_name,
        },
      },
      onCompleted: orgRefetch,
    })

    reset()
  }

  return (
    <>
      <label htmlFor="modal" className="modal-button btn mb-10">
        Add
      </label>

      <input type="checkbox" id="modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="modal"
            className="btn btn-circle btn-sm absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Cadastro de empresas</h3>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Nome"
              {...register('name')}
              className="input my-5 w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="Razao Social"
              {...register('legal_name')}
              className="input my-5 w-full max-w-xs"
            />
            <input
              type="text"
              placeholder="CNPJ"
              {...register('cnpj')}
              className="input my-5 w-full max-w-xs"
            />

            <select className="select my-5 w-full max-w-xs">
              <option disabled selected>
                Papel empresarial
              </option>
              <option>Comprador</option>
              <option>Vendedor</option>
            </select>

            <button>
              <label htmlFor="modal" className="btn btn-accent">
                Adicionar
              </label>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
