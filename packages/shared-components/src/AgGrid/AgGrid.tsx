'use client'
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';

const myTheme = themeQuartz.withParams({
    foregroundColor: '#0d161e',
    headerBackgroundColor: '#3ba4e8',
    rowHoverColor: 'rgba(188, 227, 252, 0.48)',
});


export const AgGrid = ({columnDefs ,  rowData}:any) => {
 
  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        pagination={true}
        domLayout="autoHeight"
        theme={myTheme}
        modules={[ClientSideRowModelModule]} // Add this line to load the necessary module
      />
    </div>
  );
};
