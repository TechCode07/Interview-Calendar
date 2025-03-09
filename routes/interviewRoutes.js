const express = require('express');
const router = express.Router();

const interviewController = require('../controllers/interviewController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Routes for Interview Scheduling (with role-based authorization)

/**
 * @swagger
 * /api/v1/interview/set-interviewer-availability:
 *   post:
 *     tags:
 *       - Interview
 *     summary: Set the availability of an interviewer
 *     description: This endpoint allows setting the availability of an interviewer.
 *     operationId: setInterviewerAvailability
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availability
 *             properties:
 *               availability:
 *                 type: object
 *                 description: Availability slots for the candidate across the week
 *                 additionalProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: A list of available time slots for a given day (e.g., "09:00-10:00")
 *                 example:
 *                   Monday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Tuesday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Wednesday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Thursday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Friday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *     responses:
 *       201:
 *         description: Successfully set the availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Availability set successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Ines"
 *                     availability:
 *                       type: object
 *                       additionalProperties:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"]
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/set-interviewer-availability', authenticate, authorize(['interviewer']), interviewController.setInterviewerAvailability);

/**
 * @swagger
 * /api/v1/interview/set-candidate-availability:
 *   post:
 *     tags:
 *       - Interview
 *     summary: Set the availability of a candidate
 *     description: This endpoint allows setting the availability of a candidate for an interview.
 *     operationId: setCandidateAvailability
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - availability
 *             properties:
 *               availability:
 *                 type: object
 *                 description: Availability slots for the candidate across the week
 *                 additionalProperties:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: A list of available time slots for a given day (e.g., "09:00-10:00")
 *                 example:
 *                   Monday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Tuesday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Wednesday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Thursday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *                   Friday: ["09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00"]
 *     responses:
 *       201:
 *         description: Successfully set the candidate's availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Availability set successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Carl"
 *                     availability:
 *                       type: object
 *                       additionalProperties:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"]
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */

router.post('/set-candidate-availability', authenticate, authorize(['candidate']), interviewController.setCandidateAvailability);

/**
 * @swagger
 * /api/v1/interview/find-available-slots:
 *   post:
 *     tags:
 *       - Interview
 *     summary: Find available interview slots
 *     description: This endpoint allows finding common available slots for a candidate and one or more interviewers.
 *     operationId: findAvailableSlots
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - candidateId
 *               - interviewerIds
 *             properties:
 *               candidateId:
 *                 type: string
 *                 description: The ID of the candidate
 *               interviewerIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of interviewers' IDs
 *     responses:
 *       200:
 *         description: Successfully retrieved the available slots
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Available slots retrieved successfully"
 *                 slots:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"]
 *       400:
 *         description: Bad request, invalid data
 *       404:
 *         description: No available slots found
 *       500:
 *         description: Internal server error
 */
router.post('/find-available-slots', authenticate, authorize(['candidate', 'interviewer']), interviewController.findAvailableSlots);

module.exports = router;
