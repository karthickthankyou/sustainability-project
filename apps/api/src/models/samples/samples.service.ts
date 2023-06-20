import { Injectable } from '@nestjs/common'

const sampledata = [
  { id: 1, name: 'Karthick' },
  { id: 2, name: 'Sachin' },
]

@Injectable()
export class SamplesService {
  findAll() {
    return sampledata
  }

  findOne(id: number) {
    return sampledata.find((item) => item.id === id)
  }
}
