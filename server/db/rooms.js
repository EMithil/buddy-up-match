const db = require('./index');

// Helper function to get amenities for a room
const getAmenitiesByRoomId = async (roomId) => {
  const result = await db.query(
    'SELECT amenity FROM room_amenities WHERE room_id = $1',
    [roomId]
  );
  return result.rows.map(row => row.amenity);
};

// Helper function to get photos for a room
const getPhotosByRoomId = async (roomId) => {
  const result = await db.query(
    'SELECT photo_url, caption, display_order FROM room_photos WHERE room_id = $1 ORDER BY display_order ASC',
    [roomId]
  );
  return result.rows;
};

// Helper function to get current roommates for a room
const getRoommatesByRoomId = async (roomId) => {
  const result = await db.query(
    `SELECT u.id, u.full_name as name, u.email
     FROM room_members rm
     JOIN users u ON rm.user_id = u.id
     WHERE rm.room_id = $1 AND rm.is_current_resident = TRUE`,
    [roomId]
  );
  return result.rows;
};

// Get room by ID with related data including location joined
const getRoomById = async (id) => {
  const roomResult = await db.query(
    `SELECT r.*, l.id as location_id, l.street_address, l.city, l.state, l.postal_code, l.country
     FROM rooms r
     LEFT JOIN locations l ON r.location_id = l.id
     WHERE r.id = $1`,
    [id]
  );
  const roomRow = roomResult.rows[0];
  if (!roomRow) return null;

  const amenities = await getAmenitiesByRoomId(id);
  const photos = await getPhotosByRoomId(id);
  const roommates = await getRoommatesByRoomId(id);

  const location = {
    id: roomRow.location_id,
    street_address: roomRow.street_address,
    city: roomRow.city,
    state: roomRow.state,
    postal_code: roomRow.postal_code,
    country: roomRow.country,
  };

  const {
    location_id, street_address, city, state, postal_code, country, ...room
  } = roomRow;

  return {
    ...room,
    amenities,
    photos,
    roommates,
    location,
  };
};

// Get all rooms with related data (limit) including location joined
const getAllRooms = async (limit = 100) => {
  const roomsResult = await db.query(
    `SELECT r.*, l.id as location_id, l.street_address, l.city, l.state, l.postal_code, l.country
     FROM rooms r
     LEFT JOIN locations l ON r.location_id = l.id
     ORDER BY r.created_at DESC
     LIMIT $1`,
    [limit]
  );
  const rooms = roomsResult.rows;

  const roomsWithDetails = await Promise.all(
    rooms.map(async (roomRow) => {
      const amenities = await getAmenitiesByRoomId(roomRow.id);
      const photos = await getPhotosByRoomId(roomRow.id);
      const roommates = await getRoommatesByRoomId(roomRow.id);

      const location = {
        id: roomRow.location_id,
        street_address: roomRow.street_address,
        city: roomRow.city,
        state: roomRow.state,
        postal_code: roomRow.postal_code,
        country: roomRow.country,
      };

      const {
        location_id, street_address, city, state, postal_code, country, ...room
      } = roomRow;

      return {
        ...room,
        amenities,
        photos,
        roommates,
        location,
      };
    })
  );

  return roomsWithDetails;
};

// Create new room
const createRoom = async (room) => {
  const {
    owner_id,
    location_id,
    title,
    description,
    rent_amount,
    deposit_amount,
    currency,
    available_from,
    available_until,
    total_bedrooms,
    total_bathrooms,
    room_size_sqft,
    is_furnished,
    is_private_room,
    is_private_bathroom,
    is_active,
  } = room;

  const result = await db.query(
    `INSERT INTO rooms (
      owner_id, location_id, title, description, rent_amount, deposit_amount, currency,
      available_from, available_until, total_bedrooms, total_bathrooms, room_size_sqft,
      is_furnished, is_private_room, is_private_bathroom, is_active
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12,
      $13, $14, $15, $16
    ) RETURNING *`,
    [
      owner_id,
      location_id,
      title,
      description,
      rent_amount,
      deposit_amount,
      currency,
      available_from,
      available_until,
      total_bedrooms,
      total_bathrooms,
      room_size_sqft,
      is_furnished,
      is_private_room,
      is_private_bathroom,
      is_active,
    ]
  );
  return result.rows[0];
};

// Update room by ID
const updateRoom = async (id, room) => {
  const {
    title,
    description,
    rent_amount,
    deposit_amount,
    currency,
    available_from,
    available_until,
    total_bedrooms,
    total_bathrooms,
    room_size_sqft,
    is_furnished,
    is_private_room,
    is_private_bathroom,
    is_active,
  } = room;

  const result = await db.query(
    `UPDATE rooms SET
      title = $1,
      description = $2,
      rent_amount = $3,
      deposit_amount = $4,
      currency = $5,
      available_from = $6,
      available_until = $7,
      total_bedrooms = $8,
      total_bathrooms = $9,
      room_size_sqft = $10,
      is_furnished = $11,
      is_private_room = $12,
      is_private_bathroom = $13,
      is_active = $14,
      updated_at = NOW()
    WHERE id = $15
    RETURNING *`,
    [
      title,
      description,
      rent_amount,
      deposit_amount,
      currency,
      available_from,
      available_until,
      total_bedrooms,
      total_bathrooms,
      room_size_sqft,
      is_furnished,
      is_private_room,
      is_private_bathroom,
      is_active,
      id,
    ]
  );
  return result.rows[0];
};

// Delete room by ID
const deleteRoom = async (id) => {
  await db.query('DELETE FROM rooms WHERE id = $1', [id]);
};

module.exports = {
  getRoomById,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};
