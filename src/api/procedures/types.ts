import { Procedure } from '~/features/procedures';

export type GetProceduresResponse = Procedure[];

type ShortProcedure = {
    id: number;
    quantity: number;
}

export type CreateProcedureRequest = {
    procedures: ShortProcedure[],
    description: string,
    verificationId: string,
    cityId: number,
    firstName: string,
    lastName: string,
    address: string,
}
