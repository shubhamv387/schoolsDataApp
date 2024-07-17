import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

const { default: School } = require('@/model/School.model');

export async function GET(req) {
  try {
    const schools = await School.findAll();

    return NextResponse.json({ success: true, schools }, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch schools data' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');

    if (!file) return NextResponse.json({ success: 'false' }, { status: 400 });

    const existingSchool = await School.findOne({
      where: { email_id: data.get('email_id') },
    });

    if (existingSchool)
      return NextResponse.json(
        { success: 'false', message: 'Email already exists' },
        { status: 400 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imgUrl = Date.now() + '_' + file.name;

    const uploadsDir = path.join(process.cwd(), 'public/uploads');

    await fs
      .access(uploadsDir)
      .catch(async () => await fs.mkdir(uploadsDir, { recursive: true }));

    const filepath = path.join(uploadsDir, imgUrl);

    fs.writeFile(filepath, buffer, (err) => {
      if (err) throw err;
    });

    await School.create({
      name: data.get('name'),
      address: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      contact: +data.get('contact'),
      image: imgUrl,
      email_id: data.get('email_id'),
    });

    // console.log(school.dataValues);

    return NextResponse.json(
      { success: true, message: 'school data inserted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { success: false, message: 'Failed to create school' },
      { status: 500 }
    );
  }
}
