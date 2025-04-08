import UserModel from "../modules/users/user.model.js";

// Helper: Validate User ID
export const validateUserId = (req, res) => {
  const userId = req.headers.id;  // Expecting the user ID in headers
  if (!userId) {
    return res.status(400).json({ message: "User ID is required in headers." });
  }
  return userId;
};

// Helper: Ensure the task belongs to the user
export const checkTaskOwnership = async (taskId, userId) => {
  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      throw { status: 404, message: "User not found." };
    }

    // Check if the task exists in the user's task list
    if (!user.tasks.includes(taskId)) {
      throw { status: 403, message: "Unauthorized task access" };
    }

    return true; // Task ownership verified
  } catch (error) {
    throw error; // Propagate error if any
  }
};