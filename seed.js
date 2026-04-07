const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');

// Initial Data from constants.ts
const SKILLS_DATA = [
    {
        category: 'Languages & Frameworks',
        name: 'React & React Native', level: 95, icon: '⚛️'
    },
    {
        category: 'Languages & Frameworks',
        name: 'TypeScript', level: 90, icon: '📘'
    },
    {
        category: 'Languages & Frameworks',
        name: 'Tailwind CSS', level: 95, icon: '🎨'
    },
    {
        category: 'Languages & Frameworks',
        name: 'Next.js', level: 85, icon: '▲'
    },
    {
        category: 'Tools & Technologies',
        name: 'Figma / UI Design', level: 80, icon: '🖌️'
    },
    {
        category: 'Tools & Technologies',
        name: 'Git & GitHub', level: 90, icon: '🐙'
    },
    {
        category: 'Tools & Technologies',
        name: 'Performance Opt.', level: 75, icon: '⚡'
    },
    {
        category: 'Tools & Technologies',
        name: 'Jest / Testing', level: 70, icon: '🧪'
    },
];

const PROJECTS_DATA = [
    {
        title: 'Neon Commerce',
        category: 'E-Commerce',
        description: 'A full-stack e-commerce platform with real-time inventory and AI-powered recommendations.',
        image: 'https://picsum.photos/seed/project1/800/600',
        tags: ['React', 'Node.js', 'Tailwind', 'Stripe'],
        linkType: 'github',
        url: 'https://github.com/HeliGandhi-Git',
    },
    {
        title: 'Social Analytics Dash',
        category: 'Dashboard',
        description: 'Interactive social media analytics dashboard visualization for enterprise clients.',
        image: 'https://picsum.photos/seed/project2/800/600',
        tags: ['Next.js', 'D3.js', 'TypeScript'],
        linkType: 'live',
        url: 'https://github.com/HeliGandhi-Git',
    },
    {
        title: 'Health Tracker AI',
        category: 'Mobile App',
        description: 'Mobile-first application tracking fitness metrics using on-device machine learning models.',
        image: 'https://picsum.photos/seed/project3/800/600',
        tags: ['React Native', 'TensorFlow.js', 'Firebase'],
        linkType: 'github',
        url: 'https://github.com/HeliGandhi-Git',
    },
];

const EXPERIENCE_DATA = [
    {
        duration: '2023 - Present',
        jobTitle: 'Full Stack Developer Intern',
        companyName: 'Tech Innovators',
        description: 'Developing scalable web applications using MERN stack and improving system performance.',
    },
    {
        duration: '2022 - 2023',
        jobTitle: 'Frontend Developer',
        companyName: 'Creative Solutions',
        description: 'Designed and implemented responsive user interfaces using React and Tailwind CSS.',
    },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Seed Admin
        // Seed Admin (Reset)
        await Admin.deleteMany({});
        console.log('Cleared existing admin users');

        console.log('Attempting to create admin with:', {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD ? '******' : 'MISSING'
        });

        if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
            throw new Error('Missing admin credentials in .env');
        }

        await Admin.create({
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD
        });
        console.log(`Admin user created: ${process.env.ADMIN_USERNAME}`);

        // Seed Content
        await Skill.deleteMany({});
        await Skill.insertMany(SKILLS_DATA);
        console.log('Skills seeded');

        await Project.deleteMany({});
        await Project.insertMany(PROJECTS_DATA);
        console.log('Projects seeded');

        await Experience.deleteMany({});
        await Experience.insertMany(EXPERIENCE_DATA);
        console.log('Experiences seeded');

        process.exit();
    } catch (error) {
        console.error('FATAL ERROR SEEDING DATA');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        if (error.stack) console.error('Stack Trace:', error.stack);
        process.exit(1);
    }
};

seedData();
