

import { BookOpen, Star, Users, TrendingUp, Trophy, Award, GitFork, Code } from "lucide-react";

interface GitHubAnalyticsProps {
    userData: any;
    starredCount: number;
}

export const GitHubAnalytics = ({ userData, starredCount }: GitHubAnalyticsProps) => {
    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            <BookOpen className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Repositories</h3>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{userData.public_repos}</p>
                    <p className="text-sm text-muted-foreground mt-2">Public repositories</p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-yellow-500/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                            <Star className="w-6 h-6 text-yellow-500" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Starred</h3>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{starredCount}</p>
                    <p className="text-sm text-muted-foreground mt-2">Starred repositories</p>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-purple-500/50 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                            <Users className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">Followers</h3>
                    </div>
                    <p className="text-3xl font-bold text-foreground">{userData.followers}</p>
                    <p className="text-sm text-muted-foreground mt-2">GitHub followers</p>
                </div>
            </div>

            {/* Contribution Visualization */}
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-green-500/10">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">Contribution Activity</h3>
                </div>

                {/* Simulated contribution graph with enhanced visuals */}
                <div className="space-y-4">
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Less</span>
                        <div className="flex gap-2">
                            <div className="w-4 h-4 bg-muted rounded-sm"></div>
                            <div className="w-4 h-4 bg-green-900/40 rounded-sm"></div>
                            <div className="w-4 h-4 bg-green-700/60 rounded-sm"></div>
                            <div className="w-4 h-4 bg-green-600/80 rounded-sm"></div>
                            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                        </div>
                        <span>More</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 52 }).map((_, i) => {
                            const intensity = Math.floor(Math.random() * 5);
                            const colors = [
                                "bg-muted",
                                "bg-green-900/40",
                                "bg-green-700/60",
                                "bg-green-600/80",
                                "bg-green-500"
                            ];
                            return (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-sm ${colors[intensity]} transition-all hover:scale-125 hover:ring-2 ring-background`}
                                    title={`${intensity * 5} contributions`}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2 font-medium">
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
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-yellow-500/10">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">GitHub Achievements</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-background/50 rounded-xl p-4 border border-border/50 text-center transition-transform hover:scale-105 hover:bg-background hover:shadow-lg">
                        <Award className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                        <p className="font-bold text-foreground">First PR</p>
                        <p className="text-xs text-muted-foreground mt-1">Completed</p>
                    </div>

                    <div className="bg-background/50 rounded-xl p-4 border border-border/50 text-center transition-transform hover:scale-105 hover:bg-background hover:shadow-lg">
                        <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                        <p className="font-bold text-foreground">Stargazer</p>
                        <p className="text-xs text-muted-foreground mt-1">100+ stars</p>
                    </div>

                    <div className="bg-background/50 rounded-xl p-4 border border-border/50 text-center transition-transform hover:scale-105 hover:bg-background hover:shadow-lg">
                        <GitFork className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                        <p className="font-bold text-foreground">Forker</p>
                        <p className="text-xs text-muted-foreground mt-1">50+ forks</p>
                    </div>

                    <div className="bg-background/50 rounded-xl p-4 border border-border/50 text-center transition-transform hover:scale-105 hover:bg-background hover:shadow-lg">
                        <Code className="w-8 h-8 text-green-500 mx-auto mb-3" />
                        <p className="font-bold text-foreground">Contributor</p>
                        <p className="text-xs text-muted-foreground mt-1">100+ commits</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
