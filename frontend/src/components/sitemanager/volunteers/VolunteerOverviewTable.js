import React from 'react'
import styled from 'styled-components'
import { useTable, useBlockLayout, useFilters } from 'react-table'
import '../../../css/volunteerTable.css'
import { ColumnFilter } from '../columnFilter';
import DeleteCVPopup from '../DeleteCVPopup.js'

const TEXT_TYPE = "type";
const CELL_HEIGHT = 55;
const BOOL_HEIGHT = 70;

const Styles = styled.div`
 table {
   padding-right: 100;
   border-spacing: 0;
   border: 1px solid black;
   font-family: 'Mulish', sans-serif;
   tr {
     :last-child {
       td {
         border-bottom: 0;
       }
     }
   }
   th,
   td {
     height: ${CELL_HEIGHT};
     border-bottom: 1px solid black;
     border-right: 1px solid black;
     text-align: center;
     font-size: 20px;

      :last-child {
        border-right: 0;
      }
    }
    th {
      padding: 0.5rem;
      background: #D4D4D4;
      color: black;
      fontWeight: bold;
    }
  }
`

const EditableCell = (cellProperties, width, type, dayAvailability) => {
  // We need to keep and update the state of the cell normally
  var useStateCall;
  const email = cellProperties["email"];

  if (dayAvailability != null)
  {
    if (cellProperties["original"]["availability"] === null)
    {
      useStateCall = cellProperties["value"];
    }
    else
    {
      useStateCall = cellProperties["original"]["availability"][dayAvailability];
    }
  }
  else
  {
    useStateCall = cellProperties["value"];
  }

  const [value, setValue] = React.useState(useStateCall);
  var [selected, setSelected] = React.useState(value);

  const handleChange = (targetValue) => {
    setValue(targetValue);
  }

  const updateDatabase = async () => {
    return 0
  }

  const updateCheckbox = async () => {
    setSelected(!selected);
  }

  if (type === "checkbox")
  {
    return (
        <input type={type} style={{width: width-10, boxShadow: 'none'}} checked={selected} onChange={e => updateCheckbox()}/>
    )
  }
  else
  {
    return (
        <input type={type} style={{width: width,height: CELL_HEIGHT, padding: '15px'}} value={value} onChange={e => handleChange(e.target.value)} onBlur={e => updateDatabase()}/>
    )
  }

}

const VolunteerOverviewData = (props) => {
  const columns = React.useMemo(
      () => [
      {
      Header: 'Volunteer Overview',
      columns: [
          { Header: 'First Name',
          accessor: 'firstName',
          Filter: ColumnFilter,
          filter: true,
          width: 150,
          Cell: (cellProperties) => EditableCell(cellProperties, 149, TEXT_TYPE, null)
          },
          { Header: 'Last Name',
          accessor: 'lastName',
          Filter: ColumnFilter,
          filter: true,
          width: 150,
          Cell: (cellProperties) => EditableCell(cellProperties, 149, TEXT_TYPE, null)
          },
          { Header: 'Phone',
          accessor: 'phoneNumber',
          filter: false,
          width: 150,
          Cell: (cellProperties) => EditableCell(cellProperties, 149, "tel", null)
          },
          { Header: 'Email',
          accessor: 'email',
          filter: false,
          width: 350,
          Cell: row => <div style={{width: 349}}>{row.row.original.email}</div>
          },
          { Header: 'Using Digital System?',
          accessor: 'digitalSystem',
          filter: false,
          width: 100,
          Cell: (cellProperties) => EditableCell(cellProperties, 99, "checkbox", null)
          },
          { Header: 'M',
          accessor: 'monday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'M')
          },
          { Header: 'T',
          accessor: 'tuesday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'T')
          },
          { Header: 'W',
          accessor: 'wednesday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'W')
          },
          { Header: 'Th',
          accessor: 'thursday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'Th')
          },
          { Header: 'F',
          accessor: 'friday',
          filter: false,
          width: BOOL_HEIGHT,
          Cell: (cellProperties) => EditableCell(cellProperties, BOOL_HEIGHT-1.1, "checkbox", 'F')
          },
          { Header: 'More Details',
            width: 100,
            Cell: row => (<div style={{textAlign: 'center', width: 100, cursor: 'pointer'}} onClick={() => editVolunteer(row.row.original)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg></div>)
          },
          { Header: 'Remove Volunteer',
          width: 100,
          Cell: row => (<DeleteCVPopup person={row.row.original} type={"volunteer"}/>)
          },
      ],},
      
      ],
      []
  )

  function editVolunteer(id) {
    console.log("Editing volunteer")
    props.showModal(id)
  } 
  
  const data = React.useMemo(() => props.data, []);

  return (
  <Styles height={CELL_HEIGHT}>
    <VolunteerOverviewTable columns={columns} data={data} showModal={props.showModal}/>
  </Styles>
  )
}

async function deleteVolunteer(cellProperties)
{
  const email = cellProperties["email"]
  const deleteData = {
    email: email,
  }

  await fetch(process.env.REACT_APP_SERVER_URL + 'volunteers/volunteerDelete', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteData)
  })
  window.location.reload();
}

function VolunteerOverviewTable({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow} = useTable({
    columns,
    data,
    },
    useFilters,
    useBlockLayout,
    )

  // Render the UI for your table
  return (
  <table {...getTableProps()}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render('Header')}
                <div>{(column.canFilter && column.filter === true) ? column.render('Filter') : null}</div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return <td>{cell.render('Cell', {email: row["original"]["email"], value: cell["value"], original: row["original"]})}</td>
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
 )
}

export default VolunteerOverviewData;
