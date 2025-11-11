import { useState, useEffect } from "react";
import { X, Github, Star, GitFork, Eye, GitCommit, BookOpen, TrendingUp, Award, Calendar, Code, Users, Trophy, ExternalLink } from "lucide-react";

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
      
      // Fetch repos data (increased to 8 for better display)
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=8&sort=updated`);
      const reposData = await reposResponse.json();
      
      // Fetch starred repos
      const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=8`);
      const starredData = await starredResponse.json();
      
      // Fetch events (recent activity)
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`);
      const eventsData = await eventsResponse.json();
      
      setGithubData({
        user: userData,
        repos: reposData,
        starred: starredData.slice(0, 8),
        events: eventsData.slice(0, 10)
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

  // Process events for activity feed
  const processEvents = (events: any[]) => {
    if (!events) return [];
    
    return events.map((event: any) => {
      let message = "";
      let icon = <Calendar className="w-5 h-5 text-green-500" />;
      
      switch (event.type) {
        case "PushEvent":
          message = `Pushed ${event.payload.commits?.length || 1} commit(s) to ${event.repo.name}`;
          icon = <GitCommit className="w-5 h-5 text-blue-500" />;
          break;
        case "IssuesEvent":
          message = `${event.payload.action} issue in ${event.repo.name}`;
          icon = <BookOpen className="w-5 h-5 text-yellow-500" />;
          break;
        case "WatchEvent":
          message = `Starred ${event.repo.name}`;
          icon = <Eye className="w-5 h-5 text-purple-500" />;
          break;
        case "ForkEvent":
          message = `Forked ${event.repo.name}`;
          icon = <GitFork className="w-5 h-5 text-orange-500" />;
          break;
        case "CreateEvent":
          message = `Created ${event.payload.ref_type} in ${event.repo.name}`;
          icon = <Code className="w-5 h-5 text-green-500" />;
          break;
        default:
          message = `${event.type} in ${event.repo.name}`;
      }
      
      return {
        id: event.id,
        type: event.type,
        repo: event.repo.name,
        message,
        icon,
        time: new Date(event.created_at).toLocaleDateString(),
        url: `https://github.com/${event.repo.name}`
      };
    });
  };

  const activityData = githubData?.events ? processEvents(githubData.events) : [];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-card to-muted border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">GitHub Analytics</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!githubData) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-card to-muted border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-bold">GitHub Analytics</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-center h-96">
            <p className="text-muted-foreground text-lg">Unable to load GitHub data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-card to-muted border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with View GitHub button */}
        <div className="flex items-center text-white justify-between p-6 border-b border-border bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">GitHub Analytics</h2>
              <p className="text-sm text-muted-foreground">@{githubData.user.login}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View GitHub
            </a>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-black transition-colors fill-white" />
            </button>
          </div>
        </div>
        
        {/* User Profile Header */}
        <div className="p-6 bg-gradient-to-r from-background/50 to-muted/30 border-b bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] text-white border-border">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img 
              src={githubData.user.avatar_url} 
              alt={githubData.user.login}
              className="w-20 h-20 rounded-full border-4 border-primary/30"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold">{githubData.user.name || githubData.user.login}</h3>
              <p className="text-muted-foreground mt-1">{githubData.user.bio || "Passionate developer"}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{githubData.user.followers}</span>
                  <span className="text-muted-foreground text-sm">Followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="font-medium">{githubData.user.public_repos}</span>
                  <span className="text-muted-foreground text-sm">Repositories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium">{starredRepos.length}</span>
                  <span className="text-muted-foreground text-sm">Starred</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-border bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] text-white">
          <button
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === "analytics"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            className={`flex-1 text py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === "repos"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setActiveTab("repos")}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Top Repositories
          </button>
          <button
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
              activeTab === "activity"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => setActiveTab("activity")}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Recent Activity
          </button>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] p-6 ">
          {activeTab === "analytics" && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1  text-white md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-2xl p-6 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-bold text-lg">Repositories</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-400">{githubData.user.public_repos}</p>
                  <p className="text-sm text-muted-foreground mt-2">Public repositories</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 rounded-2xl p-6 border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <Star className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="font-bold text-lg">Starred</h3>
                  </div>
                  <p className="text-3xl font-bold text-yellow-400">{starredRepos.length}</p>
                  <p className="text-sm text-muted-foreground mt-2">Starred repositories</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-lg">Followers</h3>
                  </div>
                  <p className="text-3xl font-bold text-purple-400">{githubData.user.followers}</p>
                  <p className="text-sm text-muted-foreground mt-2">GitHub followers</p>
                </div>
              </div>
              
              {/* Contribution Visualization */}
              <div className="bg-gradient-to-br  text-white bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] from-background/50 to-muted/30 rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-black/20">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-lg">Contribution Activity</h3>
                </div>
                
                {/* Simulated contribution graph with enhanced visuals */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Less</span>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 bg-muted rounded-sm"></div>
                      <div className="w-4 h-4 bg-green-900/30 rounded-sm"></div>
                      <div className="w-4 h-4 bg-green-700/50 rounded-sm"></div>
                      <div className="w-4 h-4 bg-green-600/70 rounded-sm"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                    </div>
                    <span>More</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
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
                          className={`w-3 h-3 rounded-sm ${colors[intensity]} transition-all hover:scale-110`}
                          title={`${intensity * 5} contributions`}
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
              <div className="bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] text-white bg-gradient-to-br from-background/50 to-muted/30 rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-yellow-500/20">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="font-bold text-lg">GitHub Achievements</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-xl p-4 border border-blue-500/20 text-center transition-transform hover:scale-105">
                    <Award className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <p className="font-bold">First PR</p>
                    <p className="text-xs text-muted-foreground mt-1">Completed</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 rounded-xl p-4 border border-yellow-500/20 text-center transition-transform hover:scale-105">
                    <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <p className="font-bold">Stargazer</p>
                    <p className="text-xs text-muted-foreground mt-1">100+ stars</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-xl p-4 border border-purple-500/20 text-center transition-transform hover:scale-105">
                    <GitFork className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <p className="font-bold">Forker</p>
                    <p className="text-xs text-muted-foreground mt-1">50+ forks</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-xl p-4 border border-green-500/20 text-center transition-transform hover:scale-105">
                    <Code className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <p className="font-bold">Contributor</p>
                    <p className="text-xs text-muted-foreground mt-1">100+ commits</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "repos" && (
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-xl mb-6 text-white">Top Repositories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] gap-4">
                  {githubData.repos.map((repo: any) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-br from-background/50 to-muted/30 rounded-2xl p-5 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            {repo.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-2 text-white line-clamp-2">
                            {repo.description || "No description provided"}
                          </p>
                        </div>
                        <div className="flex space-x-3 text-muted-foreground ml-2 text-blue-800">
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center text-sm">
                              <Star className="w-4 h-4 mr-1 text-yellow-500" />
                              {repo.stargazers_count}
                            </div>
                          )}
                          {repo.forks_count > 0 && (
                            <div className="flex items-center text-sm">
                              <GitFork className="w-4 h-4 mr-1 text-blue-500" />
                              {repo.forks_count}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-blue-800 mt-4">
                        <div className="flex items-center text-xs text-muted-foreground text-blue-800 font-bold">
                          {repo.language && (
                            <span className="mr-3 px-2 py-1 bg-muted rounded-full">{repo.language}</span>
                          )}
                          <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mt-8 mb-6 text-white">Starred Repositories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]">
                  {starredRepos.map((repo: any) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-br from-background/50 to-muted/30 rounded-2xl p-5 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                    >
                      <div className="flex justify-between  items-start">
                        <div>
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            <Star className="w-5 h-5 text-blue-800" />
                            {repo.full_name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-2 text-white line-clamp-2">
                            {repo.description || "No description provided"}
                          </p>
                        </div>
                        <div className="flex space-x-3 text-muted-foreground ml-2">
                          {repo.stargazers_count > 0 && (
                            <div className="flex items-center text-sm text-blue-800">
                              <Star className="w-4 h-4 mr-1 text-yellow-800" />
                              {repo.stargazers_count}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-xs text-blue-800 font-bold text-muted-foreground">
                          {repo.language && (
                            <span className="mr-3 px-2 py-1 bg-muted  rounded-full">{repo.language}</span>
                          )}
                          <span>Starred</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "activity" && (
            <div className="space-y-6">
              <h3 className="font-bold text-xl text-white">Recent Activity</h3>
              <div className="space-y-4">
                {activityData.length > 0 ? (
                  activityData.map((event: any) => (
                    <a
                      key={event.id}
                      href={`https://github.com/${event.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-br from-background/50 to-muted/30 rounded-2xl p-5 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-muted/40 text-blue-800">
                          {event.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-black">{event.message}</p>
                          <p className="text-sm text-white  mt-1">{event.repo}</p>
                          <p className="text-xs text-blue-800 font-bold mt-2">{event.time}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground mt-1" />
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No recent activity found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};