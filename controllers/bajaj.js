const { getSQLConection } = require("../database/config");
const { extractDate } = require("../helpers/index");

const getBajajVehiclesInventory = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getSQLConection();

  try {
    /* A query to the database. */
    const result = await pool.request()
      .query(`SELECT  b.serie AS Vin, CONVERT(numeric(10, 0), DD.costo_unitario) AS costocompra, b.precio_lista AS costoactual, b.modelo_ano AS Ano_Modelo, DATEDIFF(day, f.fecha, GETDATE()) AS Dias_En_Inventario, 
      b.des_marca AS Marca, ISNULL(c.descripcion, '') AS linea_familia, b.des_modelo AS Version_DescipcionModelo, b.tipo AS clase, b.modelo AS catalogo, b.des_color AS ColorPintura, b.color AS CodigoColor, 
      ISNULL(b.placa, '') AS Placa, CASE WHEN b.asignacion IS NULL AND e.actual = 'TEST DRIVE' THEN 'demo' WHEN b.asignacion IS NULL AND 
      e.actual = 'DESPACHADO POR IMPORTADOR' THEN 'Transito' WHEN b.asignacion IS NULL AND e.actual <> 'TEST DRIVE' THEN 'disponible' WHEN b.asignacion IS NOT NULL 
      THEN 'no disponible' END AS status, f.fecha AS FechaCompra, d.numero AS FacturaCompra, CASE WHEN f.nit = 900780755 THEN 'Fabrica' ELSE 'Intercambio' END AS tipoCompra, '' AS FechaAlta, 
      ISNULL(CONVERT(VARCHAR, h.fecha, 103), '') AS FechadePedido, ISNULL(CONVERT(VARCHAR, j.fecha_hora_evento, 103), '') AS FechaAsignacion, e.actual AS UbicacionActual
      FROM            dbo.v_stock AS a LEFT OUTER JOIN
      dbo.v_vh_vehiculos AS b ON a.codigo = b.codigo LEFT OUTER JOIN
      dbo.vh_familias AS c ON b.familia = c.familia LEFT OUTER JOIN
          (SELECT        tipo, MAX(numero) AS numero, codigo
            FROM            dbo.documentos_lin
            WHERE        (tipo LIKE 'cv%')
            GROUP BY tipo, codigo) AS d ON b.codigo = d.codigo LEFT OUTER JOIN
      dbo.documentos_lin AS DD ON d.tipo = DD.tipo AND d.numero = DD.numero LEFT OUTER JOIN
          (SELECT        tipo, numero, fecha, concepto, nit
            FROM            dbo.documentos) AS f ON d.tipo = f.tipo AND d.numero = f.numero LEFT OUTER JOIN
      dbo.v_vh_ubicacion AS e ON a.codigo = e.codigo LEFT OUTER JOIN
      dbo.tipo_transacciones_concep AS g ON f.tipo = g.tipo AND f.concepto = g.concepto LEFT OUTER JOIN
          (SELECT        codigo, MAX(fecha) AS fecha
            FROM            dbo.vh_documentos_ped
            GROUP BY codigo) AS h ON a.codigo = h.codigo LEFT OUTER JOIN
      dbo.vh_eventos_vehiculos AS i ON a.codigo = i.codigo AND i.evento = 60 LEFT OUTER JOIN
      dbo.vh_eventos_vehiculos AS j ON a.codigo = j.codigo AND j.evento = 75 LEFT OUTER JOIN
      dbo.vh_eventos_vehiculos AS k ON a.codigo = k.codigo AND k.evento = 15 LEFT OUTER JOIN
          (SELECT        codigo, MAX(fecha_hora_evento) AS fecha_hora_evento
            FROM            dbo.vh_eventos_vehiculos
            WHERE        (evento = 25)
            GROUP BY codigo) AS l ON a.codigo = l.codigo LEFT OUTER JOIN
      dbo.documentos_cruce AS m ON f.tipo = m.tipo_aplica AND f.numero = m.numero_aplica AND m.sw = 6
      WHERE        (a.ano = YEAR(GETDATE())) AND (a.mes = MONTH(GETDATE())) AND (a.stock <> 0) AND (a.bodega = 19) ORDER BY b.des_modelo,  b.modelo_ano`);

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBajajSalesWithDate = async (req, res) => {
  /* Getting the connection to the database. */
  const pool = await getSQLConection();
  let from_Date = "2021-02-25";
  let to_Date = "2021-12-27";

  try {
    /* A query to the database. */
    const result = await pool.request().query(
      `select * from VTANUE_BAJAJ_HISTORICO where
        FechaFactura between '${from_Date}' and '${to_Date}'`
    );

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBajajSalesCurrentMonth = async (req, res) => {
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
      `select * from VTANUE_BAJAJ_HISTORICO where
        FechaFactura between '${from_Date}' and '${to_Date}'`
    );

    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getBajajVehiclesInventory,
  getBajajSalesWithDate,
  getBajajSalesCurrentMonth,
};
