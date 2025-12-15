import { useState, useEffect } from "react";
import { X, Github, BookOpen, Star, Users, ExternalLink, TrendingUp, Calendar, Code, GitFork, Eye, Clock } from "lucide-react";
import { GitHubAnalytics } from "./github/GitHubAnalytics";
import { GitHubRepos } from "./github/GitHubRepos";
import { GitHubRecentActivity } from "./github/GitHubRecentActivity";
import { cn } from "@/lib/utils";

interface GitHubActivityProps {
    username: string;
    onClose: () => void;
}

export const GitHubActivityRedesigned = ({ username, onClose }: GitHubActivityProps) => {
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
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=12&sort=updated`);
            const reposData = await reposResponse.json();

            // Fetch starred repos
            const starredResponse = await fetch(`https://api.github.com/users/${username}/starred?per_page=10`);
            const starredData = await starredResponse.json();

            // Fetch events (recent activity)
            const eventsResponse = await fetch(`https://api.github.com/users/${username}/events/public?per_page=15`);
            const eventsData = await eventsResponse.json();

            setGithubData({
                user: userData,
                repos: reposData,
                starred: starredData,
                events: eventsData
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

    // Handle closing when clicking outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={handleBackdropClick}>
                <div className="bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-muted opacity-30"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
                    </div>
                    <p className="mt-4 text-muted-foreground animate-pulse">Fetching GitHub Data...</p>
                </div>
            </div>
        );
    }

    if (!githubData) {
        return null;
    }

    const { user, repos, starred, events } = githubData;
    const starredCount = starred?.length || 0;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={handleBackdropClick}>
            <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden flex flex-col ring-1 ring-white/10">

                {/* Header Section */}
                <div className="relative p-6 px-8 border-b border-border bg-gradient-to-r from-primary/5 via-background to-secondary/5">
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-background/50 hover:bg-destructive/10 hover:text-destructive border border-border/50 hover:border-destructive/30 transition-all duration-300 group"
                        >
                            <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start pt-2">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-accent rounded-full opacity-70 group-hover:opacity-100 blur transition duration-500"></div>
                            <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="relative w-24 h-24 rounded-full border-4 border-background shadow-xl object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-background rounded-full p-1.5 border border-border shadow-sm">
                                <Github className="w-5 h-5 text-foreground" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div>
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 tracking-tight">
                                    {user.name || user.login}
                                </h2>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-medium mt-1 group"
                                >
                                    @{user.login}
                                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </a>
                            </div>

                            <p className="text-muted-foreground max-w-xl mx-auto md:mx-0 text-sm md:text-base leading-relaxed">
                                {user.bio || "Passionate about building software and exploring new technologies."}
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span className="font-bold text-foreground">{user.followers}</span>
                                    <span className="text-muted-foreground">Followers</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm">
                                    <BookOpen className="w-4 h-4 text-accent" />
                                    <span className="font-bold text-foreground">{user.public_repos}</span>
                                    <span className="text-muted-foreground">Repos</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <span className="font-bold text-foreground">{starredCount}</span>
                                    <span className="text-muted-foreground">Starred</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center justify-center md:justify-start px-6 border-b border-border bg-muted/20">
                    <TabButton
                        active={activeTab === "analytics"}
                        onClick={() => setActiveTab("analytics")}
                        icon={<TrendingUp className="w-4 h-4" />}
                        label="Overview"
                    />
                    <TabButton
                        active={activeTab === "repos"}
                        onClick={() => setActiveTab("repos")}
                        icon={<Code className="w-4 h-4" />}
                        label="Repositories"
                    />
                    <TabButton
                        active={activeTab === "activity"}
                        onClick={() => setActiveTab("activity")}
                        icon={<Calendar className="w-4 h-4" />}
                        label="Activity Log"
                    />
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gradient-to-b from-transparent to-black/5">
                    <div className="max-w-6xl mx-auto space-y-6">
                        {activeTab === "analytics" && (
                            <div className="animate-scale-in">
                                <GitHubAnalytics userData={user} starredCount={starredCount} />
                                {/* We could duplicate some repo highlights here later if needed */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-500" />
                                        Highlighted Repositories
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {repos.slice(0, 4).map((repo: any) => (
                                            <RepoCard key={repo.id} repo={repo} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "repos" && (
                            <div className="animate-scale-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {repos.map((repo: any) => (
                                    <RepoCard key={repo.id} repo={repo} />
                                ))}
                            </div>
                        )}

                        {activeTab === "activity" && (
                            <div className="animate-scale-in">
                                <GitHubRecentActivity events={events} />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button
        onClick={onClick}
        className={cn(
            "relative flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-300 outline-none",
            active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
        )}
    >
        {active && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full layout-id" />
        )}
        {icon}
        {label}
    </button>
);

const RepoCard = ({ repo }: { repo: any }) => {
    // Determine language color (simple map)
    const getLangColor = (lang: string) => {
        const colors: Record<string, string> = {
            TypeScript: "bg-blue-500",
            JavaScript: "bg-yellow-400",
            Python: "bg-green-500",
            HTML: "bg-orange-500",
            CSS: "bg-purple-500",
            Java: "bg-red-500",
            Go: "bg-cyan-500",
            Rust: "bg-orange-700",
            "C++": "bg-blue-700",
        };
        return colors[lang] || "bg-primary";
    };

    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-4 bg-card/50 hover:bg-card hover:shadow-lg hover:-translate-y-1 border border-border/50 hover:border-primary/30 rounded-xl transition-all duration-300"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="font-semibold text-foreground truncate max-w-[150px] md:max-w-[200px]" title={repo.name}>
                        {repo.name}
                    </h4>
                </div>
                {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        {repo.stargazers_count}
                    </div>
                )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
                {repo.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                <div className="flex items-center gap-3">
                    {repo.language && (
                        <div className="flex items-center gap-1.5">
                            <span className={cn("w-2 h-2 rounded-full", getLangColor(repo.language))} />
                            {repo.language}
                        </div>
                    )}
                    <div className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <GitFork className="w-3 h-3" />
                        {repo.forks_count}
                    </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] opacity-70">
                    <Clock className="w-3 h-3" />
                    {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
            </div>
        </a>
    )
}
