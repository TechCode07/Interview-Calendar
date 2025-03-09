const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     description: This endpoint allows registering a new user by providing necessary details such as username and password.
 *     operationId: registerUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - role
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The unique name for the user.
 *               email:
 *                 type: string
 *                 description: The email for the user account.
 *               role:
 *                 type: string
 *                 description: The role for the user account.
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *     responses:
 *       201:
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "john_doe"
 *                     userId:
 *                       type: string
 *                       example: "9403f9230df02"
 *       400:
 *         description: Invalid input (e.g., missing or incorrect fields)
 *       500:
 *         description: Internal server error
 */
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Login an existing user
 *     description: This endpoint allows logging in an existing user by providing their credentials (username and password).
 *     operationId: loginUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The username of the user attempting to log in.
 *               password:
 *                 type: string
 *                 description: The password of the user attempting to log in.
 *     responses:
 *       200:
 *         description: Successfully logged in and returned the authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully logged in"
 *                 authToken:
 *                   type: string
 *                   description: The authentication token to be used for subsequent requests.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials (username or password is incorrect)
 *       500:
 *         description: Internal server error
 */
router.post('/login', userController.loginUser);

module.exports = router;
