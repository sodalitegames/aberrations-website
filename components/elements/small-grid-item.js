export default function SmallGridItem({ primaryText, secondaryText }) {
  return (
    <li className="col-span-1 flex shadow-sm rounded-md my-2">
      <div className="flex-1 flex items-center justify-between border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md truncate">
        <div className="bg-gray-400 dark:bg-gray-500 flex-shrink-0 flex items-center justify-center w-12 h-full text-white text-sm font-medium rounded-l-md"></div>
        <div className="flex-1 px-4 py-2 text-sm truncate">
          <p className="font-medium hover:text-gray-600">{primaryText}</p>
          <p className="text-gray-500 dark:text-gray-400">{secondaryText}</p>
        </div>
        <div className="flex-shrink-0 pr-6"></div>
      </div>
    </li>
  );
}
