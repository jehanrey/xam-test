import { FC, ReactNode } from "react";

export type TableDataSource = Array<Record<string, any>>;

export type TableColumns = Array<{
  title: string;
  key: string;
  render?: (
    text: string,
    record: Record<string, any>,
    index: number
  ) => ReactNode;
  width?: string;
}>;

interface Props {
  dataSource: TableDataSource;
  columns: TableColumns;
}

const Table: FC<Props> = ({ dataSource, columns }) => {
  const renderEmptyRow = () => {
    if (dataSource.length === 0) {
      return (
        <tr>
          <td>No records.</td>
        </tr>
      );
    }
    return false;
  };
  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map(({ title, key, width }) => (
            <th
              key={key}
              className="text-left font-semibold p-1 border border-1 border-gray-300"
              style={{ width }}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {renderEmptyRow() ||
          dataSource.map((rowValue, rowIndex) => (
            <tr key={`${JSON.stringify(rowValue)}-${rowIndex}`}>
              {columns.map(({ key, render, width }) => (
                <td
                  key={key}
                  className="p-1 border border-1 border-gray-300"
                  style={{ width }}
                >
                  {render?.(rowValue[key], rowValue, rowIndex) || rowValue[key]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
