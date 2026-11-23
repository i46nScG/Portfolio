import { motion } from "framer-motion";
import { links } from "../../data/site";
import { Reveal } from "../ui/Motion";
import { Tip } from "../ui/Tip";

export function About() {
    return (
        <section id="about" className="page-section px-5 py-20">
            <div className="about-layout mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-[minmax(220px,0.8fr)_1.2fr] md:gap-16">
                <Reveal variant="left" className="about-profile">
                    <h2 className="font-display text-4xl font-bold tracking-tight">About</h2>
                    <Tip content="github.com/i46nScG" side="bottom">
                        <motion.a
                            className="profile-card"
                            href={links.github}
                            target="_blank"
                            rel="noopener"
                            aria-label="View Tokioshy's GitHub profile"
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        >
                            <span className="profile-avatar-wrap">
                                <img
                                    className="profile-avatar"
                                    src={links.githubAvatar}
                                    alt="Tokioshy's GitHub profile picture"
                                    width={112}
                                    height={112}
                                    loading="eager"
                                />
                            </span>
                            <span className="profile-caption">
                                <strong>Tokioshy</strong>
                                <span>Developer · Indonesia</span>
                            </span>
                            <span className="profile-arrow" aria-hidden="true">
                                ↗
                            </span>
                        </motion.a>
                    </Tip>
                </Reveal>
                <div className="about-copy space-y-5 text-lg leading-relaxed text-muted">
                    <Reveal as="p">
                        I'm Tokioshy, pronounced Tō-ki-ō-shi. My programming journey began in middle
                        school with JavaScript, and my first significant project was a Discord bot
                        built with Discord.js. That project is why I kept coding.
                    </Reveal>
                    <Reveal as="p" delay={0.1}>
                        I run <span className="font-semibold text-ink">Harmony Hub</span>, a digital
                        development service offering custom bot and software development. I work on
                        it as the sole developer, mostly building Discord bots and web tools.
                    </Reveal>
                    <Reveal as="p" delay={0.2}>
                        Away from the keyboard I watch anime, play games, listen to music, eat, and
                        sleep. I'm open to my first professional opportunity.
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
