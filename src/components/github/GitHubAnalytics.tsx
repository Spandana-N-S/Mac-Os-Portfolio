
import { BookOpen, Star, Users, TrendingUp, Trophy, Award, GitFork, Code } from "lucide-react";

interface GitHubAnalyticsProps {
    userData: any;
    starredCount: number;
}

export const GitHubAnalytics = ({ userData, starredCount }: GitHubAnalyticsProps) => {
    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 text-white md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-2xl p-6 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                            <BookOpen className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="font-bold text-lg">Repositories</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-400">{userData.public_repos}</p>
                    <p className="text-sm text-muted-foreground mt-2">Public repositories</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 rounded-2xl p-6 border border-yellow-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-yellow-500/20">
                            <Star className="w-6 h-6 text-yellow-400" />
                        </div>
                        <h3 className="font-bold text-lg">Starred</h3>
                    </div>
                    <p className="text-3xl font-bold text-yellow-400">{starredCount}</p>
                    <p className="text-sm text-muted-foreground mt-2">Starred repositories</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-2xl p-6 border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                            <Users className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="font-bold text-lg">Followers</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-400">{userData.followers}</p>
                    <p className="text-sm text-muted-foreground mt-2">GitHub followers</p>
                </div>
            </div>

            {/* Contribution Visualization */}
            <div className="bg-gradient-to-br text-white bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] from-background/50 to-muted/30 rounded-2xl p-6 border border-border">
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
    );
};
