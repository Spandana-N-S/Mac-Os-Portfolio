

import { Calendar, ExternalLink, GitCommit, BookOpen, Eye, GitFork, Code } from "lucide-react";
import { ReactNode } from "react";

interface ActivityEvent {
    id: string;
    type: string;
    repo: string;
    message: string;
    icon: ReactNode;
    time: string;
    url: string;
}

interface GitHubRecentActivityProps {
    events: any[];
}

export const GitHubRecentActivity = ({ events }: GitHubRecentActivityProps) => {

    // Process events for activity feed
    const processEvents = (events: any[]): ActivityEvent[] => {
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

    const activityData = processEvents(events);

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-xl text-foreground">Recent Activity</h3>
            <div className="space-y-4">
                {activityData.length > 0 ? (
                    activityData.map((event, index) => (
                        <a
                            key={event.id}
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-card/40 backdrop-blur-sm rounded-2xl p-5 border border-border/50 hover:border-primary/50 hover:bg-card/60 transition-all duration-300 group"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 rounded-xl bg-secondary mobile:hidden sm:block">
                                    {event.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">{event.message}</p>
                                    <p className="text-sm text-muted-foreground mt-1">{event.repo}</p>
                                    <p className="text-xs text-muted-foreground/70 font-medium mt-2 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-border" />
                                        {event.time}
                                    </p>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </a>
                    ))
                ) : (
                    <div className="text-center py-12 bg-card/20 rounded-2xl border border-dashed border-border/50">
                        <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground">No recent activity found</p>
                    </div>
                )}
            </div>
        </div>
    );
};
