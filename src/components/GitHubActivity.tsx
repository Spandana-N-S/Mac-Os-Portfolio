import { useState, useEffect } from "react";
import { X, Github, BookOpen, Star, Users, ExternalLink, TrendingUp, Calendar, Code } from "lucide-react";
import { GitHubAnalytics } from "./github/GitHubAnalytics";
import { GitHubRepos } from "./github/GitHubRepos";
import { GitHubRecentActivity } from "./github/GitHubRecentActivity";

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
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${activeTab === "analytics"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-white"
              }`}
            onClick={() => setActiveTab("analytics")}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Analytics
          </button>
          <button
            className={`flex-1 text py-4 px-6 text-sm font-medium transition-colors ${activeTab === "repos"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-white"
              }`}
            onClick={() => setActiveTab("repos")}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Top Repositories
          </button>
          <button
            className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${activeTab === "activity"
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
            <GitHubAnalytics userData={githubData.user} starredCount={starredRepos.length} />
          )}

          {activeTab === "repos" && (
            <GitHubRepos repos={githubData.repos} starred={starredRepos} />
          )}

          {activeTab === "activity" && (
            <GitHubRecentActivity events={githubData.events} />
          )}
        </div>
      </div>
    </div>
  );
};