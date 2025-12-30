import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode || 500)
      .json(
        new ApiResponse(
          err.statusCode,
          null,
          err.message || "Something went wrong"
        )
      );
  }

  // fallback for unknown errors
  res
    .status(500)
    .json(new ApiResponse(500, null, "Something went wrong on the server"));
};
