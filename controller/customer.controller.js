const Customer = require("../models/customer");
const bycrypt = require("bcrypt");
const jwtGenrator = require("../helpers/jwtGenerator");
const { sendEmail, getVerifyEamil } = require("../libs/mail");
const crypto = require("crypto");

const create = async (req, res) => {
  try {
    console.log(req.body);

    // Check if the user with the given email already exists
    const existingUser = await Customer.findOne({ email: req.body.email });

    if (existingUser) {
      return res.json({
        status: "failed",
        message: "User with this email already exists",
      });
    }

    const token = crypto.randomBytes(50).toString("hex");

    const hashedPassword = await bycrypt.hash(req.body.password, 10);

    const newCustomer = await new Customer({
      ...req.body,
      emailVerfiyToken: token,
      password: hashedPassword,
    }).save();

    const url = `${process.env.CLIENT_URL}/api/customer/${newCustomer._id}/verify/${token}`;

    sendEmail({
      ...getVerifyEamil({ url }),
      to: newCustomer.email,
    });

    const jwtToken = jwtGenrator({ id: newCustomer.id, email: newCustomer.email });


    const {
      id,
      firstName,
      lastName,
      birthday,
      phoneNumber,
      address,
      email,
      emailVerfiy,
      emailVerfiyToken,
      country,
      state,
      zip,
    } = newCustomer;

    return res.json({
      status: "success",
      user: {
        id,
        firstName,
        lastName,
        birthday,
        phoneNumber,
        address,
        email,
        emailVerfiy,
        emailVerfiyToken,
        country,
        state,
        zip,
      },
      accessToken: jwtToken,
      message: "User created successfully and Please verify your email.",
    });
  } catch (error) {
    console.error('Error during customer creation:', error);
    return res.json({
      status: "failed",
      message: error.message || "Error during customer creation",
    });
  }
};

const verify = async (req, res) => {
  const { id, token } = req.params;

  const user = await Customer.findById(id);
  console.log(user);
  console.log(token);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.emailVerfiyToken !== token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  user.emailVerfiy = true;
  user.emailVerfiyToken = null;

  await user.save();

  return res.status(200).json({ message: "Email verified" });
};

const update = async (req, res) => {
  const { id } = req.params;

  const user = await Customer.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const {
    firstName,
    lastName,
    birthday,
    phoneNumber,
    address,
    email,
    emailVerfiy,
    emailVerfiyToken,
    city,
    state,
    zip,
  } = req.body;

  user.firstName = firstName;
  user.lastName = lastName;
  user.birthday = birthday;
  user.phoneNumber = phoneNumber;
  user.address = address;
  user.email = email;
  user.emailVerfiy = emailVerfiy;
  user.emailVerfiyToken = emailVerfiyToken;
  user.city = city;
  user.state = state;
  user.zip = zip;

  await user.save();

  return res.status(200).json({ message: "User updated" });
};

const getAllCustomer = async (req, res) => {
  const customer = await Customer.find();
  res.json(customer);
}

const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await Customer.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.json({
        status: "failed",
        message: "Invalid email or password",
      });
    }


    // Check if the provided password is correct
    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    // Generate a JWT token for the authenticated user
    const jwtToken = jwtGenrator({ id: user.id, email: user.email });

    // Return the user data and token
    return res.json({
      status: "success",
      user: user,
      accessToken: jwtToken,
      message: "Login successful",
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.json({
      status: "failed",
      message: error.message || "Error during login",
    });
  }
};

const search = async (req, res) => {
  console.log("LOG: SEARCH CUSTOMER")
  const { query } = req.body;
  try {
    // Use find to retrieve all customer
    const allCustomer = await Customer.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phoneNumber: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { state: { $regex: query, $options: "i" } },
        { zip: { $regex: query, $options: "i" } },
      ],
    });
    
    console.log("All Customers: ",allCustomer);

    // Handle the retrieved customers, for example:
    res.json({ status: "success", customers: allCustomer });
  } catch (e) {
    console.error(e);
    res.json({ status: "failed", message: "Internal server error" });
  }
};

module.exports = {
  create,
  verify,
  update,
  getAllCustomer,
  login,
  search
};
