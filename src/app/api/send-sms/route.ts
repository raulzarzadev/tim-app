import twilio from 'twilio'
export async function POST(req: Request) {
  const body = await req.json()
  console.log({ body })
  const { msj, to } = body

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  )

  try {
    await client.messages.create({
      body: msj,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+${to}`
    })
    return new Response(JSON.stringify(`Mensaje enviado a ${to}`), {
      status: 200
    })
  } catch (error) {
    return new Response(JSON.stringify(`Error: ${error}`), { status: 500 })
  }

  ///return new Response(JSON.stringify(`Mensaje: ${body.msj}`), { status: 200 })
  //return new Response('Hello, Next.js!')
}
