// import { sendConfirmationEmail as sendMailService } from '../../services/mailService.js';

// export const sendMail = async (req, res) => {
//     try {

//         const { to, subject, text } = req.body;
//         console.log(req.body,"body")
//         // const to = 'farhana@mailinator.com'
//         await sendMailService(to, subject, text);
//         res.status(200).json({
//             status: true,
//             message: 'Email sent successfully',
//             data: '',
//             access_token: null
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             status: false,
//             message: 'Error in sending email',
//             data: '',
//             access_token: null
//         })
//     }
// };
