var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
// Get the projects a user is a member of/has access to.
router.get('/:userId/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the projects that the user is a member of/has access to.
}));
// Get the members of a project from a project id. TODO: MAKE SURE THIS IS A MODIFIED OBJECT THAT ONLY INCLUDES USERNAME AND ID.
router.get('/:projectId/members', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get a list of members from the project id. (Should use the same modified object as mentioned above)
}));
// Get the tickets of a project from a project id. 
router.get('/:projectId/tickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user is a member of the project, and if so, get the tickets.
}));
// Check if a user exists by username. (Will be used when adding members to a project)
router.get('/userExists/:userName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists.
}));
