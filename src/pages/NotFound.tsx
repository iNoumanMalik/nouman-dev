import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./NotFound.css";

const NotFound = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entry animations
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, skewX: 10 },
                { opacity: 1, y: 0, skewX: 0, duration: 1, ease: "expo.out" }
            );

            gsap.fromTo(
                textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" }
            );

            gsap.fromTo(
                btnRef.current,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, delay: 0.4, ease: "back.out(1.7)" }
            );

            // Glitch-like pulse for the 404 text
            gsap.to(".nf-glitch-part", {
                opacity: 0.5,
                duration: 0.1,
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.2,
                    from: "random",
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="nf-root" ref={containerRef}>
            <div className="nf-grain" aria-hidden />

            <div className="nf-content">
                <div className="nf-error-code">
                    <span className="nf-glitch-part">4</span>
                    <span className="nf-glitch-part">0</span>
                    <span className="nf-glitch-part">4</span>
                </div>

                <h1 className="nf-title" ref={titleRef}>
                    System <span className="nf-accent">Not Found</span>
                </h1>

                <p className="nf-text" ref={textRef}>
                    The module you're looking for has been moved, renamed, or never existed in this architecture.
                </p>

                <div className="nf-btn-wrap">
                    <Link to="/" className="nf-btn" ref={btnRef as any}>
                        <span className="nf-btn-label">Return to Base</span>
                        <span className="nf-btn-icon">→</span>
                    </Link>
                </div>
            </div>

            <div className="nf-bg-decoration font-mono" aria-hidden>
                [ERROR_CODE_0x404]
            </div>
        </div>
    );
};

export default NotFound;
