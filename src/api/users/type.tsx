export type UserProcedureRequest = {
    procedures: {
        id: number,
        quantity: number
    }[],
    description: string,
    firstName: string,
    lastName: string,
    address: string,
    cityId: number,
    verificationId: string
}
