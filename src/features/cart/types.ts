import { Procedure } from '../procedures/types';

export interface CartProcedure extends Procedure {
    quantity: number,
  }
export type CartProcedures = {
    selectedProcedures: CartProcedure[]
  }
