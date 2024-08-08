import mysql from 'mysql2/promise'

export async function query({ query, values = [] }) {
  // PlanetScale;
  const db_con = await mysql.createConnection(process.env.DATABASE_URL)

  try {
    const [results] = await db_con.execute(query, values)
    db_con.end()
    return results
  } catch (error) {
    console.log(error.message)
    return { error }
  }
}
