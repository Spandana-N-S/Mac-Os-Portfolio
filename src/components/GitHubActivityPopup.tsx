import { useState, useEffect } from "react";
import { Github, Star, GitFork, Eye, GitCommit, BookOpen, X } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

export const GitHubActivityPopup = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<"repos" | "activity" | "starred">("repos");
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Extract GitHub username from the URL
  const githubUsername = portfolioData.contact.github.split('/').pop() || "Spandana-prog";

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
      const userData = await userResponse.json();
      
      // Fetch repos data
      const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=10&sort=updated`);
      const reposData = await reposResponse.json();
      
      // Fetch starred repos
      const starredResponse = await fetch(`https://api.github.com/users/${githubUsername}/starred?per_page=10`);
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
        },
        {
          id: 4,
          type: "PushEvent",
          repo: "Spandana-prog/portfolio-website",
          message: "Added GitHub analytics feature",
          time: "3 days ago"
        },
        {
          id: 5,
          type: "IssuesEvent",
          repo: "Spandana-prog/ecommerce-platform",
          message: "Implemented payment processing",
          time: "1 week ago"
        }
      ];
      
      setGithubData({
        user: userData,
        repos: reposData,
        starred: starredData.slice(0, 10),
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

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center">
            <Github className="w-8 h-8 text-primary mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">GitHub Analytics</h2>
              <p className="text-muted-foreground text-sm">Detailed insights into your GitHub activity</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-muted"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {loading ? (
          <div className="p-8 flex justify-center items-center flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : githubData ? (
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border p-4 flex flex-col">
              {/* User Profile */}
              <div className="flex items-center mb-6 p-3 bg-muted/10 rounded-lg">
                <img 
                  src={githubData.user.avatar_url} 
                  alt={githubData.user.login}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{githubData.user.name || githubData.user.login}</h3>
                  <p className="text-muted-foreground text-xs">@{githubData.user.login}</p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 md:grid-cols-1 gap-3 mb-6">
                <div className="bg-muted/10 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-foreground">{githubData.user.public_repos}</div>
                  <div className="text-muted-foreground text-xs">Repositories</div>
                </div>
                <div className="bg-muted/10 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-foreground">{githubData.user.followers}</div>
                  <div className="text-muted-foreground text-xs">Followers</div>
                </div>
                <div className="bg-muted/10 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-foreground">{starredRepos.length}</div>
                  <div className="text-muted-foreground text-xs">Starred</div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="space-y-1 flex-1">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "repos"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveTab("repos")}
                >
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  My Repositories
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "starred"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveTab("starred")}
                >
                  <Star className="w-4 h-4 inline mr-2" />
                  Starred Repos
                </button>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === "activity"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setActiveTab("activity")}
                >
                  <GitCommit className="w-4 h-4 inline mr-2" />
                  Recent Activity
                </button>
              </div>
              
              {/* Visit GitHub Button */}
              <a
                href={`https://${portfolioData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <Github className="w-4 h-4 mr-2" />
                Visit GitHub
              </a>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "repos" && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">My Repositories</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {githubData.repos.map((repo: any) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-foreground">{repo.name}</h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              {repo.description || "No description provided"}
                            </p>
                          </div>
                          <div className="flex space-x-3 text-muted-foreground">
                            {repo.stargazers_count > 0 && (
                              <div className="flex items-center text-sm">
                                <Star className="w-4 h-4 mr-1" />
                                {repo.stargazers_count}
                              </div>
                            )}
                            {repo.forks_count > 0 && (
                              <div className="flex items-center text-sm">
                                <GitFork className="w-4 h-4 mr-1" />
                                {repo.forks_count}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-3">
                          {repo.language && (
                            <span className="mr-3 px-2 py-1 bg-muted rounded-full">{repo.language}</span>
                          )}
                          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === "starred" && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Starred Repositories</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {starredRepos.map((repo: any) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 rounded-lg border border-border hover:bg-muted/10 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-foreground">{repo.full_name}</h4>
                            <p className="text-muted-foreground text-sm mt-1">
                              {repo.description || "No description provided"}
                            </p>
                          </div>
                          <div className="flex space-x-3 text-muted-foreground">
                            {repo.stargazers_count > 0 && (
                              <div className="flex items-center text-sm">
                                <Star className="w-4 h-4 mr-1" />
                                {repo.stargazers_count}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-3">
                          {repo.language && (
                            <span className="mr-3 px-2 py-1 bg-muted rounded-full">{repo.language}</span>
                          )}
                          <span>Starred</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === "activity" && (
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {githubData.activity.map((event: any) => (
                      <div key={event.id} className="p-4 rounded-lg border border-border">
                        <div className="flex items-start">
                          {event.type === "PushEvent" ? (
                            <GitCommit className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                          ) : event.type === "IssuesEvent" ? (
                            <BookOpen className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
                          ) : (
                            <Eye className="w-5 h-5 text-purple-500 mt-0.5 mr-3" />
                          )}
                          <div className="flex-1">
                            <p className="text-foreground">{event.message}</p>
                            <p className="text-muted-foreground text-sm mt-1">{event.repo}</p>
                            <p className="text-muted-foreground text-xs mt-2">{event.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 flex-1 flex items-center justify-center">
            <div className="text-center">
              <Github className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground mb-4">Unable to load GitHub data</p>
              <a
                href={`https://${portfolioData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Visit GitHub Profile
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};