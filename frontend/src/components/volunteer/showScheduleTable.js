import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import "../../css/totalMeals.css"
import holidays from '@date/holidays-us'

const Styles = styled.div`
  table {
    margin-left:-8px;
    border-spacing: 0;
    width: 100%; 
    border: solid 2px #142850;
    th {
        background: #BDD3D2;
        color: black;
        border: solid 1px #142850;
        textAlign: column.textAlign;
        fontWeight: bold;
        text-align: center;
        minWidth: 80px;
        padding: 3px 20px;
        font-size: 24px;
    }
    td {
        padding: 3px 20px;
        border: solid 1px gray;
        background: white;
        overflow: auto;
        font-size: 22px;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function VolunteerScheduleTable ({ columns, data, props }) {
    // Use the state and functions returned from useTable to build your UI
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    } = useTable({
    columns,
    data
    })

    // Render the UI for your table
    return (
    <div id='tables'>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                            return cellClass(cell, props)
                        })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

const Table = (props) => {
    //console.log(props.weekArr);
    let columns = [
    {
        Header: 'Volunteer Driver Schedule',
        columns: [
            {
                Header: ' ',
                accessor: 'route',
                columns: [
                {
                    Header: 'Route',
                    accessor: 'route'
                }
                ]
            },
            {
                Header: 'Monday',
                columns: [
                {
                    Header: getDate(props.weekArr, 0),
                    accessor: 'monday',
                }
                ]
            },
            {
                Header: 'Tuesday',
                // accessor: 'tuesday'
                columns: [
                {
                    Header: getDate(props.weekArr, 1),
                    accessor: 'tuesday',
                }
                ]
            },
            {
                Header: 'Wednesday',
                // accessor: 'wednesday'
                columns: [
                {
                    Header: getDate(props.weekArr, 2),
                    accessor: 'wednesday',
                }
                ]
            },
            {
                Header: 'Thursday',
                // accessor: 'thursday'
                columns: [
                {
                    Header: getDate(props.weekArr, 3),
                    accessor: 'thursday',
                }
                ]
            },
            {
                Header: 'Friday',
                // accessor: 'friday'
                columns: [
                {
                    Header: getDate(props.weekArr, 4),
                    accessor: 'friday',
                }
                ]
                },
            ],
        }
    ]

    console.log(props.personalData)
    console.log(props.routes)
    let routeList =[];

    routeList.push(" ");
    routeList.push(" ");
    routeList.push(" ");
    routeList.push(" ");
    routeList.push(" ");
    routeList.push(" ");


    return (
        <Styles>
          <VolunteerScheduleTable columns={columns} data={routeList} props={props}/>
        </Styles>
      )
}

export function getDate(weekArr, tableDay) {
    //let weekArr = props.weekArr
    //console.log(weekArr);
    let curr;
    if (weekArr.length === 1)
    {
      curr = new Date();
    }
    else
    {
      curr = new Date(weekArr[0]);
    }
    let week = [];
  
    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first));
      let month = day.getMonth() + 1;
      let date = day.getDate();
      let year = day.getFullYear();
      let mdy = month + "/" + date + "/" + year;
      week.push(mdy);
    }
    return week[tableDay];
  }

function cellClass(cell, props) {
    //let holidayDates = getHolidayDate(props.holidayArr);
    const rowID = (+(cell['row']['id'])) % 3;
    let width = cell.column.Header === "Meals" ? 200 : 'auto'
    
    if (cell['value'] !== " " && rowID === 2){
      return <td id="last-cell" {...cell.getCellProps()}>{cell.render('Cell')}</td>
    }
    
    // if (cell['column']['id'] === "route"){
    //   if (cell['value'] === " " && rowID === 2){
    //     return <td id="last-cell-route" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //   }
    //   else if (cell['value'] === " " && rowID === 0) {
    //     return <td id="top-cell-route" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //   }
    //   else {
    //     return <td id="middle-cell-route" style={{width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //   }
    // }
    // else {
    //   return <td style={{backgroundColor: holidayDates.includes(cell['column'].Header) ? 'black' : null, width: width}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
    // }
  }

export default Table;