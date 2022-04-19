import { db } from './prisma-db'

describe('prismaDb', () => {
  it('should work', () => {
    expect(db).toEqual('prisma-db')
  })
})
