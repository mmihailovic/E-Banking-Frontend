export interface BankAccount {
  id: number
  accountNumber: string
  owner: number
  balance: number
  availableBalance: number
  creator: number
  creationDate: number
  currencyDTO: Currency
  active: boolean
}

export interface Currency {
  id: number
  name: string
}

export interface TransactionsForBankAccount {
  senderAccountNumber: number
  receiverAccountNumber: number
  amount: number
  paymentStatus: string
  transactionCreationTime: number
  transactionExecutionTime: number | null
}

export interface Transfer {
  senderAccountNumber: number
  receiverAccountNumber: number
  amount: number
}

export interface Card {
  id: number
  number: number
  type: number
  cardIssuer: CardIssuer
  name: string
  creationDate: number
  expirationDate: number
  cvv: number
  cardLimit: number
  status: string
}

export interface CardIssuer {
  name: string
}

export interface CreditRequest {
  id: number
  creditType: CreditType
  loanAmount: number
  currency: Currency
  loanPurpose: string
  loanTerm: number
}

export interface CreditType {
  id: number
  name: string
  nominalInterestRate: number
  minLoanTerm: number
  maxLoanTerm: number
  maxLoanAmount: number
  prepayment: number
}

export interface ApplyForCredit {
  creditTypeId: number
  amount: number
  currencyId: number
  loanPurpose: string
  salary: number
  phoneNumber: string
  permanentEmployee: boolean
  currentEmploymentPeriod: number
  loanTerm: number
  bankAccountNumber: number
}

export interface CreateCurrentBankAccount {
  JMBG: number
  accountType: string
  maintenancePrice: number
}

export interface CreateForeignBankAccount {
  JMBG: number
  currencyId: number
  maintenancePrice: number
}

export interface CreateBusinessBankAccount {
  TIN: number
}

export interface CardIssuer {
  id: number
  name: string
  MII: number
  BIN: number
}

export interface CreateCard {
  type: string
  issuerId: number
  name: string
  bankAccountNumber: number
  limit: number
}
