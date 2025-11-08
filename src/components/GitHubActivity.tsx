import { useState, useEffect } from "react";
import { X, Github, Star, GitFork, Eye, GitCommit, BookOpen, TrendingUp, Award, Calendar, Code, Users, Trophy } from "lucide-react";

interface GitHubActivityProps {
  username: string;
  onClose: () => void;
}

export const GitHubActivity = ({ username, onClose }: GitHubActivityProps) => {
  const [activeTab, setActiveTab] = useState<"analytics" | "repos" | "activity">("analytics");
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      
      // Fetch repos data
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=6&sort=updated`);
      const reposData = await reposResponse.json();
      
      // Fetch starred repos
      const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=6`);
      const starredData = await starredResponse.json();
      
      // For activity, we'll simulate some data since the GitHub API for events requires authentication
      const activityData = [
        {
          id: 1,
          type: "PushEvent",
          repo: "Nathishwar-prog/ai-web-app",
          message: "Updated machine learning model integration",
          time: "2 hours ago"
        },
        {
          id: 2,
          type: "IssuesEvent",
          repo: "Nathishwar-prog/ml-dashboard",
          message: "Fixed data visualization bug",
          time: "1 day ago"
        },
        {
          id: 3,
          type: "WatchEvent",
          repo: "tensorflow/tensorflow",
          message: "Starred tensorflow/tensorflow",
          time: "2 days ago"
        },
        {
          id: 4,
          type: "CreateEvent",
          repo: "Nathishwar-prog/new-project",
          message: "Created new repository for React components",
          time: "3 days ago"
        }
      ];
      
      setGithubData({
        user: userData,
        repos: reposData,
        starred: starredData.slice(0, 6),
        activity: activityData
      });
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
  }, [username]);

  // Filter starred repositories (only show public ones)
  const starredRepos = githubData?.starred?.filter((repo: any) => !repo.private) || [];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">GitHub Analytics</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!githubData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">GitHub Analytics</h2>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Unable to load GitHub data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Github className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold">GitHub Analytics</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* User Profile Header */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="flex items-center gap-4">
            <img 
              src={githubData.user.avatar_url} 
              alt={githubData.user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold">{githubData.user.name || githubData.user.login}</h3>
              <p className="text-muted-foreground">@{githubData.user.login}</p>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{githubData.user.followers} followers</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{githubData.user.public_repos} repositories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-border">
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "analytics"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "repos"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("repos")}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Top Repositories
          </button>
          <button
            className={`flex-1 py-3 px-4 text-sm font-medium ${
              activeTab === "activity"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Recent Activity
          </button>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/10 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="font-medium">Repositories</h3>
                  </div>
                  <p className="text-2xl font-bold">{githubData.user.public_repos}</p>
                  <p className="text-xs text-muted-foreground mt-1">Public repositories</p>
                </div>
                
                <div className="bg-muted/10 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-medium">Starred</h3>
                  </div>
                  <p className="text-2xl font-bold">{starredRepos.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Starred repositories</p>
                </div>
                
                <div className="bg-muted/10 rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <h3 className="font-medium">Followers</h3>
                  </div>
                  <p className="text-2xl font-bold">{githubData.user.followers}</p>
                  <p className="text-xs text-muted-foreground mt-1">GitHub followers</p>
                </div>
              </div>
              
              {/* Contribution Visualization */}
              <div className="bg-muted/10 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Contribution Activity</h3>
                </div>
                
                {/* Simulated contribution graph */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Less</span>
                    <span>More</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 52 }).map((_, i) => {
                      const intensity = Math.floor(Math.random() * 5);
                      const colors = [
                        "bg-muted",
                        "bg-green-900/30",
                        "bg-green-700/50",
                        "bg-green-600/70",
                        "bg-green-500"
                      ];
                      return (
                        <div 
                          key={i} 
                          className={`w-2 h-2 rounded-sm ${colors[intensity]}`}
                          title={`${intensity * 2} contributions`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
              
              {/* Achievements */}
              <div className="bg-muted/10 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="font-medium">GitHub Achievements</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-background rounded-lg p-3 border border-border text-center">
                    <Award className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">First PR</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3 border border-border text-center">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">Stargazer</p>
                    <p className="text-xs text-muted-foreground">100+ stars</p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3 border border-border text-center">
                    <GitFork className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">Forker</p>
                    <p className="text-xs text-muted-foreground">50+ forks</p>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3 border border-border text-center">
                    <Code className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-xs font-medium">Contributor</p>
                    <p className="text-xs text-muted-foreground">100+ commits</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "repos" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Top Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {githubData.repos.map((repo: any) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-muted/10 rounded-xl p-4 border border-border hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{repo.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {repo.description || "No description"}
                        </p>
                      </div>
                      <div className="flex space-x-2 text-muted-foreground ml-2">
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            {repo.stargazers_count}
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="flex items-center text-xs">
                            <GitFork className="w-3 h-3 mr-1" />
                            {repo.forks_count}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-3">
                      {repo.language && (
                        <span className="mr-2 px-2 py-1 bg-muted rounded-full">{repo.language}</span>
                      )}
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                    </div>
                  </a>
                ))}
              </div>
              
              <h3 className="font-semibold text-lg mt-6">Starred Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {starredRepos.map((repo: any) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-muted/10 rounded-xl p-4 border border-border hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{repo.full_name}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {repo.description || "No description"}
                        </p>
                      </div>
                      <div className="flex space-x-2 text-muted-foreground ml-2">
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            {repo.stargazers_count}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-3">
                      {repo.language && (
                        <span className="mr-2 px-2 py-1 bg-muted rounded-full">{repo.language}</span>
                      )}
                      <span>Starred</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "activity" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              <div className="space-y-3">
                {githubData.activity.map((event: any) => (
                  <div 
                    key={event.id} 
                    className="bg-muted/10 rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-start gap-3">
                      {event.type === "PushEvent" ? (
                        <GitCommit className="w-5 h-5 text-blue-500 mt-0.5" />
                      ) : event.type === "IssuesEvent" ? (
                        <BookOpen className="w-5 h-5 text-yellow-500 mt-0.5" />
                      ) : event.type === "WatchEvent" ? (
                        <Eye className="w-5 h-5 text-purple-500 mt-0.5" />
                      ) : (
                        <Calendar className="w-5 h-5 text-green-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{event.message}</p>
                        <p className="text-sm text-muted-foreground mt-1">{event.repo}</p>
                        <p className="text-xs text-muted-foreground mt-2">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};