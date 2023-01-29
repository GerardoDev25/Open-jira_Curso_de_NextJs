interface SeedData {
  entries: SeedEntry[];
}
interface SeedEntry {
  description: string;
  status: string;
  createAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'pending Consequat eiusmod aliqua magna nostrud prehenderit.',
      status: 'pending',
      createAt: Date.now(),
    },
    {
      description: 'in-progress Consequat eiusmod aliqua magna nostrud prehenderit.',
      status: 'in-progress',
      createAt: Date.now() - 1_000_000,
    },
    {
      description: 'finished Consequat eiusmod aliqua magna nostrud prehenderit.',
      status: 'finished',
      createAt: Date.now() - 100_000,
    },
  ],
};
