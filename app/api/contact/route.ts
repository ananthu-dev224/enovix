// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { name, email, company, service, budget, message } = body;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // App password (not your real password)
//       },
//     });

//     await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: process.env.EMAIL_USER, // your gmail
//       subject: `New Contact Form Submission`,
//       html: `
//         <h3>New Message</h3>
//         <p><b>Name:</b> ${name}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Company:</b> ${company}</p>
//         <p><b>Service:</b> ${service}</p>
//         <p><b>Budget:</b> ${budget}</p>
//         <p><b>Message:</b> ${message}</p>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ success: false, error });
//   }
// }