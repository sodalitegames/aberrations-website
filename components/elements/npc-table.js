import classNames from 'utils/functions/classnames';

export default function NpcTable({ rows }) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow dark:border-gray-800 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-dark-250">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Milestone
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Strength
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Agility
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Persona
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Aptitude
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Health
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase dark:text-gray-300">
                    Leftover Experience
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className={classNames(index % 2 === 0 ? 'bg-white dark:bg-dark-100' : 'bg-gray-50 dark:bg-dark-200', 'hover:bg-gray-100 dark:hover:bg-dark-300')}>
                    <td className="px-6 py-2 text-sm font-semibold text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.milestone}</td>
                    <td className="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.strength}</td>
                    <td className="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.agility}</td>
                    <td className="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.persona}</td>
                    <td className="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.aptitude}</td>
                    <td className="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.health}</td>
                    <td className="px-6 py-2 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-300">{row.experience}</td>
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
