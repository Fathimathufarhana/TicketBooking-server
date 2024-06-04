import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars';
import path from 'path'


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "farhana.limenzy@gmail.com",
        pass: "nmgn wkhs fyaq skiw"
    }
});

var handlebarOptions = {
    viewEngine: {
        partialDir: path.resolve('./views/'),
        defaultLayout: false,
      },
    viewPath: path.resolve('./views/')
    };

transporter.use('compile', hbs(handlebarOptions))

export default transporter