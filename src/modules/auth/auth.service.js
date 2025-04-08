import bcrypt from 'bcrypt';
import UserModel from '../users/user.model.js';

class AuthService {
   registerUser = async({ email, username, password })=> {
    if (await UserModel.findOne({ username: new RegExp(`^${username}$`, 'i') })) {
      throw { status: 400, message: 'Username already taken' };
    }

    if (await UserModel.findOne({ email })) {
      throw { status: 400, message: 'Email already registered' };
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 12);
    const user = new UserModel({
      email: email.toLowerCase().trim(),
      username: username.trim(), 
      password: hashedPassword,
    });
 
    await user.save();
    return { id: user._id, username: user.username, email: user.email };
  }

   authenticateUser= async(username, password)=> {
    const user = await UserModel.findOne({ username: new RegExp(`^${username}$`, 'i') });
    if (!user) throw { status: 401, message: 'Invalid credentials' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

    return user;
  }
}

export default new AuthService();
