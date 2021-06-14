import { getCustomRepository } from 'typeorm'
import { ClientsRepository } from '../repositories/ClientsRepository'

interface IClientsCreate {
  cliente: string;
  email: string;
  telefone: string;
}

interface IClientsShow {
  id: string
}


interface IClientsUpdate {
  id: string;
  cliente: string;
  email: string;
  telefone: string;
}

class ClientsServices {

  async create({ cliente, email, telefone }: IClientsCreate) {

    const clientsRepository = getCustomRepository(ClientsRepository)

    const teachers = clientsRepository.create({
      cliente,
      email,
      telefone
    })

    await clientsRepository.save(teachers)

    return teachers
  }

  async index() {
    const clientsRepository = getCustomRepository(ClientsRepository)

    const teachers = await clientsRepository.find()

    return teachers;
  }

  //async show({ id: string }) {
  async show({ id }: IClientsShow) {
    const clientsRepository = getCustomRepository(ClientsRepository)

    const teachers = await clientsRepository.findOne({ id })

    console.log(teachers)

    if (!teachers) {
      throw new Error('User id not found!!')
    }

    return teachers;
  }

  async delete({ id }: IClientsShow) {
    const clientsRepository = getCustomRepository(ClientsRepository)

    const teachers = await clientsRepository.findOne({ id })

    if (!teachers) {
      throw new Error('User id not found!!')
    }

    return await clientsRepository.delete({ id })
  }

  async update({ id, cliente, email, telefone }: IClientsUpdate) {
    const clientsRepository = getCustomRepository(ClientsRepository)

    let teachers = await clientsRepository.findOne({ id })

    if (!teachers) {
      throw new Error('Teacher id not found!!')
    }

    await clientsRepository.update(
      { id},
      { cliente,
      email,
      telefone }
    )

    const clientUpdated = await clientsRepository.findOne({ id })

    return clientUpdated
  }
}

export { ClientsServices }