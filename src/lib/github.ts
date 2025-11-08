// GitHub API service
const GITHUB_API_URL = 'https://api.github.com';

// In a real application, you would use a GitHub personal access token
// For this demo, we'll use mock data
const MOCK_GITHUB_DATA = {
  user: {
    login: "Nathishwar-prog",
    name: "Nathishwar C",
    avatar_url: "https://avatars.githubusercontent.com/u/12345678?v=4",
    bio: "Full Stack Developer passionate about creating elegant solutions to complex problems.",
    location: "San Francisco, CA",
    public_repos: 24,
    followers: 156,
    following: 89,
    html_url: "https://github.com/Nathishwar-prog"
  },
  repos: [
    {
      id: 1,
      name: "ecommerce-platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      language: "TypeScript",
      stargazers_count: 42,
      forks_count: 12,
      html_url: "https://github.com/Nathishwar-prog/ecommerce-platform",
      updated_at: "2023-10-15T14:30:00Z"
    },
    {
      id: 2,
      name: "task-management-app",
      description: "Collaborative task management tool with real-time updates",
      language: "JavaScript",
      stargazers_count: 28,
      forks_count: 7,
      html_url: "https://github.com/Nathishwar-prog/task-management-app",
      updated_at: "2023-09-22T09:15:00Z"
    },
    {
      id: 3,
      name: "weather-dashboard",
      description: "Beautiful weather forecast application with data visualization",
      language: "React",
      stargazers_count: 15,
      forks_count: 3,
      html_url: "https://github.com/Nathishwar-prog/weather-dashboard",
      updated_at: "2023-08-30T16:45:00Z"
    },
    {
      id: 4,
      name: "portfolio-website",
      description: "Personal portfolio website built with React and Tailwind CSS",
      language: "TypeScript",
      stargazers_count: 8,
      forks_count: 2,
      html_url: "https://github.com/Nathishwar-prog/portfolio-website",
      updated_at: "2023-11-05T11:20:00Z"
    }
  ],
  events: [
    {
      id: 1,
      type: "PushEvent",
      repo: {
        name: "Nathishwar-prog/ecommerce-platform"
      },
      payload: {
        commits: [
          {
            message: "Add payment processing functionality"
          }
        ]
      },
      created_at: "2023-11-10T14:30:00Z"
    },
    {
      id: 2,
      type: "IssuesEvent",
      repo: {
        name: "Nathishwar-prog/task-management-app"
      },
      payload: {
        action: "opened",
        issue: {
          title: "Implement user authentication"
        }
      },
      created_at: "2023-11-09T09:15:00Z"
    },
    {
      id: 3,
      type: "WatchEvent",
      repo: {
        name: "facebook/react"
      },
      payload: {
        action: "started"
      },
      created_at: "2023-11-08T16:45:00Z"
    }
  ]
};

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

export interface GitHubEvent {
  id: number;
  type: string;
  repo: {
    name: string;
  };
  payload: {
    action?: string;
    commits?: { message: string }[];
    issue?: { title: string };
  };
  created_at: string;
}

export const fetchGitHubData = async (username: string): Promise<{
  user: GitHubUser;
  repos: GitHubRepo[];
  events: GitHubEvent[];
}> => {
  // In a real implementation, you would fetch from the GitHub API:
  const userResponse = await fetch(`${GITHUB_API_URL}/users/${username}`);
  const user = await userResponse.json();
  
  const reposResponse = await fetch(`${GITHUB_API_URL}/users/${username}/repos`);
  const repos = await reposResponse.json();
  
  const eventsResponse = await fetch(`${GITHUB_API_URL}/users/${username}/events`);
  const events = await eventsResponse.json();
  
  return { user, repos, events };

  // For this demo, we'll return mock data
  // return MOCK_GITHUB_DATA;
};