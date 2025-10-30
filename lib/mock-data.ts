// Mock data for hackathon portal - replace with MongoDB later

export interface TeamMember {
  name: string
  email: string
  role: string
}

export interface Team {
  id: string
  name: string
  credentials: {
    username: string
    password: string
  }
  members: TeamMember[]
  contactInfo: string
  problemStatement: string
  githubRepo?: string
  canvaLink?: string
  youtubeUrl?: string
  document?: string
  review1Submitted: boolean
  review2Submitted: boolean
  review1SubmittedAt?: Date
  review2SubmittedAt?: Date
}

export interface ProblemStatement {
  id: string
  title: string
  description: string
  focusAreas: string[]
}

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    id: "1",
    title: "Smart Surveillance for Public Safety",
    description: "Public areas in cities face increasing safety challenges due to limited monitoring and delayed responses. Develop a smart surveillance solution using AI, IoT, or computer vision that can detect suspicious activities, alert authorities in real time, and enhance public safety. Focus on real-time performance, scalability for urban deployment, and cost-effectiveness.",
    focusAreas: ["AI/ML", "Computer Vision", "IoT"],
  },
  {
    id: "2",
    title: "Assistive Technology for Motor Disabilities",
    description: "People with motor disabilities often face challenges in performing basic tasks independently. Create an assistive solution—hardware or software—that improves mobility, accessibility, or daily comfort through innovative technology. Ensure ease of use, affordability, and real-world feasibility.",
    focusAreas: ["Accessibility", "Hardware", "Software"],
  },
  {
    id: "3",
    title: "Remote Technical Training",
    description: "Many learners lack access to physical labs and hands-on technical training facilities. Design an immersive or interactive remote learning platform using VR/AR or simulation-based tools to enable practical skill development anytime, anywhere. Focus on scalability, engagement, and effectiveness.",
    focusAreas: ["EdTech", "VR/AR", "Simulation"],
  },
  {
    id: "4",
    title: "Social Anxiety and Public Speaking",
    description: "Public speaking fear and social anxiety hinder personal and professional growth. Build an AI- or VR-powered feedback system that helps users practice speeches, analyze gestures and tone, and track improvement. Emphasize personalization, accessibility, and measurable outcomes.",
    focusAreas: ["AI", "VR", "Mental Health"],
  },
  {
    id: "5",
    title: "Elderly Care and Emergency Response",
    description: "Elderly individuals living alone are vulnerable during health or safety emergencies. Develop a smart wearable or IoT-based monitoring system that tracks vital signs, detects falls, and sends emergency alerts to family members or caregivers. Ensure reliability, low latency, and affordability.",
    focusAreas: ["Healthcare", "IoT", "Wearables"],
  },
  {
    id: "6",
    title: "Campus Problem Solver",
    description: "Every campus faces operational and student-life challenges—waste management, attendance tracking, or energy inefficiency. Identify a real problem within your institution and create a tech-driven, sustainable, and implementable solution. Focus on feasibility, scalability, and student/community impact.",
    focusAreas: ["Community", "Sustainability", "Analytics"],
  },
  {
    id: "7",
    title: "Smart Waste & Recycling Management for Jammu City",
    description: "Jammu City faces rising challenges in solid waste management, from overflowing bins to limited recycling practices. Develop a smart waste management system that uses IoT sensors, AI-based recognition, or route optimization algorithms to monitor bins, segregate waste, and improve collection efficiency for Jammu Municipal Corporation (JMC). Highlight local feasibility, citizen participation, and environmental sustainability.",
    focusAreas: ["IoT", "AI", "Sustainability"],
  },
  {
    id: "8",
    title: "Driver Safety & Monitoring",
    description: "Driver fatigue, distraction, and rash driving are major causes of accidents. Build a real-time driver monitoring system using AI, computer vision, or sensors to detect unsafe behavior and alert drivers instantly. Emphasize accuracy, low hardware cost, and easy vehicle integration.",
    focusAreas: ["Computer Vision", "AI", "IoT"],
  },
  {
    id: "9",
    title: "Career Counseling and Skill Mapping",
    description: "Many students lack awareness about careers that align with their strengths and goals. Create an AI-driven career guidance platform that maps a student's skills, personality, and interests to suitable education and job paths. Ensure accuracy, adaptability, and strong user engagement.",
    focusAreas: ["AI/ML", "EdTech", "Analytics"],
  },
  {
    id: "10",
    title: "Heritage and Tourism Promotion",
    description: "Cultural heritage sites often go unnoticed due to poor digital outreach. Develop an AR/VR or digital storytelling solution that showcases Jammu & Kashmir's heritage, crafts, and tourism destinations, improving visitor engagement and awareness. Focus on accessibility, user experience, and economic scalability.",
    focusAreas: ["AR/VR", "Tourism", "Digital Media"],
  },
  {
    id: "11",
    title: "Disaster Management and Climate Change",
    description: "With increasing natural calamities, disaster preparedness is a growing need. Create an AI or IoT-based early warning and management system that predicts, tracks, or assists in recovery from disasters like landslides, earthquakes, or floods. Highlight real-time accuracy, scalability, and usability in diverse terrains.",
    focusAreas: ["AI/ML", "IoT", "Data Science"],
  },
  {
    id: "12",
    title: "Remote Patient Monitoring",
    description: "Continuous healthcare monitoring is essential for patients with chronic illnesses. Develop a wearable or IoT-based system that collects and transmits vital health parameters to doctors for remote diagnosis. Focus on data accuracy, security, and cost feasibility.",
    focusAreas: ["Healthcare", "IoT", "Wearables"],
  },
  {
    id: "13",
    title: "Assistive Technology for the Visually Impaired",
    description: "Visually impaired individuals struggle with navigation and accessing visual information. Build a smart assistive tool using computer vision, haptics, or audio guidance that enhances mobility and situational awareness. Ensure affordability, reliability, and social impact.",
    focusAreas: ["Computer Vision", "Accessibility", "Haptics"],
  },
  {
    id: "14",
    title: "Smart Agriculture",
    description: "Farmers in regions like Jammu face inconsistent yields due to inefficient irrigation, soil health issues, and unpredictable weather. Design a smart agriculture system using IoT sensors, AI, or drones to monitor soil conditions, automate irrigation, and predict crop diseases. Focus on cost efficiency, rural feasibility, and farmer-friendly interfaces.",
    focusAreas: ["IoT", "AI/ML", "Agriculture"],
  },
  {
    id: "15",
    title: "Flood Monitoring and River Management",
    description: "Jammu experiences seasonal flooding risks from the Tawi and Chenab Rivers, leading to property and infrastructure damage. Build a real-time flood monitoring and alert system using IoT sensors, satellite data, or AI models to predict water level rise and provide early warnings to residents and authorities. Ensure accuracy, low maintenance, and scalability across river basins.",
    focusAreas: ["IoT", "AI/ML", "Satellite Data"],
  },
  {
    id: "16",
    title: "Open Innovation",
    description: "Identify a unique real-world challenge and create an innovative, scalable, and technically sound solution. You are encouraged to use modern technologies like AI, IoT, AR/VR, robotics, or blockchain to address genuine social, environmental, or industrial issues. Judging will emphasize creativity, feasibility, and real-world impact.",
    focusAreas: ["Innovation", "Any Technology", "Real-world Impact"],
  },
]

