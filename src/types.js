/**
 * @typedef {Object} Review
 * @property {string} id
 * @property {string} userId
 * @property {string} userName
 * @property {number} rating
 * @property {string} comment
 * @property {string} date
 */

/**
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} professionalId
 * @property {string} userId
 * @property {string} date
 * @property {string} timeSlot
 * @property {'pending' | 'confirmed' | 'completed' | 'cancelled'} status
 * @property {number} totalAmount
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {Booking[]} bookings
 */

/**
 * @typedef {'carpenter' | 'electrician' | 'plumber' | 'painter' | 'mason'} Profession
 */

/**
 * @typedef {Object} Professional
 * @property {string} id
 * @property {string} name
 * @property {string} profession
 * @property {number} rating
 * @property {number} experience
 * @property {number} hourlyRate
 * @property {string} location
 * @property {string} pincode
 * @property {string} image
 * @property {string} description
 * @property {string[]} availability
 * @property {Review[]} reviews
 */
