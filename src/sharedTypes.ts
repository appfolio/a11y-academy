export type Entry = {
  title: string;
  body: string;
};

export type NewEntry = {
  title: string;
  body: string;
  favoriteColor: string;
  team: string;
};

export type NewEntryErrors = Partial<NewEntry>;
