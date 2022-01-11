import classNames from '../../utils/functions/classnames';

export default function NpcTable({ rows }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 dark:border-gray-800 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-dark-250">
                <tr>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Power
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Fortitude
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Agility
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Persona
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Aptitude
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Added Power
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.level} className={classNames(index % 2 === 0 ? 'bg-white dark:bg-dark-100' : 'bg-gray-50 dark:bg-dark-200', 'hover:bg-gray-100 dark:hover:bg-dark-300')}>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300 font-semibold">{row.totalPower}</td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">{row.fortitude}</td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">{row.agility}</td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">{row.persona}</td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">{row.aptitude}</td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-300">{row.powerAdded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
