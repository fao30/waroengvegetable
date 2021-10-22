const sort = require("../helper/barangSort");
const { Op } = require("sequelize");
const calculate = require("../helper/calculate");
const currency = require("../helper/currency");
const { Vegetable, User, Transaction } = require("../models");
const user = require("../models/user");
const bcrypt = require("bcryptjs");

class Controller {
  static homePage(req, res) {
    res.render("home");
  }

  static readVegie(req, res) {
    const name = req.query.name;
    if (name) {
      Vegetable.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      })
        .then((data) => {
          res.render("vegetable", { data });
        })
        .catch((err) => res.send(err));
    } else {
      Vegetable.findAll()
        .then((data) => {
          res.render("vegetable", { data });
        })
        .catch((err) => res.send(err));
    }
  }

  static vegeEdit(req, res) {
    Vegetable.findAll({
      where: {
        id: {
          [Op.eq]: req.params.id,
        },
      },
    })
      .then((data) => {
        res.render("seeDetail", { data });
      })
      .catch((err) => res.send(err));
  }

  static vegeEditDb(req, res) {
    let { name, price, image, description, stock, weight } = req.body;
    Vegetable.update(
      {
        name: name,
        price: price,
        image: image,
        description: description,
        stock: stock,
        weight: weight,
      },
      { where: { id: req.params.id } }
    )
      .then((data) => {
        res.redirect("/vegetable");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static vegeAdd(req, res) {
    let errorList;
    res.render("vegeAdd", { errorList });
  }

  static vegeAddDb(req, res) {
    let object = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      stock: req.body.stock,
      weight: req.body.weight,
    };
    Vegetable.create(object)
      .then((data) => {
        res.redirect("/vegetable");
      })
      .catch((err) => {
        let errorList = [];
        err.errors.forEach((e) => {
          errorList.push(e.message);
        });
        res.render("vegeAdd", { errorList });
      });
  }

  static vegeDelete(req, res) {
    Vegetable.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        res.redirect("/vegetable");
      })
      .catch((err) => {
        console.log("SINI");
        res.send(err);
      });
  }

  static catalogList(req, res) {
    let barang;
    let total;
    let person;

    User.findByPk(req.params.idbuyer)
      .then((data) => {
        person = data;
        // console.log(data.id);
        // console.log(data.username);

        return Vegetable.findAll();
      })
      .then((data3) => {
        //dapet buahbuahan
        barang = data3;
        // console.log(barang);

        return Transaction.findAll({
          include: [
            {
              model: Vegetable,
            },
          ],
          where: {
            UserId: req.params.idbuyer,
          },
        });
      })
      .then((data4) => {
        let obj = {
          data: barang,
          person: person,
          total: calculate(data4),
        };
        res.render("pembelian", obj);
      })
      .catch((err) => res.send(err));
  }

  static vegeBuy(req, res) {
    let barang;
    let total;
    let object = {
      UserId: req.params.idbuyer,
      VegetableId: req.params.id,
    };
    Transaction.create(object)
      .then((data) => {
        return Vegetable.findByPk(req.params.id);
      })
      .then((data1) => {
        //dapetin harga barang yg dipilih
        barang = data1.price;
        return Transaction.findAll({
          include: [
            {
              model: Vegetable,
            },
          ],
          where: {
            UserId: req.params.idbuyer,
          },
        });
      })
      .then((data2) => {
        //dapetin harga dari setiap barang yang dibeli
        total = data2;
        // res.send(total);

        return Vegetable.findAll();
      })
      .then((data3) => {
        barang = data3;
        return User.findByPk(req.params.idbuyer);
      })
      .then((data4) => {
        let obj = {
          data: barang,
          person: data4,
          total: calculate(total),
        };
        res.render("pembelian", obj);
      })
      .catch((err) => res.send(err));
  }

  static invoice(req, res) {
    Transaction.findAll({
      include: [
        {
          model: Vegetable,
        },
        {
          model: User,
        },
      ],
      where: {
        UserId: req.params.idbuyer,
      },
    })
      .then((data) => {
        let harga = calculate(data);
        let sorting = sort(data);

        console.log(sorting);
        // res.send(data);
        let obj = {
          data: data,
          harga: harga,
          sortBuy: sorting,
        };

        res.render("invoice", obj);
      })
      .catch((err) => {
        res.render(err);
      });
  }
  //REGISTER
  static register(req, res) {
    res.render("register");
  }

  static registerDb(req, res) {
    // console.log(req);
    // res.send("REGISTER");
    const { username, password, role } = req.body;
    User.create({ username, password, role })
      .then((data) => {
        res.redirect("login");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static login(req, res) {
    res.render("login");
  }

  //sudah masuk login
  static loginDb(req, res) {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then((user) => {
        console.log(user);
        if (user) {
          const isValidPassword = bcrypt.compareSync(password, user.password);
          if (isValidPassword) {
            if (user.role == "staff") {
              req.session.userId = user.id;
              return res.redirect("/vegetable");
            } else if (user.role == "client") {
              return res.redirect(`/shop/${user.id}`);
            }
          } else {
            const error = "Password/Login salah";
            return res.redirect(`/login?error=$${error}`);
          }
        }
      })
      .catch((err) => {});
  }
}

module.exports = Controller;
