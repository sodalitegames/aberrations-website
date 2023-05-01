export default function SmallGridItem({ primaryText, secondaryText }) {
  return (
    <li className="flex col-span-1 my-2 rounded-md shadow-sm">
      <div className="flex items-center justify-between flex-1 truncate bg-white border border-gray-200 rounded-md dark:border-gray-700 dark:bg-gray-700">
        <div className="flex items-center justify-center flex-shrink-0 w-12 h-full text-sm font-medium text-white bg-gray-400 dark:bg-gray-500 rounded-l-md"></div>
        <div className="flex-1 px-4 py-2 text-sm">
          <p className="font-medium hover:text-gray-600">{primaryText}</p>
          <p className="text-gray-500 dark:text-gray-400">{secondaryText}</p>
        </div>
        <div className="flex-shrink-0 pr-6"></div>
      </div>
    </li>
  );
}
