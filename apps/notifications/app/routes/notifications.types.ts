import { Prisma } from '@prisma/client'

const notificationWithJsonData = Prisma.validator<Prisma.NotificationArgs>()({})
type NotificationWithJsonData = Prisma.NotificationGetPayload<typeof notificationWithJsonData>
type NotificationWithoutJsonData = Omit<NotificationWithJsonData, 'data'>

type NotificationDataTransaction = {
  id: number
  amount: number
  unit: string
  from: string
  to: string
}

type NotificationDataAccount = {
  id: number
  name: string
  currency: string
}

export type Notification = NotificationWithoutJsonData & {
  data: NotificationDataTransaction | NotificationDataAccount
}

const testNofitication: Notification = {
  id: 1,
  type: 'TRANSACTION_RECEIVED',
  data: {
    id: 1,
    amount: 4,
    unit: 'ETH',
    from: '0xe5e428cbb93a218dad2c908f2f3e2f46575d91a5',
    to: '0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f',
  },
}
