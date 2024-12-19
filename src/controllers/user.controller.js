import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  //  validation
  //  check if user already exits - username and email
  // images and avatar
  //upload to cloudinary
  //  create user object- entry in db
  // remove password and refresh token from response
  // check for user creation
  //  return response

  const { fullname, username, email, password } = req.body;
  console.log(email, password);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new Apierror(400, "Enter all fields please");
  }

  const existedUser = User.find({
    $or: [{ username }, { email }],
  });
  if (existedUser)
    throw new Apierror(409, "User with email or usernaame already exists");

  const avatarLocalPath = req.files?.avatar[0]?.path;

  const CoverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new Apierror(400, "Avatarr file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(CoverLocalPath);
  if (!avatar) {
    throw new Apierror(400, "Avatarr file is required");
  }
  const USer = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email: email,
    password,
    username: username.toLowerCase(),
  });
  const createdUSer = await USer.findById(User._id).select(
    "-password -refreshToken"
  );
  if (!createdUSer) {
    throw new Apierror(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUSer,"user registered Successfully")
  )


});



export { registerUser };
