import { NextResponse } from 'next/server'
import path from 'path'
import { promises as fs } from 'fs'
import { query } from '@/lib/database'

export async function GET(req) {
  try {
    const schools = await query({
      query: 'SELECT * FROM schools',
      values: [],
    })
    return NextResponse.json({ success: true, schools }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ success: false, message: 'Failed to fetch schools data' }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const data = await req.formData()
    const file = data.get('file')

    if (!file) return NextResponse.json({ success: 'false' }, { status: 400 })

    const existingSchool = await query({
      query: `SELECT * FROM schools WHERE email_id = ?`,
      values: [data.get('email_id')],
    })

    // console.log(existingSchool);

    if (existingSchool.length > 0)
      return NextResponse.json({ success: 'false', message: 'Email already exists' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const imgUrl = Date.now() + '_' + file.name

    const uploadsDir = path.join(process.cwd(), 'public/uploads')

    await fs.access(uploadsDir).catch(async () => await fs.mkdir(uploadsDir, { recursive: true }))

    const filepath = path.join(uploadsDir, imgUrl)

    fs.writeFile(filepath, buffer, (err) => {
      if (err) throw err
    })

    await query({
      query: 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?,?,?,?,?,?,?)',
      values: [
        data.get('name'),
        data.get('address'),
        data.get('city'),
        data.get('state'),
        data.get('contact'),
        imgUrl,
        data.get('email_id'),
      ],
    })

    return NextResponse.json({ success: true, message: 'school data inserted successfully' }, { status: 200 })
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ success: false, message: 'Failed to create school' }, { status: 500 })
  }
}
