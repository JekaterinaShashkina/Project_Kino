const db = require('../config/database'); 
const { QueryTypes } = require('sequelize');


exports.getSalesReport = async (req, res) => {
    const { from, to } = req.query;
  
    const whereClause = [];
    const replacements = {};
  
    if (from) {
      whereClause.push(`starttime >= :from`);
      replacements.from = from;
    }
    if (to) {
      whereClause.push(`starttime <= :to`);
      replacements.to = to;
    }
  
    const whereString = whereClause.length ? 'WHERE ' + whereClause.join(' AND ') : '';
  
    try {
      const result = await db.query(
        `SELECT * FROM kino.view_sales_summary ${whereString} ORDER BY starttime`,
        {
          replacements,
          type: QueryTypes.SELECT
        }
      );
      res.json(result);
    } catch (err) {
      console.error('[ERROR] sales report:', err);
      res.status(500).json({ error: 'Failed to fetch sales report' });
    }
  };
  