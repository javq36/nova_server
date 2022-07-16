const { getSQLConection } = require("../database/config");
const { extractDate } = require("../helpers/index");

const getFordVehiclesInventory = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getSQLConection();

  try {
    /* A query to the database. */
    const result = await pool
      .request()
      .query(`select * from INVNUE01_2021_FORD_CON_EDADES;`);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFordSalesWithDate = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getSQLConection();
  let from_Date = "2021-02-25";
  let to_Date = "2021-12-27";

  try {
    /* A query to the database. */
    const result = await pool.request().query(
      `select * from VTANUE01_FORD_HISTORICO where
        FechaFactura between '${from_Date}' and '${to_Date}'`
    );

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFordSalesCurrentMonth = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getSQLConection();

  const now = new Date();

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  let from_Date = extractDate(firstDay);
  let to_Date = extractDate(lastDay);

  try {
    /* A query to the database. */
    const result = await pool.request().query(
      `select * from VTANUE01_FORD_HISTORICO where
        FechaFactura between '${from_Date}' and '${to_Date}'`
    );

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getFordVehiclesInventory,
  getFordSalesWithDate,
  getFordSalesCurrentMonth,
};
