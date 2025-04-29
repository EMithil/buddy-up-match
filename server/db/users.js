const db = require('./index');

// Get user by ID
const getUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

// Get all users
const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

// Create new user
const createUser = async (user) => {
  const { email, password_hash, full_name, age, gender, profile_url, phone_number, bio } = user;
  const result = await db.query(
    `INSERT INTO users (email, password_hash, full_name, age, gender, profile_url, phone_number, bio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [email, password_hash, full_name, age, gender, profile_url, phone_number, bio]
  );
  return result.rows[0];
};

// Update user by ID
const updateUser = async (id, user) => {
  const { full_name, age, gender, profile_url, phone_number, bio, is_active, email_verified } = user;
  const result = await db.query(
    `UPDATE users SET full_name = $1, age = $2, gender = $3, profile_url = $4, phone_number = $5, bio = $6, is_active = $7, email_verified = $8, updated_at = NOW()
     WHERE id = $9
     RETURNING *`,
    [full_name, age, gender, profile_url, phone_number, bio, is_active, email_verified, id]
  );
  return result.rows[0];
};

// Delete user by ID
const deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE id = $1', [id]);
};


module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
