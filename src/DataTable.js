import React, { useState } from "react";
import {
  DataTable,
  TextInput,
  Button,
  TableSelectAll,
  TableSelectRow,
  TableToolbarContent,
  TableBatchAction,
  TableToolbar,
  TableBatchActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell
} from "carbon-components-react";
import { Delete16 as Delete } from "@carbon/icons-react";

const App = () => {
  const [rowData, setRowData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [required, setRequired] = useState(false);

  const [colName, setColName] = useState("");

  const addCol = () => {
    if (colName === "") {
      setRequired(true);
      return;
    } else {
      setRequired(false);
    }
    const length = headerData.length;
    const header = {
      key: `header_${length}`,
      header: colName
    };
    const rows = rowData.map((row) => {
      return {
        ...row,
        [header.key]: header.header
      };
    });

    setRowData(rows);
    const newHeaders = headerData.concat(header);
    setHeaderData(newHeaders);
    setColName("");
  };

  const colNameFun = (event) => setColName(event.target.value);

  const addRow = () => {
    if (headerData.length === 0) {
      setRequired(true);
      return;
    }
    const rows = rowData;
    let random = Math.random() * 10;
    let row = { id: random };

    headerData
      .filter((header) => row[header.key] === undefined)
      .forEach((header) => {
        row[header.key] = header.header;
      });
    const newRows = rows.concat(row);
    setRowData(newRows);
  };

  const removeRow = (selectedRows) => {
    const idsToDelete = selectedRows.map((row) => row.id);
    const clone = [...rowData];
    const indexs = [];
    for (let i = 0; i < clone.length; i++) {
      const obj = clone[i];
      const id = obj.id;
      if (idsToDelete.includes(id)) indexs.push(i);
    }
    const indexSet = new Set(indexs);
    const arrayWithValuesRemoved = clone.filter((value, i) => !indexSet.has(i));
    setRowData(arrayWithValuesRemoved);
  };

  return (
    <div>
      <DataTable rows={rowData} headers={headerData}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          getBatchActionProps,
          selectedRows
        }) => (
          <TableContainer>
            <TableToolbar>
              <TableBatchActions {...getBatchActionProps()}>
                <TableBatchAction
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? 0 : -1
                  }
                  renderIcon={Delete}
                  onClick={() => removeRow(selectedRows)}
                >
                  Delete
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent>
                <TextInput
                  invalid={required}
                  value={colName}
                  onChange={colNameFun}
                  placeholder="Enter New Column Name"
                  invalidText="A valid value is required"
                />
                <Button onClick={addCol} size="small" kind="primary">
                  Add new Column
                </Button>
                <Button onClick={addRow} size="small" kind="primary">
                  Add new Row
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i} {...getRowProps({ row })}>
                    <TableSelectRow {...getSelectionProps({ row })} />
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>
                        <div>
                          <TextInput id={Math.random} />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </div>
  );
};

export default App;
