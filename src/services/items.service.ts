import prisma from '../lib/prisma';
import type { UpdateItemDto, CreateItemDto } from '../types/item.type';

export const getAllItems = async () => {
  return prisma.item.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getItemById = async (id: string) => {
  return prisma.item.findUnique({
    where: { id },
  });
};

export const createItem = async (dto: CreateItemDto) => {
  return prisma.item.create({
    data: dto,
  });
};

export const updateItem = async (id: string, dto: UpdateItemDto) => {
  return prisma.item.update({
    where: { id },
    data: dto,
  });
};

export const deleteItem = async (id: string) => {
  return prisma.item.delete({
    where: { id },
  });
};
