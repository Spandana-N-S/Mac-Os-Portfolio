// GitHub API service for Spandana
const GITHUB_API_URL = 'https://api.github.com';

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
  description: string | null;
  language: string | null;
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

export const fetchGitHubData = async (username: 'Spandana-N-S'): Promise<{
  user: GitHubUser;
  repos: GitHubRepo[];
  events: GitHubEvent[];
}> => {
  const userResponse = await fetch(`${GITHUB_API_URL}/users/${username}`);
  const user = await userResponse.json();
  
  const reposResponse = await fetch(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=100`);
  const repos = await reposResponse.json();
  
  const eventsResponse = await fetch(`${GITHUB_API_URL}/users/${username}/events?per_page=3`);
  const events = await eventsResponse.json();
  
  return { user, repos, events };
};

// Convenience function for components
export const fetchStarredRepos = async (username: 'Spandana-N-S'): Promise<GitHubRepo[]> => {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}/starred?per_page=4`);
  return await response.json();
};
