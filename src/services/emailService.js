import emailjs from "@emailjs/browser"

const SERVICE_ID = "service_7yye8z5"
const TEMPLATE_ID = "template_mstvmq8"
const PUBLIC_KEY = "klpqVPswbu3mtqDXg"

emailjs.init(PUBLIC_KEY)

export const sendInscricaoEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.nome,
      from_email: formData.email,
      telefone: formData.telefone,
      cidade: formData.cidade,
      segmento: formData.segmento,
      descricao: formData.descricao,
      experiencia: formData.experiencia,
      comoConheceu: formData.comoConheceu,
      date: new Date().toLocaleString("pt-BR")
    }

    console.log('📤 Enviando:', templateParams)

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    )

    return { success: true, message: "Inscrição enviada!" }
  } catch (error) {
    console.error('❌ Erro:', error)
    return { success: false, message: "Erro ao enviar." }
  }
}