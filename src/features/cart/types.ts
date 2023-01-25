import { Procedure } from '../procedures/types';

export interface CartProcedure extends Procedure {
    quantity: number,
  }
export type CartProcedureList = {
    selectedProcedures: CartProcedure[]
  }
