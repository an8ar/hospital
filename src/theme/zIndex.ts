declare module '@mui/material/styles' {
  interface ZIndex {
    dashboardAppBar: number;
    dashboardSideBar: number;
    modal: number;
    snackbar: number;
    tooltip: number;
  }
}

const zIndex = {
  dashboardAppBar: 100,
  dashboardSideBar: 105,
  modal: 1000,
  snackbar: 10000,
  tooltip: 10000,
};

export default zIndex;
