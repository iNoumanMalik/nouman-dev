import React, { useState, useEffect, useRef } from "react";

const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
const formspreeUrl = `https://formspree.io/f/${formspreeId}`;
export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [libsLoaded, setLibsLoaded] = useState(false);

  useEffect(() => {
    const loadGSAP = async () => {
      if (window.gsap) {
        setLibsLoaded(true);
        return;
      }
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
      script.onload = () => setLibsLoaded(true);
      document.head.appendChild(script);
    };
    loadGSAP();
  }, []);

  useEffect(() => {
    if (libsLoaded && window.gsap) {
      const gsap = window.gsap;

      // Floating ambient background shapes
      gsap.to(".contact-orb", {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2,
      });
    }
  }, [libsLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });
  
      if (response.ok) {
        if (window.gsap) {
          window.gsap.to(".contact-window", {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            onComplete: () => setIsSent(true),
          });
        } else {
          setIsSent(true);
        }
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
      console.error(err);
    }
  };
  

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-24 px-6 overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="contact-orb absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="contact-orb absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <header className="mb-12 text-center">
          <span className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Ready for Transmission
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            Get in Touch
          </h2>
        </header>

        {!isSent ? (
          <div className="space-y-12">
            {/* The "Command" Overlay (Independent UI Element) */}
            <div className="relative group">
              <div className="absolute -top-8 -right-4 z-30 hidden md:block w-56 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl transition-transform group-hover:translate-y-[-5px] duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    Active_Session
                  </span>
                </div>
                <div className="font-mono text-[10px] space-y-2 leading-tight">
                  <p className="text-blue-400">{">>"} buffer_input</p>
                  <p className="text-white/40">
                    User:{" "}
                    <span className="text-white/80">
                      {formState.name || "anonymous"}
                    </span>
                  </p>
                  <p className="text-white/40">
                    Size:{" "}
                    <span className="text-white/80">
                      {formState.message.length} bytes
                    </span>
                  </p>
                </div>
              </div>

              {/* Main Macbook-style Window */}
              <div className="contact-window bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Macbook Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/10" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/10" />
                  </div>
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    secure_message_v2.sh
                  </span>
                  <div className="w-12" /> {/* Spacer for symmetry */}
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">
                        Identity
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">
                        Endpoint
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        placeholder="Email Address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/30 uppercase tracking-widest ml-1">
                      Payload
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all placeholder:text-white/10 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-xl hover:bg-blue-400 hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Execute Transmission
                    {/* <span className="text-base">⚡</span> */}
                  </button>
                </form>
              </div>
            </div>

            {/* Structured Footer Links (LinkedIn, GitHub, Location, Direct) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-white/5">
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  Social
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://github.com/iNoumanMalik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    GitHub <span className="text-[10px]">↗</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nouman-malik-me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/60 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    LinkedIn <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  Location
                </h4>
                <p className="text-sm text-white/60 leading-relaxed">
                  Islamabad, Pakistan
                  <br />
                  <span className="text-[10px] opacity-50 uppercase tracking-tighter">
                    UTC +5
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  Direct
                </h4>
                <p className="text-sm text-white/60">
                  inoumanmalik@outlook.com
                </p>
                <p className="text-sm text-white/60">+92 314 4221693</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  Availability
                </h4>
                <p className="text-sm text-emerald-400/80 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Open for Projects
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-20 animate-in fade-in zoom-in duration-700">
            <div className="w-20 h-20 rounded-full border border-emerald-500/30 flex items-center justify-center mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" />
              <span className="text-3xl text-emerald-400">✓</span>
            </div>
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
              Transmission Successful
            </h3>
            <p className="text-white/40 max-w-sm font-light italic">
              Your message has been routed. Expect a response in your inbox
              within 24 hours.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="mt-12 text-[10px] font-mono text-white/20 uppercase tracking-widest hover:text-white transition-colors border border-white/10 px-6 py-2 rounded-full hover:bg-white/5"
            >
              New Transmission
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
