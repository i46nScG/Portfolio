export const email = "Tokioshy@pm.me";

export const roles = ["Discord bots", "web tools", "serverless bots", "things in TypeScript"];

export const links = {
    github: "https://github.com/i46nScG",
    githubRepos: "https://github.com/i46nScG?tab=repositories",
    githubAvatar: "https://github.com/i46nScG.png",
    instagram: "https://instagram.com/Tokioshy",
    discord: "https://discord.gg/ZUahYpXXBD",
    anilist: "https://anilist.co/user/Tokioshy/",
    wattpad: "https://www.wattpad.com/story/419164778-the-women-between-two-hearts",
};

export const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#skills" },
    { label: "Showcase", href: "#showcase" },
    { label: "Contact", href: "#contact" },
];

export const sectionIds = ["home", "about", "projects", "skills", "showcase", "contact"] as const;
export const sectionAliases: Record<string, string> = { top: "home", stack: "skills" };

export type ProjectFilter = "all" | "bots" | "web";
export const filterDefs: { value: ProjectFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "bots", label: "Discord bots" },
    { value: "web", label: "Web apps" },
];
