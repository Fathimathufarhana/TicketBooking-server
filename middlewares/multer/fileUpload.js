import multer from 'multer'

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, './uploads/cover_images'); 
        },
        filename: function (req, file, cb) {
            let name = file.originalname.replace(/\s+/g, ' ');
            name = name.replace(/[&\/\\#, +()$~%'":*?<>{}@-]/g, '_');
            cb(null, Date.now() + "_" + name);
        },
    });

   const fileFilterConfig = function(req, file, cb) {
      if (file.mimetype === "image/jpeg"
          || file.mimetype === "image/png"
          || file.mimetype === "image/jpg") {
          cb(null, true);
      } else {
          cb(null, false);
      }
    };

    export const upload = multer({
          storage: storage,
          limits: {
              fileSize: 1024 * 1024 * 5
          },
          fileFilter: fileFilterConfig,
    });
  