

import { Code, Star, GitFork, ExternalLink } from "lucide-react";

interface GitHubReposProps {
    repos: any[];
    starred: any[];
}

export const GitHubRepos = ({ repos, starred }: GitHubReposProps) => {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-bold text-xl mb-6 text-foreground flex items-center gap-2">
                    <Code className="w-5 h-5 text-primary" />
                    Top Repositories
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repos.map((repo: any) => (
                        <a
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block bg-card/40 backdrop-blur-sm rounded-2xl p-5 border border-border/50 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1 min-w-0 pr-4">
                                    <h4 className="font-bold text-lg flex items-center gap-2 text-foreground truncate">
                                        {repo.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {repo.description || "No description provided"}
                                    </p>
                                </div>
                                <div className="flex space-x-3 text-muted-foreground shrink-0">
                                    {repo.stargazers_count > 0 && (
                                        <div className="flex items-center text-sm bg-secondary/30 px-2 py-1 rounded-full">
                                            <Star className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" />
                                            {repo.stargazers_count}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/30">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                                    {repo.language && (
                                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <GitFork className="w-3.5 h-3.5" />
                                        {repo.forks_count}
                                    </span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {starred.length > 0 && (
                <div>
                    <h3 className="font-bold text-xl mt-12 mb-6 text-foreground flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Starred Repositories
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {starred.map((repo: any) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block bg-card/40 backdrop-blur-sm rounded-2xl p-5 border border-border/50 hover:border-yellow-500/50 hover:bg-card/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0 pr-4">
                                        <h4 className="font-bold text-lg flex items-center gap-2 text-foreground truncate">
                                            {repo.full_name}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                            {repo.description || "No description provided"}
                                        </p>
                                    </div>
                                    <div className="flex space-x-3 text-muted-foreground shrink-0">
                                        {repo.stargazers_count > 0 && (
                                            <div className="flex items-center text-sm bg-secondary/30 px-2 py-1 rounded-full">
                                                <Star className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" />
                                                {repo.stargazers_count}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/30">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-foreground/50" />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="text-yellow-500/80 uppercase text-[10px] tracking-wider font-bold">Starred</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-yellow-500 transition-colors" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
