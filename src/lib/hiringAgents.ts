// Helper functions for creating specialized hiring agents

import { vapiServer } from '@/lib/vapi/vapiServer'
import { interviewAgentPrompt, firstMessage } from '@/lib/vapiConfig'

export interface HiringAgentConfig {
  name: string
  role?: string // e.g., "Frontend Developer", "Data Scientist", "Product Manager"
  experience?: string // e.g., "junior", "mid", "senior"
  customInstructions?: string
}

export const createHiringAgent = async (config: HiringAgentConfig) => {
  try {
    // Customize the prompt based on the role and experience level
    let customizedPrompt = interviewAgentPrompt
    
    if (config.role) {
      customizedPrompt += `\n\n## Role-Specific Focus\nThis interview is specifically for a ${config.role} position. Tailor your questions and assessment accordingly.`
    }
    
    if (config.experience) {
      const experienceGuidance = {
        junior: "Focus on fundamentals, learning ability, and growth potential. Be encouraging and educational.",
        mid: "Balance between technical depth and practical experience. Explore problem-solving and collaboration skills.",
        senior: "Emphasize architecture decisions, leadership experience, and strategic thinking. Expect deep technical knowledge."
      }
      
      customizedPrompt += `\n\n## Experience Level: ${config.experience.toUpperCase()}\n${experienceGuidance[config.experience as keyof typeof experienceGuidance]}`
    }
    
    if (config.customInstructions) {
      customizedPrompt += `\n\n## Additional Instructions\n${config.customInstructions}`
    }

    // Customize the first message
    let customFirstMessage = firstMessage
    if (config.role) {
      customFirstMessage = `Hello! Welcome to your ${config.role} interview with HireFlow. I'm Alex, your AI interviewer, and I'm excited to learn more about you today. How has your day been going so far?`
    }

    const assistant = await vapiServer.assistants.create({
      name: config.name,
      voice: {
        provider: 'vapi',
        voiceId: 'Alex',
      },
      firstMessage: customFirstMessage,
      model: {
        model: 'gpt-4.1',
        provider: 'openai',
        messages: [
          {
            role: 'system',
            content: customizedPrompt,
          },
        ],
        temperature: 0.7,
      },
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        keywords: ['HireFlow', 'technical', 'interview', 'hiring', 'collaboration', config.role?.toLowerCase() || '']
      },
      endCallFunctionEnabled: true,
      endCallMessage: `Thank you for your time today. Your ${config.role || 'technical'} interview has been completed successfully. You should hear back from our team within the next few business days. Have a great day!`,
      maxDurationSeconds: 360, 
      serverMessages: [],
    })

    return {
      success: true,
      status: 200,
      data: assistant,
    }
  } catch (error: unknown) {
    console.error('Error creating hiring agent:', error)
    
    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const err = error as { statusCode?: number; message?: string }
      if (err.statusCode === 401) {
        return {
          success: false,
          status: 401,
          message: 'Authentication failed. Please check your VAPI credentials.',
        }
      }
      if (err.statusCode === 400) {
        return {
          success: false,
          status: 400,
          message: 'Invalid request. Please check your agent configuration.',
        }
      }
    }
    
    return {
      success: false,
      status: 500,
      message: 'Failed to create hiring agent. Please try again.',
    }
  }
}

// Predefined hiring agent templates
export const hiringAgentTemplates = {
  frontendDeveloper: {
    name: "Frontend Developer Interviewer",
    role: "Frontend Developer",
    customInstructions: "Focus on React, TypeScript, CSS, responsive design, and modern frontend practices. Ask about component architecture, state management, and performance optimization."
  },
  
  backendDeveloper: {
    name: "Backend Developer Interviewer", 
    role: "Backend Developer",
    customInstructions: "Focus on API design, database management, server architecture, security practices, and scalability. Ask about microservices, caching strategies, and system design."
  },
  
  fullStackDeveloper: {
    name: "Full Stack Developer Interviewer",
    role: "Full Stack Developer", 
    customInstructions: "Balance between frontend and backend knowledge. Ask about integration challenges, deployment processes, and end-to-end application development."
  },
  
  dataScientist: {
    name: "Data Scientist Interviewer",
    role: "Data Scientist",
    customInstructions: "Focus on machine learning, statistical analysis, data preprocessing, model evaluation, and Python/R programming. Ask about real-world ML project experiences."
  },
  
  productManager: {
    name: "Product Manager Interviewer", 
    role: "Product Manager",
    customInstructions: "Focus on product strategy, stakeholder management, roadmap planning, user research, and metrics. Ask about product decisions and cross-functional collaboration."
  },
  
  devOpsEngineer: {
    name: "DevOps Engineer Interviewer",
    role: "DevOps Engineer", 
    customInstructions: "Focus on CI/CD, containerization, orchestration, infrastructure as code, monitoring, and cloud platforms. Ask about automation and system reliability."
  }
}

// Quick create functions for common roles
export const createFrontendInterviewer = (name?: string, experience?: 'junior' | 'mid' | 'senior') => 
  createHiringAgent({
    ...hiringAgentTemplates.frontendDeveloper,
    name: name || hiringAgentTemplates.frontendDeveloper.name,
    experience: experience
  })

export const createBackendInterviewer = (name?: string, experience?: 'junior' | 'mid' | 'senior') => 
  createHiringAgent({
    ...hiringAgentTemplates.backendDeveloper,
    name: name || hiringAgentTemplates.backendDeveloper.name,
    experience: experience
  })

export const createFullStackInterviewer = (name?: string, experience?: 'junior' | 'mid' | 'senior') => 
  createHiringAgent({
    ...hiringAgentTemplates.fullStackDeveloper,
    name: name || hiringAgentTemplates.fullStackDeveloper.name,
    experience: experience
  })

export const createDataScienceInterviewer = (name?: string, experience?: 'junior' | 'mid' | 'senior') => 
  createHiringAgent({
    ...hiringAgentTemplates.dataScientist,
    name: name || hiringAgentTemplates.dataScientist.name,
    experience: experience
  })

export const createProductManagerInterviewer = (name?: string, experience?: 'junior' | 'mid' | 'senior') => 
  createHiringAgent({
    ...hiringAgentTemplates.productManager,
    name: name || hiringAgentTemplates.productManager.name,
    experience: experience
  })

export const createDevOpsInterviewer = (name?: string, experience?: 'junior' | 'mid' | 'senior') => 
  createHiringAgent({
    ...hiringAgentTemplates.devOpsEngineer,
    name: name || hiringAgentTemplates.devOpsEngineer.name,
    experience: experience
  })
