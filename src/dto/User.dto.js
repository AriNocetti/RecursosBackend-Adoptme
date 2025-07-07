export default class UserDTO {
  static getUserTokenFrom = user => ({
    name: `${user.first_name} ${user.last_name}`,
    role: user.role || 'user',
    email: user.email,
    _id: user._id,
  });
}
