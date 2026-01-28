import React from "react";
import Loader from "./Loader";

const Table = ({ columns, data, loading, onRowClick }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune donnée disponible</p>
      </div>
    );
  }

  return (
    <>
      {/* Version Desktop - Table normale */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`${onRowClick ? "cursor-pointer" : ""} hover:bg-gray-50 transition-colors`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.accessor] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Version Mobile - Cards */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            onClick={() => onRowClick && onRowClick(row)}
            className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${onRowClick ? "cursor-pointer active:bg-gray-50" : ""}`}
          >
            {columns.map((column, colIndex) => {
              // Ne pas afficher la colonne "Actions" comme un champ normal
              if (column.header === "Actions") {
                return (
                  <div
                    key={colIndex}
                    className="flex justify-end space-x-3 pt-3 mt-3 border-t border-gray-100"
                  >
                    {column.render(row)}
                  </div>
                );
              }

              return (
                <div key={colIndex} className="mb-3 last:mb-0">
                  <div className="text-xs font-medium text-gray-500 uppercase mb-1">
                    {column.header}
                  </div>
                  <div className="text-sm text-gray-900">
                    {column.render
                      ? column.render(row)
                      : row[column.accessor] || "-"}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
