import "./AdminTable.css";
import useSortableData from "./useSortableData";

export const UsersTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.products);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div className="table-container">
      <table className="table">
        <caption>Users</caption>
        <thead className="table-header">
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className={getClassNamesFor("name")}
              >
                Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("lastName")}
                className={getClassNamesFor("lastName")}
              >
                Last Name
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("email")}
                className={getClassNamesFor("email")}
              >
                Email
              </button>
            </th>
            <th>
              <button type="button" className={getClassNamesFor("password")}>
                Gender
              </button>
            </th>
            <th>
              <button type="button" className={getClassNamesFor("password")}>
                Birthday
              </button>
            </th>
            <th>
              <button type="button" className={getClassNamesFor("password")}>
                Password
              </button>
            </th>
            <th>
              <button type="button" className={getClassNamesFor("password")}>
                Last update
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="table-content">
          {items.map((item) => (
            <tr key={item.id} className="table-row">
              <td className="table-data">{item.name}</td>
              <td className="table-data">{item.lastName}</td>
              <td className="table-data">{item.email}</td>
              <td className="table-data">{item.gender}</td>
              <td className="table-data">{item.birthday}</td>
              <td className="table-data">{item.password}</td>
              <td className="table-data">{item.updateAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
