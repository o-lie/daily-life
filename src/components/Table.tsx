import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

type Props = {
	rows: any[],
	columns: GridColDef[]
}

const Table = (props: Props) => {

	const {
		rows,
		columns
	} = props;

	return (
		<Box sx={ { height: 250, width: "100%" } }>
			<DataGrid
				autoHeight
				rows={ rows }
				columns={ columns }
				initialState={ {
					pagination: {
						paginationModel: {
							pageSize: 10
						}
					}
				} }
				pageSizeOptions={ [ 5 ] }
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</Box>
	);
};

export default Table;