export const chatWithAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Please say something." });
    }

    const text = message.toLowerCase();

    let reply = "";

    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      reply = "Hello! I am your AI Career Coach. How can I help you today?";
    } 
    else if (text.includes("resume")) {
      reply = "I can help you improve your resume. Add your skills, projects, internships, and achievements clearly.";
    } 
    else if (text.includes("interview")) {
      reply = "For interview preparation, practice self introduction, project explanation, technical basics, and common HR questions.";
    } 
    else if (text.includes("roadmap")) {
      reply = "Tell me your career goal. I can suggest a roadmap for frontend, backend, full stack, AI, or data science.";
    } 
    else if (text.includes("mern")) {
      reply = "For MERN stack, focus on React, Node.js, Express, MongoDB, REST API, authentication, and deployment.";
    } 
    else if (text.includes("project")) {
      reply = "Build projects with real use cases. Your AI Career Coach project is a strong resume project.";
    } 
    else {
      reply = "I heard you. Ask me about resume, interview, roadmap, projects, or MERN stack.";
    }

    res.json({ reply });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ reply: "Server error. Please try again." });
  }
};