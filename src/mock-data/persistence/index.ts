import type { SchemaMap } from '../schemas';
import {
  generateContacts,
  generateCompanies,
  generateTasks,
  generateActivities,
} from '../generators';

const STORAGE_KEY = 'mock_data_persistence';

const STORAGE_KEY_MAP: Record<string, keyof SchemaMap> = {
  contacts: 'contacts',
  companies: 'companies',
  tasks: 'tasks',
  activities: 'activities',
  users: 'users',
};

function getStoredData(): Partial<SchemaMap> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to read mock data from localStorage:', error);
    return null;
  }
}

function storeData(data: Partial<SchemaMap>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to write mock data to localStorage:', error);
  }
}

export function clearStoredData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getMockDataWithPersistence<T extends keyof SchemaMap>(entityKey: T): SchemaMap[T] {
  const storedData = getStoredData();
  const storedKey = STORAGE_KEY_MAP[entityKey];

  if (storedData && storedData[storedKey]) {
    return storedData[storedKey] as SchemaMap[T];
  }

  // Import generators dynamically to avoid circular dependencies
  const generators: Record<string, (count?: number) => unknown> = {
    contacts: generateContacts,
    companies: generateCompanies,
    tasks: generateTasks,
    activities: generateActivities,
  };

  const generator = generators[entityKey];
  if (generator) {
    const result = generator() as SchemaMap[T];
    const updatedData = {
      ...storedData,
      [storedKey]: result,
    };
    storeData(updatedData);
    return result;
  }

  return [] as unknown as SchemaMap[T];
}

export function updateEntityInStore<T extends keyof SchemaMap>(
  entityKey: T,
  id: string,
  data: Record<string, unknown>
): Record<string, unknown> | null {
  const storedData = getStoredData();
  if (!storedData || !storedData[STORAGE_KEY_MAP[entityKey]]) {
    return null;
  }

  const entityArray = storedData[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[];
  const index = entityArray.findIndex((item) => item.id === id);

  if (index === -1) return null;

  const updated = { ...storedData } as Partial<SchemaMap>;
  (updated[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[])[index] = {
    ...((storedData[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[])[index]),
    ...data,
  };

  storeData(updated);
  return (updated[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[])[index];
}

export function addEntityToStore<T extends keyof SchemaMap>(
  entityKey: T,
  entity: Record<string, unknown>
): Record<string, unknown> | null {
  const storedData = getStoredData();
  if (!storedData) return null;

  const updated = { ...storedData } as Partial<SchemaMap>;
    const entityArray = storedData[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[];
    entityArray.push({ ...entity });
    (updated[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[]) = entityArray;

  storeData(updated);
  return entity;
}

export function deleteEntityFromStore<T extends keyof SchemaMap>(
  entityKey: T,
  id: string
): boolean {
  const storedData = getStoredData();
  if (!storedData || !storedData[STORAGE_KEY_MAP[entityKey]]) return false;

const entityArray = storedData[STORAGE_KEY_MAP[entityKey]] as unknown as Record<string, unknown>[];
   const index = entityArray.findIndex((item) => item.id === id);

  if (index === -1) return false;

  entityArray.splice(index, 1);

  storeData(storedData);
  return true;
}

 export function searchEntities<T extends keyof SchemaMap>(
   _entityKey: T,
   searchTerm: string,
   entityArray: Record<string, unknown>[]
 ): Record<string, unknown>[] {
   const searchLower = searchTerm.toLowerCase();
   return entityArray.filter((item) => {
     const searchable = Object.values(item)
       .map((val) => String(val))
       .join(' ')
       .toLowerCase();
     return searchable.includes(searchLower);
   });
 }
