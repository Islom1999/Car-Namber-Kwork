const Region = require("../models/region");
const Number = require("../models/number");
const Message = require("../models/message");
const Header = require("../models/header");
const Content = require("../models/content");
const Link = require("../models/links");
const Admins = require("../models/user.model");

const getAdmin = async (req, res) => {
  try {
    const admins = await Admins.find().lean();

    res.render("admin/admins", {
      title: "Страница администратора",
      isAdmin: true,
      admins,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
};
const createAdmin = async (req, res) => {
  try {
    await Admins.create({ ...req.body });
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
};
const deleteAdmin = async (req, res) => {
  try {
    await Admins.findByIdAndDelete(req.params.id);
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
};
const updateAdmin = async (req, res) => {
  try {
    await Admins.findByIdAndUpdate(req.params.id, { ...req.body });
    res.redirect("/admin");
  } catch (error) {
    console.log(error);
    res.redirect("/admin");
  }
};

const getNumbers = async (req, res) => {
  try {
    const limit = req.query.limit || 6;
    const page = req.query.page || 1;

    const {
      letter1,
      letter2,
      letter3,
      number1,
      number2,
      number3,
      regionNumber,
    } = req.query;

    const queryFilter = {};

    if (letter1 && letter1 !== "*") queryFilter.letter1 = letter1;
    if (letter2 && letter2 !== "*") queryFilter.letter2 = letter2;
    if (letter3 && letter3 !== "*") queryFilter.letter3 = letter3;
    if (number1 && number1 !== "*") queryFilter.number1 = number1;
    if (number2 && number2 !== "*") queryFilter.number2 = number2;
    if (number3 && number3 !== "*") queryFilter.number3 = number3;
    if (regionNumber && regionNumber !== "*")
      queryFilter.regionNumber = regionNumber;

    const total = await Number.countDocuments({ ...queryFilter });

    const number = await Number.find({ ...queryFilter })
      .sort({ createdAt: -1 })
      .skip(page * limit - limit)
      .limit(limit)
      .populate("region")
      .lean();

    console.log(number);

    const region = await Region.find().lean();

    res.render("admin/numbers", {
      title: "Страница цифры",
      isAdmin: true,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
      query: req.query,
      number,
      region,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/numbers");
  }
};

const getRegion = async (req, res) => {
  try {
    const region = await Region.find().lean();

    res.render("admin/region", {
      title: "Страница региона",
      isAdmin: true,
      region,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/region");
  }
};

const getMessage = async (req, res) => {
  try {
    const total = await Message.countDocuments();
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;

    const message = await Message.find()
      .sort({ createdAt: -1 })
      .skip(page * limit - limit)
      .limit(limit)
      .lean();

    res.render("admin/message", {
      title: "Сообщение",
      isAdmin: true,
      pagination: {
        page,
        limit,
        pageCount: Math.ceil(total / limit),
      },
      message,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/message");
  }
};

// CRUD
// Region
const createRegion = async (req, res) => {
  try {
    const { name, description, number } = req.body;
    const obj = { name, description };

    if (number) {
      if (Array.isArray(number)) {
        obj.numbers = number.map((number) => {
          return { number };
        });
      } else if (typeof number == "string") {
        obj.numbers = [{ number }];
      }
    }

    await Region.create(obj);

    res.redirect("/admin/region");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/region");
  }
};

const updateRegion = async (req, res) => {
  try {
    const { name, description, number } = req.body;
    const obj = { name, description };

    if (number) {
      if (Array.isArray(number)) {
        obj.numbers = number.map((number) => {
          return { number };
        });
      } else if (typeof number == "string") {
        obj.numbers = [{ number }];
      }
    } else {
      obj.numbers = [];
    }

    await Region.findByIdAndUpdate(req.params.id, obj);

    res.redirect("/admin/region");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/region");
  }
};

const deleteRegion = async (req, res) => {
  try {
    await Region.findByIdAndDelete(req.params.id);

    res.redirect("/admin/region");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/region");
  }
};

// numbers
const createNumbers = async (req, res) => {
  try {
    const image = "/upload/number-image/" + req?.file?.filename;
    let { letter1, letter2, letter3 } = req.body;

    letter1 = letter1.toUpperCase();
    letter2 = letter2.toUpperCase();
    letter3 = letter3.toUpperCase();

    await Number.create({ ...req.body, image, letter1, letter2, letter3 });

    res.redirect("/admin/numbers");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/numbers");
  }
};

const updateNumbers = async (req, res) => {
  try {
    const number = await Number.findById(req.params.id);
    let image = number.image;

    let { letter1, letter2, letter3 } = req.body;

    letter1 = letter1.toUpperCase();
    letter2 = letter2.toUpperCase();
    letter3 = letter3.toUpperCase();

    if (req.file?.filename) {
      image = "/upload/number-image/" + req.file.filename;
    }

    await Number.findByIdAndUpdate(req.params.id, {
      ...req.body,
      image,
      letter1,
      letter2,
      letter3,
    });

    res.redirect("/admin/numbers");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/numbers");
  }
};

const deleteNumbers = async (req, res) => {
  try {
    await Number.findByIdAndDelete(req.params.id);

    res.redirect("/admin/numbers");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/numbers");
  }
};

// messege
const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.redirect("/admin/message");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/message");
  }
};

// settings
const getSetting = async (req, res) => {
  try {
    const header = await Header.findOne().lean();
    const content = await Content.find().lean();
    const link = await Link.findOne().lean();

    if (content[0]) {
      content.forEach((contentItem, index) => {
        if (index % 2 == 0) {
          contentItem.isLeft = true;
        }
      });
    }

    res.render("admin/setting", {
      title: "Страница региона",
      isAdmin: true,
      header,
      content,
      link,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/admin/setting");
  }
};
const updateHeader = async (req, res) => {
  try {
    const header = await Header.findOne().lean();

    let image = header?.image;

    if (req.file?.filename) {
      image = "/upload/number-image/" + req.file.filename;
    }

    if (!header) {
      await Header.create({
        ...req.body,
        image: image ? image : "/upload/number-image/",
      });
    } else {
      await Header.findOneAndUpdate({}, { ...req.body, image });
    }

    res.redirect("/admin/setting");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/setting");
  }
};

const updateLink = async (req, res) => {
  try {
    const link = await Link.findOne();
    if (!link) {
      await Link.create({ ...req.body });
    } else {
      await Link.findOneAndUpdate({}, { ...req.body });
    }
    res.redirect("/admin/setting");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/setting");
  }
};

const createContent = async (req, res) => {
  try {
    let image = "";

    if (req.file?.filename) {
      image = "/upload/number-image/" + req.file.filename;
    }

    await Content.create({ ...req.body, image });

    res.redirect("/admin/setting");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/setting");
  }
};

const updateContent = async (req, res) => {
  try {
    const header = await Content.findById(req.params.id);
    let image = header.image;

    if (req.file?.filename) {
      image = "/upload/number-image/" + req.file.filename;
    }

    await Content.findByIdAndUpdate(req.params.id, { ...req.body, image });

    res.redirect("/admin/setting");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/setting");
  }
};

const deleteContent = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);

    res.redirect("/admin/setting");
  } catch (error) {
    console.log(error);
    res.redirect("/admin/setting");
  }
};

module.exports = {
  getAdmin,
  createAdmin,
  deleteAdmin,
  updateAdmin,

  getNumbers,
  createNumbers,
  updateNumbers,
  deleteNumbers,

  getRegion,
  createRegion,
  updateRegion,
  deleteRegion,

  getMessage,
  deleteMessage,

  getSetting,
  updateHeader,
  updateLink,
  createContent,
  updateContent,
  deleteContent,
};