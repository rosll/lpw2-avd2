import React, { useRef, useCallback, useState, useEffect }  from 'react'
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Table } from 'reactstrap';
import api from '../../services/api'
import { Buttonn } from './styles'

interface ClientsData {
  id: string;
  cliente: string;
  email: string;
  telefone: string;
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [clients, setClients] = useState<ClientsData[]>([])
  const [edit, setEdit] = useState<ClientsData>()

  useEffect(() => {
    api.get('/clients').then(response => {
      setClients(response.data)
    })
  }, [])

  const handleSubmit = useCallback(async (data: ClientsData) => {
    formRef.current?.reset()

    await api.post('/clients', data)
    await setEdit(undefined)
    await window.location.reload()
    api.get('/clients').then(async response => {
      await setClients(response.data)
    })
  }, [])

  const handleSubmitEdit = useCallback(async (data: ClientsData) => {
    formRef.current?.reset()

    await api.put(`/clients/${document.forms[0].name}`, data)
    await setEdit(undefined)

    api.get('/clients').then(async response => {
      await setClients(response.data)
    })
  }, [])

  return (
    <>
      {edit !== undefined && clients &&(
        <Form ref={formRef} onSubmit={handleSubmitEdit} id="1" name={edit.id}>
          <Input type='text' name='cliente' placeholder='Cliente' defaultValue={edit.cliente} />
          <Input type='text' name='email' placeholder='E-mail' defaultValue={edit.email}/>
          <Input type='text' name='telefone' placeholder='Telefone' defaultValue={edit.telefone}/>
          <Button type='submit' onClick={() => window.location.reload()}>Alterar</Button>
          <Buttonn onClick={() => window.location.reload()}>Voltar</Buttonn>
        </Form>

      )
      ||
      (
        <Form ref={formRef} onSubmit={handleSubmit} >
          <Input type='text' name='cliente' placeholder='Cliente'  required/>
          <Input type='text' name='email' placeholder='E-mail' required />
          <Input type='text' name='telefone' placeholder='Telefone'  required/>
          <Button type='submit'>Salvar</Button>
        </Form>
      )}

      {clients && (
        <>
          <Table bordered className="mt-5">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Opções</th>
              </tr>
            </thead>

            {clients.map((client, index) => (
              <tbody key={index.toString()}>
                <tr>
                  <td>{client.cliente}</td>
                  <td>{client.email}</td>
                  <td>{client.telefone}</td>
                  <td className="col-16 text-center">
                    <button type="button" className="btn btn-danger"
                            onClick={(async () => {
                              await api.delete(`clients/${client.id}`)
                              api.get('/clients').then(response => {
                                 setClients(response.data)
                              })
                            })}>Excluir
                    </button>
                    <button type="button" className="btn btn-info ml-2"
                            onClick={async () => {
                              await setEdit(client)
                            }}>Alterar
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </>
      )}
    </>
  )
}

export default Dashboard
