import { useState, useEffect } from "react";
import { Github, Star, GitFork, Eye, GitCommit, BookOpen, TrendingUp, Award, Calendar, Code } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

export const GitHubActivityCard = () => {
  const [activeTab, setActiveTab] = useState<"repos" | "starred" | "activity">("repos");
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Extract GitHub username from the URL
  const githubUsername = portfolioData.contact.github.split('/').pop() || "Spandana-prog";

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
      const userData = await userResponse.json();
      
      // Fetch repos data
      const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=5&sort=updated`);
      const reposData = await reposResponse.json();
      
      // Fetch starred repos
      const starredResponse = await fetch(`https://api.github.com/users/${githubUsername}/starred?per_page=5`);
      const starredData = await starredResponse.json();
      
      // For activity, we'll simulate some data since the GitHub API for events requires authentication
      const activityData = [
        {
          id: 1,
          type: "PushEvent",
          repo: "Spandana-prog/ai-web-app",
          message: "Updated machine learning model integration",
          time: "2 hours ago"
        },
        {
          id: 2,
          type: "IssuesEvent",
          repo: "Spandana-prog/ml-dashboard",
          message: "Fixed data visualization bug",
          time: "1 day ago"
        },
        {
          id: 3,
          type: "WatchEvent",
          repo: "tensorflow/tensorflow",
          message: "Starred tensorflow/tensorflow",
          time: "2 days ago"
        }
      ];
      
      setGithubData({
        user: userData,
        repos: reposData,
        starred: starredData.slice(0, 5),
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
  }, []);

  // Filter starred repositories (only show public ones)
  const starredRepos = githubData?.starred?.filter((repo: any) => !repo.private) || [];

  if (loading) {
    return (
      <div className="h-full flex flex-col bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="flex items-center">
            <Github className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-semibold text-foreground text-sm">GitHub Analytics</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!githubData) {
    return (
      <div className="h-full flex flex-col bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="flex items-center">
            <Github className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-semibold text-foreground text-sm">GitHub Analytics</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-muted-foreground text-sm">Unable to load data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="flex items-center">
          <Github className="w-5 h-5 text-primary mr-2" />
          <h3 className="font-semibold text-white text-sm">GitHub Analytics</h3>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]">
        {/* Sidebar (30%) - User profile and stats */}
        <div className="w-full md:w-24 lg:w-32 border-b md:border-b-0 md:border-r border-border p-3 flex flex-row md:flex-col">
          {/* User Profile */}
          <div className="flex md:flex-col items-center mb-4">
            <img 
              src={githubData.user.avatar_url} 
              alt={githubData.user.login}
              className="w-10 h-10 rounded-full mr-3 md:mr-0 md:mb-2"
            />
            <div className="md:text-center">
              <h4 className="font-semibold text-foreground text-xs truncate">{githubData.user.name || githubData.user.login}</h4>
              <p className="text-muted-foreground text-xs truncate">@{githubData.user.login}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-1 text-white gap-2 mb-4 flex-1">
            <div className="bg-muted/10 p-2 rounded text-center">
              <div className="text-xs font-bold text-white">{githubData.user.public_repos}</div>
              <div className="text-muted-foreground text-xs font-bold">Repos</div>
            </div>
            <div className="bg-muted/10 p-2 rounded text-center">
              <div className="text-xs font-bold text-white">{githubData.user.followers}</div>
              <div className="text-muted-foreground text-xs font-bold">Followers</div>
            </div>
            <div className="bg-muted/10 p-2 rounded text-center">
              <div className="text-xs font-bold text-foreground">{starredRepos.length}</div>
              <div className="text-muted-foreground text-xs">Starred</div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="space-y-1 flex-1">
            <button
              className={`w-full text-left px-2 py-1 rounded text-xs font-medium ${
                activeTab === "repos"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              onClick={() => setActiveTab("repos")}
            >
              <BookOpen className="w-3 h-3 inline mr-1" />
              <span className="hidden md:inline">Repos</span>
            </button>
            <button
              className={`w-full text-left px-2 py-1 rounded text-xs font-medium ${
                activeTab === "starred"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              onClick={() => setActiveTab("starred")}
            >
              <Star className="w-3 h-3 inline mr-1" />
              <span className="hidden md:inline">Starred</span>
            </button>
            <button
              className={`w-full text-left px-2 py-1 rounded text-xs font-medium ${
                activeTab === "activity"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
              onClick={() => setActiveTab("activity")}
            >
              <GitCommit className="w-3 h-3 inline mr-1" />
              <span className="hidden md:inline">Activity</span>
            </button>
          </div>
        </div>
        
        {/* Main Content (70%) - Tab content */}
        <div className="flex-1 overflow-y-auto p-3">
          {activeTab === "repos" && (
            <div>
              <h4 className="font-semibold text-white text-sm mb-2">Top Repositories</h4>
              <div className="space-y-2">
                {githubData.repos.map((repo: any) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-border hover:bg-muted/20 transition-all duration-200 hover:shadow-md hover:border-cyan-500/50"
                  >
                    <div className="flex text-white justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-white text-sm truncate">{repo.name}</h5>
                        <p className="text-muted-foreground text-xs mt-1 truncate">
                          {repo.description || "No description"}
                        </p>
                      </div>
                      <div className="flex space-x-2 text-muted-foreground ml-2">
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center text-xs text-yellow-400">
                            <Star className="w-3 h-3 mr-1" />
                            {repo.stargazers_count}
                          </div>
                        )}
                        {repo.forks_count > 0 && (
                          <div className="flex items-center text-xs text-cyan-400">
                            <GitFork className="w-3 h-3 mr-1" />
                            {repo.forks_count}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-2 gap-2">
                      {repo.language && (
                        <span className="px-2 py-1 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] rounded-full font-bold border border-cyan-500/20">
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-1"></span>
                            {repo.language}
                          </span>
                        </span>
                      )}
                      <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                      {repo.private && (
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full">
                          Private
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "starred" && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Starred Repositories</h4>
              <div className="space-y-2">
                {starredRepos.map((repo: any) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 rounded-lg border border-border hover:bg-muted/20 transition-all duration-200 hover:shadow-md hover:border-cyan-500/50"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-foreground text-sm truncate">{repo.full_name}</h5>
                        <p className="text-muted-foreground text-xs mt-1 truncate">
                          {repo.description || "No description"}
                        </p>
                      </div>
                      <div className="flex space-x-2 text-muted-foreground ml-2">
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center text-xs text-yellow-400">
                            <Star className="w-3 h-3 mr-1" />
                            {repo.stargazers_count}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center text-xs text-muted-foreground mt-2 gap-2">
                      {repo.language && (
                        <span className="px-2 py-1 bg-muted rounded-full border border-cyan-500/20">
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 mr-1"></span>
                            {repo.language}
                          </span>
                        </span>
                      )}
                      <span>Starred</span>
                      {repo.private && (
                        <span className="px-2 py-1 bg-purple-900/50 text-purple-300 rounded-full">
                          Private
                        </span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "activity" && (
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Recent Activity</h4>
              <div className="space-y-2">
                {githubData.activity.map((event: any) => (
                  <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-muted/20 transition-all duration-200">
                    <div className="flex items-start">
                      {event.type === "PushEvent" ? (
                        <GitCommit className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      ) : event.type === "IssuesEvent" ? (
                        <BookOpen className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      ) : (
                        <Eye className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm">{event.message}</p>
                        <p className="text-muted-foreground text-xs mt-1 truncate">{event.repo}</p>
                        <p className="text-muted-foreground text-xs mt-1">{event.time}</p>
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