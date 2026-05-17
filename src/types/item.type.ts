export interface Item {
    id: string;
    name: string;
    description: string;
    score: number;
    userId: string;
}

export type CreateItemDto = Omit<Item, 'id'>;
export type UpdateItemDto = Partial<Omit<CreateItemDto, 'userId'>>;
