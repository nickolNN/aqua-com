import { useGetCompaniesQuery } from '@/api/companiesApi';

export function CompaniesView() {
  const { data: companies } = useGetCompaniesQuery('');

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1>Companies</h1>
      <ul>
        {companies?.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
}
