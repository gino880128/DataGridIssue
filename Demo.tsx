import * as React from "react";
import Box from "@mui/material/Box";
import { useMovieData } from "@mui/x-data-grid-generator";
import {
  DataGridPremium,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid-premium";
import GradeIcon from "@mui/icons-material/Grade";

const ratingColDef: GridColDef = {
  field: "imdbRating",
  headerName: "Rating",
  type: "number",
  width: 150,
  renderCell: (params) => {
    if (
      params.rowNode.type === "group" &&
      params.field === params.rowNode.groupingField
    ) {
      return "";
    }
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <GradeIcon htmlColor="#faaf00" />
        <span style={{ marginLeft: 2, marginRight: 8 }}>
          <b>{params.value}</b>/10
        </span>
      </Box>
    );
  },
};

export default function RowGroupingCustomCell() {
  const data = useMovieData();
  const columns = React.useMemo(
    () => [...data.columns, ratingColDef],
    [data.columns]
  );

  return (
    <Box sx={{ height: 350, width: "100%" }}>
      <DataGridPremium
        {...data}
        columns={columns}
        initialState={{ rowGrouping: { model: ["imdbRating"] } }}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
