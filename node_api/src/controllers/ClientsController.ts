import { Request, response, Response } from 'express'
import { ClientsServices } from '../services/ClientsServices'

class ClientsController {

  async create(request: Request, response: Response) {
    const { cliente, email, telefone } = request.body

    const clientsServices = new ClientsServices()

    try {
      const clients = await clientsServices.create({ cliente, email, telefone })
      return response.json(clients)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const clientsServices = new ClientsServices()

    try {
      const clients = await clientsServices.index()
      return response.json(clients)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async show(request: Request, response: Response) {
    const clientsServices = new ClientsServices()
    // parametro na rota - request.params
    const { id } = request.params
    // const id = request.params.id

    try {
      const clients = await clientsServices.show({ id })
      return response.json(clients)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async delete(request: Request, response: Response) {
    const clientsServices = new ClientsServices()
    // parametro na rota - request.params
    const { id } = request.params
    // const id = request.params.id

    try {
      const clients = await clientsServices.delete({ id })
      return response.json({ message: 'Client id deleted successfully !!' })
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async update(request: Request, response: Response) {
    const { cliente, email, telefone } = request.body
    const { id } = request.params

    const clientsServices = new ClientsServices()

    try {
      const clients = await clientsServices.update({ id, cliente, email, telefone})
      return response.json(clients)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }
}

export { ClientsController }

