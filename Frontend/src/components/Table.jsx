const Table = ({ columns, data, loading }) => {

  if (loading) {

    return (

      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Loading Volunteers...
        </h2>

        <p className="text-gray-500">
          Please wait while we fetch the latest submissions.
        </p>

      </div>

    );
  }


   if (data?.length === 0) {

    return (

      <div className="bg-white rounded-2xl shadow-md p-10 text-center">

        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          No Volunteers Found
        </h2>

        <p className="text-gray-500">
          Try changing your search filters.
        </p>

      </div>

    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>

            {columns?.map((column) => (

              <th
                key={column}
                className="px-4 py-3 text-left"
              >
                {column}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data?.map((item, index) => (

            <tr
              key={index}
              className="border-b"
            >

              {columns.map((column) => (

                <td
                  key={column}
                  className="px-4 py-3"
                >
                  {Array.isArray(item[column])
                    ? item[column].join(", ")
                    : item[column]}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Table;
