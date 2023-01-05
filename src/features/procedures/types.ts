export interface Procedure {
    id: number,
    createdAt: string,
    updatedAt: string,
    specializationId: number,
    name: string,
    slug: string,
    description: string,
    minPrice: number,
    maxPrice: number,
  }
