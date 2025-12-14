
import { Code, Star, GitFork, ExternalLink } from "lucide-react";

interface GitHubReposProps {
    repos: any[];
    starred: any[];
}

export const GitHubRepos = ({ repos, starred }: GitHubReposProps) => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-bold text-xl mb-6 text-white">Top Repositories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] gap-4">
                    {repos.map((repo: any) => (
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
                    {starred.map((repo: any) => (
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
    );
};
