import { useState, useEffect } from "react";
import { Github, Star, Eye, GitCommit, FileText, GitFork } from "lucide-react";
import { fetchGitHubData, GitHubUser, GitHubRepo, GitHubEvent } from "@/lib/github";

interface GitHubActivityProps {
  username: string;
  onClose: () => void;
}

export const GitHubActivity = ({ username, onClose }: GitHubActivityProps) => {
  const [githubData, setGithubData] = useState<{
    user: GitHubUser;
    repos: GitHubRepo[];
    events: GitHubEvent[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubData(username);
        setGithubData(data);
      } catch (err) {
        setError("Failed to load GitHub data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, [username]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case "PushEvent":
        return <GitCommit className="w-5 h-5 text-blue-500" />;
      case "IssuesEvent":
        return <FileText className="w-5 h-5 text-yellow-500" />;
      case "WatchEvent":
        return <Eye className="w-5 h-5 text-purple-500" />;
      default:
        return <Github className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEventMessage = (event: GitHubEvent) => {
    switch (event.type) {
      case "PushEvent":
        return `Pushed ${event.payload.commits?.length || 0} commit(s) to ${event.repo.name}`;
      case "IssuesEvent":
        return `${event.payload.action} issue "${event.payload.issue?.title}" in ${event.repo.name}`;
      case "WatchEvent":
        return `Starred ${event.repo.name}`;
      default:
        return `${event.type} in ${event.repo.name}`;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">GitHub Activity</h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card rounded-xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-border">
            <h2 className="text-2xl font-bold text-foreground">GitHub Activity</h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6 text-center">
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!githubData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">GitHub Activity</h2>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* User Profile */}
          <div className="flex items-center mb-8 p-6 bg-muted/10 rounded-xl">
            <img 
              src={githubData.user.avatar_url} 
              alt={githubData.user.login}
              className="w-20 h-20 rounded-full mr-6"
            />
            <div>
              <h3 className="text-2xl font-bold text-foreground">{githubData.user.name}</h3>
              <p className="text-muted-foreground mb-2">@{githubData.user.login}</p>
              <p className="text-foreground mb-2">{githubData.user.bio}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-4">{githubData.user.location}</span>
                <span className="mr-4">{githubData.user.public_repos} repositories</span>
                <span className="mr-4">{githubData.user.followers} followers</span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-muted/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{githubData.user.public_repos}</div>
              <div className="text-muted-foreground">Repositories</div>
            </div>
            <div className="bg-muted/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{githubData.user.followers}</div>
              <div className="text-muted-foreground">Followers</div>
            </div>
            <div className="bg-muted/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-foreground">{githubData.user.following}</div>
              <div className="text-muted-foreground">Following</div>
            </div>
          </div>
          
          {/* Repositories */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">Top Repositories</h3>
            <div className="grid grid-cols-1 gap-4">
              {githubData.repos.map((repo) => (
                <div key={repo.id} className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-primary hover:underline"
                      >
                        {repo.name}
                      </a>
                      <p className="text-muted-foreground mt-1">{repo.description}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {repo.language && (
                        <span>{repo.language}</span>
                      )}
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks_count}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Updated {formatDate(repo.updated_at)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {githubData.events.map((event) => (
                <div key={event.id} className="flex items-start p-4 border border-border rounded-lg hover:bg-muted/10 transition-colors">
                  <div className="mr-4 mt-1">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{getEventMessage(event)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(event.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};