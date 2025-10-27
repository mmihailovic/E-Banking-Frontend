export interface BankAccount {
    id:number,
    accountNumber:string,
    owner:number,
    balance:number,
    availableBalance:number,
    creator:number,
    creationDate:number,
    currencyDTO: Currency
    active:boolean
}

export interface Currency {
    name: String
}

export interface TransactionsForBankAccount {
    senderAccountNumber: number,
    receiverAccountNumber: number,
    amount: number,
    paymentStatus: string,
    transactionCreationTime: number,
    transactionExecutionTime: number | null
}

export interface Transfer {
    senderAccountNumber: number,
    receiverAccountNumber: number,
    amount: number
}