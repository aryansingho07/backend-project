import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;
  //console.log("email", email);

  if ([email, username, fullname, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required");
  }

  const existeUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existeUser) {
    throw new ApiError(409, "user email or username already exist");
  }
   console.log(req.files);
   console.log('Avatar path:', req.files?.avatar?.[0]?.path);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImagePath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is required ");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagePath);

  if (!avatar) {
    throw new ApiError(400, "avatar is not uploaded in cloudinary");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "user register successfully")
  );
});

export { registerUser };
