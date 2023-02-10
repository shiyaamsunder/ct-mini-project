export default function DataGrid({data, count, page, prevPage, nextPage}) {

  return (
    <div className="my-4">

      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left bg-bg text-gray-400">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 border-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Company Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Region
              </th>
              <th scope="col" className="px-6 py-3">
                Funded At
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Funding Total (USD)
              </th>
              <th scope="col" className="px-6 py-3">
                HomePage URL
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({id, name, funding_total_usd,region, city, homepage_url, category, description, funded_at, status})=>
            
            <tr key={id} className="border-b border-gray-700 bg-bg">
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
               {name} 
              </th>
              <td className="px-6 py-4">
                {category}
              </td>
              <td className="px-6 py-4">
                {status}
              </td>
              <td className="px-6 py-4">
                {city}, {region}
              </td>
              <td className="px-6 py-4">
                {new Date(funded_at).getFullYear()}
              </td>
              <td className="px-6 py-4">
                {description == "" ? "-" : description}
              </td>
              <td className="px-6 py-4">
                {Number(funding_total_usd)}
              </td>
              <td className="px-6 py-4">
                <a href={homepage_url} target="_blank">

                {homepage_url}
                </a>
              </td>
            </tr>
            )}
          </tbody>
        </table>
        <nav class="flex items-center justify-between py-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">{page * 10}</span> of <span class="font-semibold text-gray-900 dark:text-white">{count}</span></span>
        <ul class="inline-flex items-center -space-x-px">
            <li>
                <button onClick={prevPage} class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </button>
            </li>
         
            <li>
                <button onClick={nextPage} class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </button>
            </li>
        </ul>
    </nav>
      </div>

    </div>
  )
}