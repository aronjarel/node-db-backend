// courseController.js
const { createCourse, getCourses, updateCourse, deleteCourse } = require('./courseDAO');

// Create a course (Teachers only)
async function createCourseHandler(req, res) {
  const { name, description } = req.body;
  const teacherId = req.user.userId; // Assumes user is authenticated and is a teacher

  try {
    await createCourse(name, description, teacherId);
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get all courses (for everyone)
async function getCoursesHandler(req, res) {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update a course (Teachers only)
async function updateCourseHandler(req, res) {
  const { Name, Description } = req.body;
  // Check that required fields are not null or undefined
  if (!Name || !Description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  console.log("...in updateCourseHandler...request body: ", req.body);
  const courseId = req.params.id;

  console.log("course id:", courseId);

  try {
    await updateCourse(courseId, Name, Description);
    res.json({ message: 'Course updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a course (Teachers only)
async function deleteCourseHandler(req, res) {
  const courseId = req.params.id;

  try {
    await deleteCourse(courseId);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCourseHandler,
  getCoursesHandler,
  updateCourseHandler,
  deleteCourseHandler,
};
