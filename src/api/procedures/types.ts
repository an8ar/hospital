import { Procedure } from '~/features/procedures';

export type GetProceduresResponse = Procedure[];

export type ProcedureWithQuantity = {
    id: number;
    quantity: number;
}

export type CreateProcedureRequest = {
    procedures: ProcedureWithQuantity[],
    description: string,
    verificationId: string,
    cityId: number,
    firstName: string,
    lastName: string,
    address: string,
}