export const MOCK_TEAMS: Team[] = [
  {
    id: "team1",
    name: "Team Alpha",
    credentials: { username: "team1", password: "password123" },
    members: [
      { name: "John Doe", email: "john@example.com", role: "Lead" },
      { name: "Jane Smith", email: "jane@example.com", role: "Developer" },
    ],
    contactInfo: "+1-555-0101",
    problemStatement: "1",
    githubRepo: "https://github.com/team-alpha/project",
    canvaLink: "https://canva.com/design/team-alpha",
    youtubeUrl: "https://youtube.com/watch?v=example",
    review1Submitted: true,
    review2Submitted: true,
    review1SubmittedAt: new Date("2025-10-30T19:00:00"),
    review2SubmittedAt: new Date("2025-10-31T04:00:00"),
  },
  {
    id: "team2",
    name: "Team Beta",
    credentials: { username: "team2", password: "password123" },
    members: [
      { name: "Alice Johnson", email: "alice@example.com", role: "Lead" },
      { name: "Bob Wilson", email: "bob@example.com", role: "Designer" },
    ],
    contactInfo: "+1-555-0102",
    problemStatement: "5",
    review1Submitted: true,
    review2Submitted: false,
  },
  {
    id: "team3",
    name: "Team Gamma",
    credentials: { username: "team3", password: "password123" },
    members: [{ name: "Charlie Brown", email: "charlie@example.com", role: "Lead" }],
    contactInfo: "+1-555-0103",
    problemStatement: "9",
    review1Submitted: false,
    review2Submitted: false,
  },
]

export function getTeamById(id: string): Team | undefined {
  return MOCK_TEAMS.find((t) => t.id === id)
}

export function updateTeam(id: string, updates: Partial<Team>): Team | undefined {
  const team = MOCK_TEAMS.find((t) => t.id === id)
  if (team) {
    Object.assign(team, updates)
  }
  return team
}

export interface JudgingCriteria {
  name: string
  description: string
  subDescription: string
}

export const JUDGING_CRITERIA: JudgingCriteria[] = [
  {
    name: "Innovation & Creativity",
    description: "Uniqueness of the idea and novelty of the approach.",
    subDescription: "How creatively the problem is solved.",
  },
  {
    name: "Technical Implementation",
    description: "Quality, functionality, and completeness of the prototype.",
    subDescription: "Use of relevant technologies and overall execution.",
  },
  {
    name: "Feasibility",
    description: "Practicality of the solution for real-world implementation.",
    subDescription: "Resource efficiency (time, cost, and technology).",
  },
  {
    name: "Scalability",
    description: "Potential for expansion or adoption on a larger scale.",
    subDescription: "Flexibility to adapt across different markets or user bases.",
  },
  {
    name: "Business Model & Impact",
    description: "Strength of the value proposition and revenue model.",
    subDescription: "Potential social, economic, or environmental impact.",
  },
]

export const TIMELINE = [
  { label: "Hackathon Start", time: new Date("2025-10-30T09:30:00"), id: "start" },
  { label: "Review 1", time: new Date("2025-10-30T19:00:00"), id: "review1" },
  { label: "Review 2", time: new Date("2025-10-31T04:00:00"), id: "review2" },
  { label: "Final Review", time: new Date("2025-10-31T15:00:00"), id: "final" },
  { label: "Results", time: new Date("2025-10-31T17:00:00"), id: "results" },
]

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
}
