const express = require("express");
const router = express.Router();

const multer = require("multer");
const auth = require("../../middleware/authentication");
const MIME_TYPE = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = MIME_TYPE[file.mimetype];
    cb(null, Date.now() + file.originalname + ext);
    // drugi nacin imenovanja file-a da nebi doslo do podudaranja
    /* cb(
      null,
      new Date().toISOString().replace(/:|\./g, "") + " - " + file.originalname
    ); */
  },
});

const fileFilter = (req, file, cb) => {
  if (MIME_TYPE[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("False type"), false);
  }
};

//where to store files
const upload = multer({
  storage: storage,
  limits: { filesize: 1024 * 1024 * 10 },
  fileFilter: fileFilter,
});

const models = require("../../models/index");
const Trip = models.Trip;

router.get("/", (req, res) => {
  Trip.findAll()
    .then((trips) => {
      res.send(trips);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Fetching all trips failed" });
    });
});

router.post("/", upload.single("tripImage"), auth, (req, res) => {
  let data = ({ name, description, location, start_hour, end_hour } = req.body);
  if (!!req.file) {
    data = {
      ...data,
      image: req.file.path,
    };
  }
  const freespace = +req.body.space;
  const createdBy = req.user.fullname;
  const likes = [];
  const comments = [];
  data = {
    ...data,
    freespace,
    createdBy,
    likes,
    comments,
    price: +req.body.price,
    UserId: req.user.id,
  };
  Trip.create(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Creating Post Failed" });
    });
});

router.get("/show/:id", (req, res) => {
  const id = +req.params.id;
  Trip.findOne({ where: { id: id } })
    .then((trip) => {
      return res.status(200).json(trip);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "Creating Post Failed" });
    });
});

router.get("/userTrips/:id", (req, res) => {
  const id = req.params.id;
  Trip.findAll({ where: { UserId: id } }).then((trips) => {
    res.send(trips);
  });
});

router.post("/like/:id", auth, (req, res) => {
  const id = req.params.id;
  Trip.findOne({ where: { id: id } }).then((trip) => {
    trip.dataValues.likes.push({
      userName: req.user.fullname,
      id: req.user.id,
      userProfileImage: "what",
    });

    Trip.update(trip.dataValues, { where: { id: id } })
      .then((updatedTrip) => {
        res.json({ trip });
      })
      .catch((err) => console.log("ERROR", err));
  });
});

router.post("/unlike/:id", auth, (req, res) => {
  console.log(req.user);
  const id = req.params.id;
  Trip.findOne({ where: { id: id } }).then((trip) => {
    console.log(trip.dataValues);
    const tripUpdate = trip;
    tripUpdate.dataValues.likes = trip.dataValues.likes.filter((likedBy) => {
      return likedBy.userName !== req.user.fullname;
    });

    Trip.update(tripUpdate.dataValues, { where: { id: id } })
      .then((updatedTrip) => {
        res.json({ trip });
      })
      .catch((err) => console.log("ERROR", err));
  });
});

router.post("/comment/:id", auth, (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Trip.findOne({ where: { id: id } }).then((trip) => {
    console.log(trip.dataValues);
    const comment = {
      userName: req.user.fullname,
      id: req.user.id,
      userProfileImage: "what",
      comment: req.body.comment,
    };
    trip.dataValues.comments.push(comment);

    Trip.update(trip.dataValues, { where: { id: id } })
      .then((updatedTrip) => {
        res.json({ comment });
      })
      .catch((err) => console.log("ERROR", err));
  });
});

router.put("/edit/:id", upload.single("tripImage"), (req, res) => {
  const id = +req.params.id;
  let data = ({
    name,
    description,
    start_date,
    end_date,
    start_hour,
    end_hour,
    location,
  } = req.body);
  if (!!req.file) {
    data = {
      ...data,
      image: req.file.path,
    };
  }
  let space = +req.body.space;
  data = {
    ...data,
    freespace: space,
    price: +req.body.price,
  };
  Trip.update(data, { where: { id: id } })
    .then(() => {
      res.status(200).send("trip updated id= " + id);
    })
    .catch((err) => console.log("ERROR", err));
});

router.delete("/delete/:id", (req, res) => {
  id = req.params.id;
  Trip.destroy({
    where: { id: id },
  })
    .then(() => {
      res.status(200).send("Deleting successfull");
    })
    .catch((err) => console.log("ERROR", err));
});

module.exports = router;
